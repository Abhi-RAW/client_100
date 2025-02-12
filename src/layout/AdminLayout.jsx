import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { clearAdminData, saveAdminData } from "../redux/features/adminSlice";
import { useEffect } from "react";
import { AdminHeader } from "../components/admin/AdminHeader";
import { Footer } from "../components/shared/Footer";
import { Header } from "../components/shared/Header";

export const AdminLayout = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Get current user status
  const { isAdminAuth } = useSelector((state) => state.admin);

  // Change body theme
  useEffect(() => {
    document.body.style.background = theme ? "#F2E5BF" : "#31363f";
  }, [theme]);

  // Config dispatch
  const dispatch = useDispatch();

  // Config path location
  const location = useLocation();

  // Check admin
  const checkAdmin = async () => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/check-admin",
      });

      // set admin
      dispatch(saveAdminData(response.data.data));
    } catch (error) {
      console.log(error);

      // clear admin data when error
      dispatch(clearAdminData());
    }
  };
  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  return (
    <>
      {isAdminAuth ? <AdminHeader /> : <Header />}

      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
