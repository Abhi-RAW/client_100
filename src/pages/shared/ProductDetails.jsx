import toast from "react-hot-toast";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { BuyNow } from "./BuyNow";
import { axiosInstance } from "../../config/axiosInstance";
import { useEffect, useState } from "react";
import { Loading } from "../../components/shared/Loading";

export const ProductDetails = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Get user status
  const { isUserAuth } = useSelector((state) => state.user);

  // Config params
  const { productId } = useParams();

  // Config navigate
  const navigate = useNavigate();

  // Store data
  const [reviewData, setReviewData] = useState([]);
  const [deleteReview, setDeleteReview] = useState(false);

  // Handle loading
  const [loading, setLoading] = useState(true);

  // Api call
  useEffect(() => {
    (async () => {
      // Set loading true

      try {
        const response = await axiosInstance({
          method: "GET",
          url: `/review/get-review/${productId}`,
        });
        setReviewData(response.data.data);
        // Handle loading
        setLoading(false);
      } catch (error) {
        console.log(error);
        // Handle loading
        setLoading(false);
      }
    })();
  }, [deleteReview]);

  // Api call
  const [productData] = useFetch(`/product/product-details/${productId}`);

  // Add to cart
  const addToCart = async () => {
    if (isUserAuth) {
      try {
        // Api call
        const response = await axiosInstance({
          method: "POST",
          url: "/cart/add-product",
          data: { productId },
        });
        toast.success("Product added to cart");
        console.log(response);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  // Delete review
  const handleDelete = async (reviewId) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: "/review/delete-review",
        data: { reviewId },
      });
      setDeleteReview(!deleteReview);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{ minHeight: 450 }}>
      <h1
        className={
          theme
            ? "h1 text-center fw-bold text-black mt-5"
            : "h1 text-center fw-bold text-white mt-5"
        }
      >
        Product Details
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <Row>
          <Col xs={12} md={6}>
            <Card
              className="crd-box d-flex justify-content-center align-items-center mt-5 mx-auto pr-card"
              style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
            >
              <Card.Img
                className="object-fit-contain pr-card-img p-2"
                variant="top"
                src={productData?.image}
              />
              <Card.Body>
                <Card.Title>{productData?.title}</Card.Title>

                <Card.Text>{productData?.description}</Card.Text>
                <Card.Text className=" crd-price fw-bold text-center fw-bolder h5">
                  ₹{productData?.price}
                </Card.Text>
                <Button
                  onClick={addToCart}
                  className={
                    theme ? "w-100 mt-1 text-white" : "w-100 mt-1 text-white"
                  }
                  variant={theme ? "warning" : "dark"}
                >
                  <BuyNow />
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              className="mt-5"
              style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
            >
              <Card.Body>
                <Card.Title className="text-center fw-bold p-2">
                  Reviews
                </Card.Title>
                <ul className=" p-2">
                  {reviewData?.map((review) => (
                    <li
                      className="list-unstyled d-flex justify-content-between border mb-2 p-2 gap-4"
                      key={review._id}
                    >
                      <h6 className="fw-bold">{review?.userId?.name}</h6>
                      <p>{review?.comment}</p>
                      <Button
                        onClick={() => handleDelete(review._id)}
                        className="btn-sm text-white"
                        variant={theme ? "warning" : "dark"}
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};
