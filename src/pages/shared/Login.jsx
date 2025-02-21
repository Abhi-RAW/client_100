import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import styled from "styled-components";

// Styled components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: ${({ theme }) => (theme ? "#f9fafb" : "#1e1e1e")};
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: 3rem auto;
`;

const FormTitle = styled.h3`
  margin-bottom: 1rem;
  font-weight: bold;
  color: ${({ theme }) => (theme ? "#333333" : "#ffffff")};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const InputField = styled.input`
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => (theme ? "#cccccc" : "#444444")};
  background-color: ${({ theme }) => (theme ? "#ffffff" : "#2c2c2c")};
  color: ${({ theme }) => (theme ? "#333333" : "#ffffff")};
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => (theme ? "#007bff" : "#0056b3")};
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => (theme ? "#0056b3" : "#007bff")};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => (theme ? "#007bff" : "#ffffff")};
  
  &:hover {
    color: ${({ theme }) => (theme ? "#0056b3" : "#a0c4ff")};
  }
`;

export const Login = ({ role = "user" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Config register
  const { register, handleSubmit } = useForm();

  // Config navigate
  const navigate = useNavigate();

  // Set user
  const user = {
    role: "user",
    login_api: "/user/login",
    profile_route: "/user/profile",
    signup_route: "/signup",
    home_route: "/",
    forgotPassword: "/forgot-password",
  };

  // Handle seller role
  if (role === "seller") {
    user.role = "seller";
    user.login_api = "/seller/login";
    user.profile_route = "/seller/profile";
    user.signup_route = "/seller/signup";
    user.home_route = "/seller";
    user.forgotPassword = "/seller/forgot-password";
  }

  // Handle admin role
  if (role === "admin") {
    user.role = "admin";
    user.login_api = "/admin/login";
    user.profile_route = "/admin/profile";
    user.signup_route = "/admin/signup";
    user.home_route = "/admin";
    user.forgotPassword = "/admin/forgot-password";
  }

  const onSubmit = async (data) => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "POST",
        url: user.login_api,
        withCredentials: true,
        data,
      });
      
      if (response) {
        // Set token to local storage
        const { token } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          // Display result 
          toast.success("Login success");
        }
        // Navigate to profile page
        navigate(user.home_route);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <FormContainer theme={theme}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormTitle theme={theme}>Login {role}</FormTitle>
        <InputField
          type="text"
          {...register("email")}
          placeholder="Email"
          required
          theme={theme}
        />
        <InputField
          type="password"
          {...register("password")}
          placeholder="Password"
          required
          theme={theme}
        />
        <SubmitButton type="submit" theme={theme}>
          Login
        </SubmitButton>
        <div>
          {/* <StyledLink to={user.forgotPassword} theme={theme}>
            Forgot password?
          </StyledLink> */}
        </div>
        <div>
          Don't have an account? 
          <StyledLink to={user.signup_route} theme={theme}>
            Sign up
          </StyledLink>
        </div>
      </StyledForm>
    </FormContainer>
  );
};
