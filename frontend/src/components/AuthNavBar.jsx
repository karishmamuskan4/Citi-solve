import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthNavBar = () => {
  const navigate = useNavigate();
  const { logout, user, isAuth } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/home");
    console.log("After:", isAuth);
  };

  return (
    <nav className="navbar auth-navbar">
      <div className="navbar-left">
        <span>🏛️</span>
        <Link
          to="/citizen"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <span className="brand">CitiSolve</span>
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/citizen/submit-complaint">
          <button>Submit Complaint</button>
        </Link>

        <Link to="/citizen/my-complaints">
          <button>My Complaints</button>
        </Link>

        <span className="welcome">Welcome, {user?.name}</span>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default AuthNavBar;
