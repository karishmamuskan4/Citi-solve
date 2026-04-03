import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <>
      <div className="hero">
        <h1>Citizen Resolution System</h1>
        <p>Report and track community issues efficiently. </p>
        <p>
          Your voice matters in building a better <br /> community.
        </p>
        <div className="btns">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>

        <div className="middle-part">
          <h2>How It Works</h2>
          <div>
            <span className="circle">1</span>
            <h2>Register</h2>
            <p>Create your account as a citizen</p>
          </div>
          <div>
            <span className="circle">2</span>
            <h2>Submit</h2>
            <p>Report issues with details and photos</p>
          </div>
          <div>
            <span className="circle">3</span>
            <h2>Track</h2>
            <p>Monitor progress and status updates</p>
          </div>
        </div>
        <div className="footer">
          <h1>Ready to Get Started?</h1>
          <p>Join our community and help make a difference</p>
          <Link to="/register">
            <button>Create Account</button>
          </Link>
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
