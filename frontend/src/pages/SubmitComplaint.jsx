import React, { useState } from "react";
import "./SubmitComplaint.css";
import { useNavigate } from "react-router-dom";

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    ward: "",
    location: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/complaints`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Complaint submitted successfully!");
        navigate("/citizen/my-complaints");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-container">
      <div className="complaint-card">
        <h2>Submit a Complaint</h2>
        <p className="subtitle">
          Help us improve your community by reporting issues that need attention
        </p>
        <form onSubmit={handleSubmit}>
          <label>Title *</label>
          <input
            type="text"
            name="title"
            placeholder="Enter complaint title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label>Ward *</label>
          <input
            type="text"
            name="ward"
            placeholder="Enter your ward number or name"
            value={formData.ward}
            onChange={handleChange}
            required
          />
          <label>Location *</label>
          <input
            type="text"
            name="location"
            placeholder="Enter specific location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <label>Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option>Road Issue</option>
            <option>Street Lighting</option>
            <option>Water Problem</option>
            <option>Electricity</option>
            <option>Garbage</option>
            <option>Noise Pollution</option>
            <option>Environmental Issues</option>
            <option>Other</option>
          </select>
          <label>Description *</label>
          <textarea
            rows="4"
            name="description"
            placeholder="Describe the issue in detail..."
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <div className="action-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/citizen/my-complaints")}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitComplaint;
