import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

export const ProtectedRouteUser = () => {
  // Get user authentication status
  const { isUserAuth } = useSelector((state) => state.user);

  // Config navigate
  const navigate = useNavigate();

  
    if (!isUserAuth) {
    return  navigate("/login");
    }
  

  return isUserAuth && <Outlet /> 
};
