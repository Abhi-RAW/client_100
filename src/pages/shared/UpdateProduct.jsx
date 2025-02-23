import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button, Container, Form, Card } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";

export const UpdateProduct = ({ role = "seller" }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { register, handleSubmit, setValue, watch } = useForm();
  const [imagePreview, setImagePreview] = useState("");
  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(imageFile[0]);
    }
  }, [imageFile]);

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

      await axiosInstance.put(
        `/product/update-product/${productId}`,
        formData,
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
    <Container className="d-flex justify-content-center mt-5">
      <Card
        className="p-4 shadow-lg rounded-4"
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: theme ? "#FFF6E3" : "#f8f9fa",
        }}
      >
        <h3 className="fw-bold text-center mb-4">Update Product</h3>

        {imagePreview && (
          <div className="text-center mb-3">
            <img
              src={imagePreview}
              alt="Preview"
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "150px" }}
            />
          </div>
        )}

        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Form.Group className="mb-3 text-center">
            <Form.Label className="btn btn-outline-primary w-100">
              <input
                type="file"
                {...register("image")}
                accept="image/*"
                className="d-none"
              />
              Upload Image
            </Form.Label>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Product Title"
              {...register("title", { required: true, maxLength: 100 })}
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Product Description"
              {...register("description", { required: true, maxLength: 500 })}
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Price"
              {...register("price", { required: true, min: 0 })}
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Stock"
              {...register("stock", { required: true, min: 0 })}
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Category"
              {...register("category", { required: true, maxLength: 50 })}
              className="shadow-sm"
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100 shadow-sm">
            Update Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
};
