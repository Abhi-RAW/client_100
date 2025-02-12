import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
  // Config navigate
  const navigate = useNavigate();

  // Get seller authentication status
  const { isAdminAuth } = useSelector((state) => state.admin);

  // Redirect
  if (!isAdminAuth) {
    navigate("/admin/login");
    return;
  }

  return isAdminAuth && <Outlet />;
};
