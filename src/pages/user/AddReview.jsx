import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { Container, Card, Form, Button } from "react-bootstrap";

export const AddReview = () => {
  const { theme } = useSelector((state) => state.theme);
  const { productId } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/review/add-review", {
        ...data,
        productId,
      });
      if (response) navigate(`/product-details/${productId}`);
      toast.success("Review added successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="shadow-lg p-4"
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: theme ? "#ffffff" : "#1e1e1e",
          color: theme ? "#212529" : "#f8f9fa",
          borderRadius: "12px",
        }}
      >
        <h3 className="text-center fw-bold mb-4">Add a Review</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Rating (1-5)</Form.Label>
            <Form.Control
              type="number"
              {...register("rating")}
              placeholder="Enter rating"
              required
              min="1"
              max="5"
              className="rounded-3 p-2"
              style={{
                backgroundColor: theme ? "#f8f9fa" : "#2c2c2c",
                color: theme ? "#212529" : "#f8f9fa",
                border: "1px solid #ced4da",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              {...register("comment")}
              placeholder="Write your review..."
              required
              rows={3}
              className="rounded-3 p-2"
              style={{
                backgroundColor: theme ? "#f8f9fa" : "#2c2c2c",
                color: theme ? "#212529" : "#f8f9fa",
                border: "1px solid #ced4da",
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 py-2 rounded-3"
            style={{
              backgroundColor: theme ? "#ffcc00" : "#ffcc00",
              color: "#000",
              fontWeight: "bold",
              border: "none",
            }}
          >
            Submit Review
          </Button>
        </Form>
      </Card>
    </Container>
  );
};
