import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";

export const AddReview = () => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Config params
  const { productId } = useParams();

  //config register
  const { register, handleSubmit } = useForm();

  // config navigate
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "POST",
        url: "/review/add-review",
        data: { ...data, productId },
      });
      if(response){
        navigate(`/product-details/${productId}`);
      }
      toast.success("Review added");
    } catch (error) {
      console.log(error);
      
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data, productId))}
        className=" login-box mx-auto mt-5 d-flex flex-column gap-2 align-items-center justify-content-center rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9", minHeight: '400px' }}
      >
        <h3 className="mt-2 fw-bold text-black">Add Review</h3>

        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="number"
            {...register("rating")}
            placeholder="Rating"
            required
          />
        </div>

        <div>
          <textarea
            className="rounded-2 border-0 px-3 py-2 text-center"
            type="text"
            {...register("comment")}
            placeholder="Comment"
            required
          />
        </div>

        <div>
          <Button
            className="rounded-2 border-0 px-4 py-2 hover text-center text-white mt-1"
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
