import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const categoryColors = {
  "Road Issue": "#f97316",
  "Street Lighting": "#eab308",
  "Water Problem": "#3b82f6",
  Electricity: "#a855f7",
  Garbage: "#22c55e",
  "Noise Pollution": "#ec4899",
  "Environmental Issues": "#14b8a6",
  Other: "#94a3b8",
};

const statusColors = {
  pending: { bg: "#fef9c3", color: "#854d0e", label: "OPEN" },
  "in-progress": { bg: "#dbeafe", color: "#1e40af", label: "IN PROGRESS" },
  resolved: { bg: "#dcfce7", color: "#166534", label: "RESOLVED" },
};

const shortId = (id) => id?.slice(-6).toUpperCase();

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/complaints/all`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const data = await response.json();
      if (response.ok) setComplaints(data.complaints);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id) => {
    const newStatus = selectedStatus[id];
    if (!newStatus) return alert("Please select a status first");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/complaints/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setComplaints((prev) =>
          prev.map((c) =>
            c._id === id ? { ...c, status: data.complaint.status } : c,
          ),
        );
        setSelectedStatus((prev) => ({ ...prev, [id]: "" }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filtered = complaints.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      shortId(c._id).toLowerCase().includes(q) ||
      c.citizen?.name?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q) ||
      c.location?.toLowerCase().includes(q) ||
      c.ward?.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchCategory =
      categoryFilter === "all" || c.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  const total = complaints.length;
  const open = complaints.filter((c) => c.status === "pending").length;
  const inProgress = complaints.filter(
    (c) => c.status === "in-progress",
  ).length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

  const categories = [...new Set(complaints.map((c) => c.category))];

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-wrapper">
      {/* Navbar */}
      <nav className="admin-nav">
        <div className="admin-nav-left">
          <span className="admin-nav-icon">🏛️</span>
          <span className="admin-nav-brand">CitiSolve</span>
        </div>
        <div className="admin-nav-right">
          <span className="admin-welcome">Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage and monitor all citizen complaints</p>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card stat-total">
            <span className="stat-num">{total}</span>
            <span className="stat-label">TOTAL COMPLAINTS</span>
          </div>
          <div className="stat-card stat-open">
            <span className="stat-num">{open}</span>
            <span className="stat-label">OPEN</span>
          </div>
          <div className="stat-card stat-progress">
            <span className="stat-num">{inProgress}</span>
            <span className="stat-label">IN PROGRESS</span>
          </div>
          <div className="stat-card stat-resolved">
            <span className="stat-num">{resolved}</span>
            <span className="stat-label">RESOLVED</span>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <input
            className="admin-search"
            placeholder="Search complaints by ID, name, description, location, or ward..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            className="admin-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>CITIZEN</th>
                <th>WARD</th>
                <th>LOCATION</th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
                <th>STATUS</th>
                <th>SUBMITTED</th>
                <th>LAST UPDATED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const statusStyle =
                  statusColors[c.status] || statusColors["pending"];
                const catColor = categoryColors[c.category] || "#94a3b8";
                return (
                  <tr key={c._id}>
                    <td>
                      <span className="complaint-id-badge">
                        {shortId(c._id)}
                      </span>
                    </td>
                    <td>
                      <div className="citizen-name">{c.citizen?.name}</div>
                      <div className="citizen-email">{c.citizen?.email}</div>
                    </td>
                    <td>{c.ward}</td>
                    <td>{c.location}</td>
                    <td>
                      <span
                        className="category-badge"
                        style={{
                          background: catColor + "22",
                          color: catColor,
                          border: `1px solid ${catColor}44`,
                        }}
                      >
                        {c.category?.toUpperCase()}
                      </span>
                    </td>
                    <td className="desc-cell">{c.description}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                        }}
                      >
                        {statusStyle.label}
                      </span>
                    </td>
                    <td className="date-cell">
                      {new Date(c.createdAt).toLocaleString()}
                    </td>
                    <td className="date-cell">
                      {new Date(c.updatedAt).toLocaleString()}
                    </td>
                    <td>
                      <div className="action-cell">
                        <select
                          className="status-select"
                          value={selectedStatus[c._id] || ""}
                          onChange={(e) =>
                            setSelectedStatus((prev) => ({
                              ...prev,
                              [c._id]: e.target.value,
                            }))
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        <button
                          className="update-btn"
                          onClick={() => handleStatusChange(c._id)}
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="no-results">No complaints found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
