import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";
import { CloudUpload } from "@styled-icons/boxicons-solid/CloudUpload";

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

const TextareaField = styled.textarea`
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => (theme ? "#cccccc" : "#444444")};
  background-color: ${({ theme }) => (theme ? "#ffffff" : "#2c2c2c")};
  color: ${({ theme }) => (theme ? "#333333" : "#ffffff")};
  font-size: 1rem;
  resize: none;
`;

const FileUpload = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => (theme ? "#e0e0e0" : "#444444")};
  color: ${({ theme }) => (theme ? "#333333" : "#ffffff")};
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => (theme ? "#d4d4d4" : "#555555")};
  }

  svg {
    margin-right: 0.5rem;
  }
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

export const AddNewProduct = ({ role = "seller" }) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  // Config useForm
  const { register, handleSubmit } = useForm();

  // Handle on submit
  const onSubmit = async (data) => {
    try {
      // Create form data
      const formData = new FormData();
      for (const key in data) {
        if (key === "image") {
          // Check if a file is selected
          if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
          }
        } else {
          // Normal field
          formData.append(key, data[key]);
        }
      }

      // Api call
      const response = await axiosInstance({
        method: "POST",
        url: "/product/add-product",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response && role === "seller") {
        navigate("/seller");
      } else if (response && role === "admin") {
        navigate("/admin");
      }

      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Product addition failed. Please try again!");
      console.log(error);
    }
  };

  return (
    <FormContainer theme={theme}>
      <StyledForm onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <FormTitle theme={theme}>Add New Product</FormTitle>
        <InputField
          type="text"
          placeholder="Title"
          {...register("title", {
            required: true,
            maxLength: 100,
          })}
          theme={theme}
        />
        <TextareaField
          placeholder="Description"
          {...register("description", {
            required: true,
            minLength: 20,
            maxLength: 300,
          })}
          theme={theme}
        />
        <InputField
          type="number"
          placeholder="Price"
          {...register("price", { required: true })}
          theme={theme}
        />
        <InputField
          type="number"
          placeholder="Stock"
          {...register("stock")}
          theme={theme}
        />
        <InputField
          type="text"
          placeholder="Category"
          {...register("category", { required: true })}
          theme={theme}
        />
        <FileUpload theme={theme}>
          <CloudUpload size="20" />
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
