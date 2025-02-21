import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

export const Return = () => {
  // Get theme state
  const { theme } = useSelector((state) => state.theme);

  // Get order ID from URL params
  const { orderId } = useParams();

  // Form configuration
  const { register, handleSubmit } = useForm();

  // Navigation configuration
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post(`order/request-return/${orderId}`, data);
      toast.success("Return request sent!");

      // Redirect to user orders
      navigate("/user/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Return request failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "80vh",
        backgroundColor: theme ? "#FFF6E3" : "#1e1e1e",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 rounded-4 shadow-lg"
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: theme ? "#ffffff" : "#2c2c2c",
        }}
      >
        <h3
          className={`text-center fw-bold mb-4 ${
            theme ? "text-dark" : "text-light"
          }`}
        >
          Return Order
        </h3>

        <div className="mb-3">
          <textarea
            className="form-control rounded-3 px-3 py-2"
            {...register("returnReason")}
            placeholder="Enter return reason..."
            rows="4"
            required
            style={{
              backgroundColor: theme ? "#f8f9fa" : "#3a3a3a",
              color: theme ? "#000" : "#fff",
            }}
          />
        </div>

        <Button
          className="w-100 rounded-3 fw-bold"
          type="submit"
          variant={theme ? "warning" : "light"}
        >
          Submit Request
        </Button>
      </form>
    </div>
  );
};
