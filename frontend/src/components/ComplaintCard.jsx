import React from "react";
import "./ComplaintCard.css";

const ComplaintCard = ({ complaint }) => {
  return (
    <div className="complaint-card">
      <div className="card-top">
        <span className="complaint-id">ID: {complaint._id}</span>
        <span className={`status ${complaint.status.toLowerCase()}`}>
          {complaint.status}
        </span>
      </div>

      <h3 className="complaint-title">{complaint.title}</h3>

      <div className="info-row">
        <span>Ward:</span>
        <span>{complaint.ward}</span>
      </div>

      <div className="info-row">
        <span>Location:</span>
        <span>{complaint.location}</span>
      </div>

      <div className="info-row">
        <span>Category:</span>
        <span className="category-tag">{complaint.category}</span>
      </div>

      <div className="info-row">
        <span>Submitted:</span>
        <span>{complaint.date}</span>
      </div>

      <div className="description">
        <span>Description:</span>
        <p>{complaint.description}</p>
      </div>
    </div>
  );
};

export default ComplaintCard;
