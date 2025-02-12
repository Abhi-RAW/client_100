import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button, Container } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";

export const UpdateProduct = ({role = 'seller'}) => {
  // Config params
  const { productId } = useParams();

  // Config navigate
  const navigate = useNavigate();

  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config react-hook-form
  const { register, handleSubmit, setValue, watch } = useForm();

  // Handle product image preview
  const [imagePreview, setImagePreview] = useState("");

  // Watch image input
  const imageFile = watch("image");

  // Update image preview when image file changes
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(imageFile[0]);
    }
  }, [imageFile]);

  // Fetch product data on component load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `/product/product-details/${productId}`
        );
        if (response?.data?.data) {
          const { title, description, price, stock, category, image } =
            response.data.data;
          setValue("title", title);
          setValue("description", description);
          setValue("price", price);
          setValue("stock", stock);
          setValue("category", category);
          setImagePreview(image);
        }
      } catch (error) {
        toast.error("Failed to fetch product data.");
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === "image" && data.image[0]) {
          formData.append(key, data.image[0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const response = await axiosInstance(
        {
          method: "PUT",
          url: `/product/update-product/${productId}`,
          data: formData,
        },

        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Product updated successfully!");

      navigate(
        role === "admin"
          ? `/admin/update-product/${productId}`
          : `/seller/update-product/${productId}`
      );
    } catch (error) {
      toast.error("Failed to update product.");
      console.error(error);
    }
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="update-box mt-5 mx-auto d-flex flex-column align-items-center gap-2 p-4 rounded-3"
        style={{
          backgroundColor: theme ? "#FFF6E3" : "#d9d9d9",
          minHeight: "500px",
        }}
      >
        <h3 className="fw-bold">Update Product</h3>

        <div>
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="img-fluid rounded ms-3"
                style={{ maxHeight: "150px" }}
              />
            </div>
          )}
        </div>
        <div>
          <label className="bg-white file-label rounded-2 py-2 px-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 me-1"
              height={25}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
              />
            </svg>
            Update image
            <input
              className="rounded-2 border-0 px-5 py-2 text-center"
              type="file"
              {...register("image")}
              accept="image/*"
            />
          </label>
        </div>

        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Title"
            {...register("title", { required: true, maxLength: 100 })}
          />
        </div>
        <div>
          <textarea
            className="rounded-2 border-0 px-3 py-2 text-center"
            placeholder="Description"
            {...register("description", {
              required: true,
              minLength: 20,
              maxLength: 300,
            })}
            style={{ minHeight: "160px" }}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="number"
            placeholder="Price"
            {...register("price", { required: true })}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="number"
            placeholder="Stock"
            {...register("stock")}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Category"
            {...register("category", { required: true })}
          />
        </div>

        <Button
          variant={theme ? "warning" : "dark"}
          className="rounded-2 border-0 px-4 py-2 text-white mt-1"
          type="submit"
        >
          Update
        </Button>
      </form>
    </Container>
  );
};
