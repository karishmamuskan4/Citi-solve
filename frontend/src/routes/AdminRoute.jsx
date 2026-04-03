import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAuth, user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuth) return <Navigate to="/login" replace />;

  if (user?.role !== "admin") return <Navigate to="/citizen" replace />;

  return children;
};

export default AdminRoute;
