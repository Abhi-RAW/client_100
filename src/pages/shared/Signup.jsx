import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const Signup = ({ role = "user" }) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  // Config use form
  const { register, handleSubmit } = useForm();

  // Set user role
  const user = {
    role: "user",
    signup_api: "/user/signup",
    login_route: "/login",
  };

  // Handle seller role
  if (role === "seller") {
    (user.role = "seller"),
      (user.signup_api = "/seller/signup"),
      (user.login_route = "/seller/login");
  }

  // Handle admin role
  if (role === "admin") {
    (user.role = "admin"),
      (user.signup_api = "admin/signup"),
      (user.login_route = "admin/login");
  }

  // Handle on submit
  const onSubmit = async (data) => {
    try {
      // Create form data
      const formData = new FormData();
      for (const key in data) {
        if (key === "profilePicture") {
          // Check if a file is selected
          if (data.profilePicture && data.profilePicture[0]) {
            formData.append("profilePicture", data.profilePicture[0]);
          }
        } else {
          // Normal field
          formData.append(key, data[key]);
        }
      }

      // Api call
      const response = await axiosInstance({
        method: "POST",
        url: user.signup_api,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response) {
        // Display result
        toast.success("Signup successful");
        // Navigate to login
        navigate(user.login_route);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div style={{ minHeight: "400px" }} className="mx-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className=" signup-box mt-5 mx-auto d-flex flex-column gap-2 align-items-center justify-content-center rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <h3 className="mt-2 fw-bold">Signup {role}</h3>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Name"
            {...register("name", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="mobile"
            placeholder="Mobile"
            {...register("mobile", { required: true })}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 4 })}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: true })}
          />
        </div>
        <div>
          <label className=" bg-white file-labal rounded-2 py-2 px-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 me-1 mb-1"
              height="20px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            Profile photo
            <input
              type="file"
              {...register("profilePicture")}
              accept="image/*"
            />
          </label>
        </div>
        <div>
          <Button
            className="rounded-2 border-0 px-4 hover py-2 text-center
            text-white mt-1"
            type="submit"
            variant={theme ? "warning" : "dark"}
          >
            {" "}
            Signup
          </Button>
        </div>
        <div>
          <span className="text-secondary">Already have an account?</span>{" "}
          <Link
            className="text-decoration-none text-black"
            to={user.login_route}
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
