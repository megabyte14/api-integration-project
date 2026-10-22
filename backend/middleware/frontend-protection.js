
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken, getUser, roleHome } from "../utils/auth";

export default function ProtectedRoute({ roles }) {
  const location = useLocation();
  const token = getToken();
  const user = getUser();

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  const userRole = user.role?.toLowerCase();
  const allowedRoles = roles?.map(role => role.toLowerCase());

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={roleHome(userRole)} replace />;
  }

  return <Outlet />;
}
