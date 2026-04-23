import React from "react";
import { useState } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
    confirmPassword: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  async function handleRegister(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("password doesn't match");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });
      const data = await response.json();
      console.log("REGISTER RESPONSE:", data);
      if (response.ok) {
        alert("Registered successfully! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "citizen",
      confirmPassword: "",
    });
  }
  return (
    <div className="container">
      <form onSubmit={handleRegister}>
        <h1>Create Account</h1>
        <p>Join our citizen resolution system</p>
        <label>Full name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>role</label>{" "}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          autoFocus
          required
        >
          <option value="citizen">Citizen</option>
          <option value="admin">Admin</option>
        </select>
        <p className="role-info">
          {formData.role === "admin"
            ? "Admin users can manage, review, and resolve citizen complaints."
            : "Citizens can submit complaints and track their own complaints."}
        </p>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Confirm Password{" "}
          <input
            type="password"
            name="confirmPassword"
            placeholder=" confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />{" "}
        </label>
        <button type="submit">Create Account</button>
        <p>
          Already have an account?<Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
