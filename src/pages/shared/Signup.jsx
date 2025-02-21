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

const FileLabel = styled.label`
  background-color: ${({ theme }) => (theme ? "#ffffff" : "#2c2c2c")};
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => (theme ? "#333333" : "#ffffff")};
`;

export const Signup = ({ role = "user" }) => {
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const user = {
    role: "user",
    signup_api: "/user/signup",
    login_route: "/login",
  };

  if (role === "seller") {
    user.role = "seller";
    user.signup_api = "/seller/signup";
    user.login_route = "/seller/login";
  }

  if (role === "admin") {
    user.role = "admin";
    user.signup_api = "/admin/signup";
    user.login_route = "/admin/login";
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === "profilePicture" && data.profilePicture[0]) {
          formData.append("profilePicture", data.profilePicture[0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const response = await axiosInstance({
        method: "POST",
        url: user.signup_api,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response) {
        toast.success("Signup successful");
        navigate(user.login_route);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <FormContainer theme={theme}>
      <StyledForm onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <FormTitle theme={theme} align="center">Signup {role}</FormTitle>
        <InputField
          type="text"
          placeholder="Name"
          {...register("name", { required: true, minLength: 3, maxLength: 30 })}
          theme={theme}
        />
        <InputField
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
          theme={theme}
        />
        <InputField
          type="text"
          placeholder="Mobile"
          {...register("mobile", { required: true })}
          theme={theme}
        />
        <InputField
          type="password"
          placeholder="Password"
          {...register("password", { required: true, minLength: 4 })}
          theme={theme}
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", { required: true })}
          theme={theme}
        />
        <FileLabel theme={theme}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            height="20px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          Profile photo
          <input type="file" {...register("profilePicture")} accept="image/*" hidden />
        </FileLabel>
        <SubmitButton type="submit" theme={theme}>
          Signup
        </SubmitButton>
        <div>
          Already have an account? 
          <StyledLink to={user.login_route} theme={theme}>
            Login
          </StyledLink>
        </div>
      </StyledForm>
    </FormContainer>
  );
};
