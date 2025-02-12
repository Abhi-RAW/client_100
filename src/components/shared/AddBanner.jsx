import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "react-bootstrap/esm/Button";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: ${({ theme }) => (theme ? "#ffffff" : "#121212")};
  border-radius: 1.25rem;
  box-shadow: 0 0.5rem 3rem rgba(0, 0, 0, 0.2);
  max-width: 700px;
  margin: 4rem auto;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 2rem;
  }
`;

const FormTitle = styled.h3`
  margin-bottom: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => (theme ? "#333" : "#f1f1f1")};
  font-size: 2.2rem;
  text-align: center;
  transition: color 0.3s ease;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const InputField = styled.input`
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => (theme ? "#cccccc" : "#444444")};
  background-color: ${({ theme }) => (theme ? "#f4f4f4" : "#2c2c2c")};
  color: ${({ theme }) => (theme ? "#333333" : "#ffffff")};
  font-size: 1.1rem;
  text-align: center;
  outline: none;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => (theme ? "#007bff" : "#0056b3")};
    background-color: ${({ theme }) => (theme ? "#ffffff" : "#333333")};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FileUpload = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => (theme ? "#f1f1f1" : "#333333")};
  color: ${({ theme }) => (theme ? "#333333" : "#ffffff")};
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease;
  margin: 0 auto;

  &:hover {
    background-color: ${({ theme }) => (theme ? "#e0e0e0" : "#444444")};
    transform: scale(1.05);
  }

  svg {
    margin-right: 0.75rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
`;

const SubmitButton = styled(Button)`
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => (theme ? "#007bff" : "#0056b3")};
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => (theme ? "#0056b3" : "#007bff")};
    transform: scale(1.05);
  }

  &:active {
    background-color: ${({ theme }) => (theme ? "#0056b3" : "#003366")};
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.75rem 1.5rem;
  }
`;

export const AddBanner = ({ role = "seller" }) => {
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === "image") {
          if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      const response = await axiosInstance({
        method: "POST",
        url: "/banner/add-banner",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Banner added successfully");
      if (response) {
        if (role === "seller") {
          navigate("/seller/banners");
        } else if (role === "admin") {
          navigate("/admin/banners");
        }
      }
    } catch (error) {
      toast.error("Banner addition failed. Please try again!");
      console.log(error);
    }
  };

  return (
    <FormContainer theme={theme}>
      <StyledForm onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <FormTitle theme={theme}>Add New Banner</FormTitle>
        <InputField
          type="text"
          placeholder="Title"
          {...register("title", { required: true, maxLength: 100 })}
          theme={theme}
        />
        <InputField
          type="text"
          placeholder="Color"
          {...register("color", { required: true, maxLength: 10 })}
          theme={theme}
        />
        <FileUpload theme={theme}>
          <FaCloudUploadAlt size="20" />
          Upload Image
          <input type="file" {...register("image")} accept="image/*" hidden />
        </FileUpload>
        <SubmitButton type="submit" theme={theme}>
          Submit
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};
