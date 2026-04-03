import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyComplaints.css";

const categoryColors = {
  "Road Issue": { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "Street Lighting": { bg: "#fefce8", color: "#a16207", border: "#fde68a" },
  "Water Problem": { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  Electricity: { bg: "#faf5ff", color: "#7e22ce", border: "#e9d5ff" },
  Garbage: { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  "Noise Pollution": { bg: "#fdf2f8", color: "#be185d", border: "#fbcfe8" },
  "Environmental Issues": {
    bg: "#f0fdfa",
    color: "#0f766e",
    border: "#99f6e4",
  },
  Other: { bg: "#f8fafc", color: "#475569", border: "#e2e8f0" },
};

const statusConfig = {
  pending: { bg: "#fef9c3", color: "#854d0e", label: "OPEN" },
  "in-progress": { bg: "#dbeafe", color: "#1e40af", label: "IN PROGRESS" },
  resolved: { bg: "#dcfce7", color: "#166534", label: "RESOLVED" },
};

const shortId = (id) => id?.slice(-6).toUpperCase();

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5000/api/complaints/my",
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
    fetchComplaints();
  }, []);

  const filtered =
    statusFilter === "all"
      ? complaints
      : complaints.filter((c) => c.status === statusFilter);

  if (loading)
    return <div className="mc-loading">Loading your complaints...</div>;

  return (
    <div className="mc-wrapper">
      <div className="mc-container">
        {/* Header */}
        <div className="mc-header">
          <div className="mc-header-left">
            <h1>My Complaints</h1>
            <p>Track the status of your submitted complaints</p>
          </div>
          <Link to="/citizen/submit-complaint">
            <button className="mc-submit-btn">Submit New Complaint</button>
          </Link>
        </div>

        {/* Filter */}
        <div className="mc-filter-row">
          <span className="mc-filter-label">Filter by status:</span>
          <select
            className="mc-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="mc-empty">
            <div className="mc-empty-icon">📝</div>
            <h2>No Complaints Yet</h2>
            <p>
              You haven't submitted any complaints yet.
              <br />
              Start by reporting an issue in your community.
            </p>
            <Link to="/citizen/submit-complaint">
              <button className="mc-submit-btn">
                Submit Your First Complaint
              </button>
            </Link>
          </div>
        ) : (
          <div className="mc-grid">
            {filtered.map((c) => {
              const catStyle =
                categoryColors[c.category] || categoryColors["Other"];
              const statusStyle =
                statusConfig[c.status] || statusConfig["pending"];
              return (
                <div className="mc-card" key={c._id}>
                  <div className="mc-card-top">
                    <span className="mc-id">ID: {shortId(c._id)}</span>
                    <span
                      className="mc-status"
                      style={{
                        background: statusStyle.bg,
                        color: statusStyle.color,
                      }}
                    >
                      {statusStyle.label}
                    </span>
                  </div>
                  <h3 className="mc-title">{c.title}</h3>
                  <div className="mc-info-row">
                    <span className="mc-info-label">Ward:</span>
                    <span className="mc-info-value">{c.ward}</span>
                  </div>
                  <div className="mc-info-row">
                    <span className="mc-info-label">Location:</span>
                    <span className="mc-info-value">{c.location}</span>
                  </div>
                  <div className="mc-info-row">
                    <span className="mc-info-label">Category:</span>
                    <span
                      className="mc-category"
                      style={{
                        background: catStyle.bg,
                        color: catStyle.color,
                        border: `1px solid ${catStyle.border}`,
                      }}
                    >
                      {c.category?.toUpperCase()}
                    </span>
                  </div>
                  <div className="mc-info-row">
                    <span className="mc-info-label">Submitted:</span>
                    <span className="mc-info-value">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="mc-description">
                    <span className="mc-info-label">Description:</span>
                    <p>{c.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
