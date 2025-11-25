import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // During login/signup process
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  // If not logged in → redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
