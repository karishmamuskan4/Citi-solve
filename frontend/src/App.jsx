import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./Layouts/PublicLayout";
import CitizenLayout from "./Layouts/CitizenLayout";
import AdminLayout from "./Layouts/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyComplaints from "./pages/MyComplaints";
import SubmitComplaint from "./pages/SubmitComplaint";
import CitizenHome from "./pages/CitizenHome";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/citizen",
    element: (
      <ProtectedRoute>
        <CitizenLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <CitizenHome /> },
      { path: "my-complaints", element: <MyComplaints /> },
      { path: "submit-complaint", element: <SubmitComplaint /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [{ path: "", element: <AdminDashboard /> }],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
