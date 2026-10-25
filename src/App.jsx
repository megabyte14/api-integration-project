
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

import { getToken, getUser, roleHome } from "./utils/auth";
import Login from "./frontend/Login";
import AdminDashboard from "./frontend/AdminDashboard";
import SellerDashboard from "./frontend/SellerDashboard";
import VendorDashboard from "./frontend/VendorDashboard";

function ProtectedRoute({ roles }) {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute roles={["seller"]} />}>
          <Route path="/seller" element={<SellerDashboard />} />
        </Route>

        <Route element={<ProtectedRoute roles={["vendor"]} />}>
          <Route path="/vendor" element={<VendorDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
