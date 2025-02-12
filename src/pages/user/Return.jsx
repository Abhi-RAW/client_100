import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";

export const Return = () => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Config params
  const {orderId} = useParams()

  //config register
  const { register, handleSubmit } = useForm();

  // config navigate
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "POST",
        url: `order/request-return/${orderId}`,
        data,
      });
      toast.success("Return request send!");

      // Navigate to orders
      navigate('/user/orders');
    } catch (error) {
      toast.error("Return request failed");
    }
  };

  return (
    <div style={{ minHeight: "500px" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" login-box mx-auto mt-5 d-flex flex-column gap-2 align-items-center justify-content-center rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <h3 className="mt-2 fw-bold text-black">Return</h3>

        <div>
          <textarea
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            {...register("returnReason")}
            placeholder="Reason"
            required
          />
        </div>
        <div>
          <Button
            className="rounded-2 border-0 px-4 py-2 hover text-black text-center text-white mt-1"
            type="submit"
            variant={theme ? "warning" : "dark"}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
