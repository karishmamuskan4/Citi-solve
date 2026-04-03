import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./CitizenHome.css";

const CitizenHome = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, [token]);

  return (
    <div className="citizen-home">
      <h1 className="title">Citizen Resolution System</h1>

      <p className="subtitle">
        Report and track community issues efficiently. <br />
        Your voice matters in building a better community.
      </p>

      <div className="welcome-box">
        <p>
          <strong>Welcome back, {user ? user.name : "Loading..."}!</strong> (
          {user.role})
        </p>
        <p className="token">
          Token: {token ? `${token.substring(0, 20)}...` : "No Token Found"}
        </p>
      </div>

      <h2 className="quick-actions">Quick Actions</h2>

      <div className="action-cards">
        <div className="card">
          <div className="icon">📝</div>
          <h3>Submit Complaint</h3>
          <p>Report a new issue in your community</p>

          <Link to="/citizen/submit-complaint">
            <button>Submit Now</button>
          </Link>
        </div>

        <div className="card">
          <div className="icon">📊</div>
          <h3>My Complaints</h3>
          <p>Track the status of your submitted complaints</p>

          <Link to="/citizen/my-complaints">
            <button>View Complaints</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CitizenHome;
