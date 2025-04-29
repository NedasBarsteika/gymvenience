// src/components/AdminRoute.tsx
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: React.ReactNode;
}

function AdminRoute({ children }: AdminRouteProps) {
  const token = localStorage.getItem("authToken");
  const userData = localStorage.getItem("user");

  const isAuthenticated = !!token;
  const isAdmin = userData ? JSON.parse(userData).isAdmin : false;

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AdminRoute;
