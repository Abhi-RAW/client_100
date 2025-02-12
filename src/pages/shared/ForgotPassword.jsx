import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";

export const ForgotPassword = ({ role = "user" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Handle user role
  const user = {
    forgotPassword: '/user/forgot-password',
}

// Handle Seller role
if(role === 'seller'){
  user.forgotPassword = '/seller/forgot-password'
}

// Handle admin role
if(role === 'admin'){
  user.forgotPassword = '/seller/admin/forgot-password'
}

  //config register
  const { register, handleSubmit } = useForm();

  // config navigate
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "POST",
        url: user.forgotPassword,
        data
      });
          toast.success("Mail sent!");

      // Navigate to password reset page
      navigate('/sent-mail')
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{minHeight: '400px'}}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" login-box mx-auto mt-5 d-flex flex-column gap-2 align-items-center justify-content-center rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <h3 className="mt-2 fw-bold text-black">Forgot Password</h3>

        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 my-2 text-center"
            type="text"
            {...register("email")}
            placeholder="Email"
            required
          />
        </div>

        <div>
          <Button
            className="rounded-2 border-0 px-4 py-2 hover text-black text-center text-white mt-1"
            type="submit"
            variant={theme ? "warning" : "dark"}
          >
            Send mail
          </Button>
        </div>
      </form>
    </div>
  );
};
