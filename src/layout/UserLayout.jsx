import { useEffect } from "react";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { UserHeader } from "../components/user/UserHeader";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { clearUserData, saveUserData } from "../redux/features/userSlice";

// Set user layout
export const UserLayout = () => {
  // Get global user set state
  const { isUserAuth } = useSelector((state) => state.user);

  // Config location path
  const location = useLocation();

  // Config dispatch
  const dispatch = useDispatch();

  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Change body theme
  useEffect(() => {
    document.body.style.background = theme ? "#F2E5BF" : "#31363f";
  }, [theme]);

  // Check user
  const checkUser = async () => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "GET",
        url: "/user/check-user",
      });

      // set user
      dispatch(saveUserData(response.data.data));
    } catch (error) {
      console.log(error);

      // clear user data when error
      dispatch(clearUserData());
    }
  };
  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return (
    <>
      <header>{isUserAuth ? <UserHeader /> : <Header />}</header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};
