import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteSeller = () => {
  // Get seller authentication status
  const { isSellerAuth } = useSelector((state) => state.seller);

  // Config navigate
  const navigate = useNavigate();

  // Redirect
  if (!isSellerAuth) {
    navigate("/seller/login");
    return;
  }

  return isSellerAuth && <Outlet />;
};
