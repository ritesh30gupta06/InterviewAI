import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../services/auth";

export default function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/" replace />;
}