import { Navigate } from "react-router-dom";

const RouteProtect = ({ children, handleLogin }) => {
  const infoLocal = JSON.parse(localStorage.getItem("user"));
  if (!infoLocal) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RouteProtect;
