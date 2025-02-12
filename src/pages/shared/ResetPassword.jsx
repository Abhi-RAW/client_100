import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import {Button} from 'react-bootstrap'

export const ResetPassword = ({role = 'user'}) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate  = useNavigate()

  // Config form
  const { register, handleSubmit } = useForm();

  // Get token
  const { token } = useParams();

  // Handle user role
  const user = {
    resetPassword: `/user/reset-password/${token}`,
    login: '/login'
  }

  // Handle seller role
  if(role === 'seller'){
    user.resetPassword = `/seller/reset-password/${token}`,
    user.login = '/seller/login'
  }

  // Handle admin role
  if(role === 'admin'){
    user.resetPassword = `/admin/reset-password/${token}`,
    user.login = '/admin/login'
  }



  const onSubmit = async (data) => {
    try {
      await axiosInstance({
        method: "POST",
        url: user.resetPassword,
        data,
      });

      toast.success("Password reset successful!");
      // Navigate to login
      navigate(user.login);
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };
  return (
    <div style={{minHeight: '400px'}}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-box mx-auto mt-5 d-flex flex-column gap-2 align-items-center justify-content-center rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <h3 className="mt-2 fw-bold text-black">Reset Password</h3>

        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="password"
            {...register("password")}
            placeholder="Enter new password"
            required
          />
        </div>

        <div>
          <Button
            className="rounded-2 border-0 px-4 py-2 hover text-black text-center text-white mt-1"
            type="submit"
            variant={theme ? "warning" : "dark"}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
