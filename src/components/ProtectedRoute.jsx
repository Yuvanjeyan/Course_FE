import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  if (!userInfo) {
    return <Navigate to="/" />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(userInfo.role)
  ) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;