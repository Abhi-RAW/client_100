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
  const { theme } = useSelector((state) => state.theme);
  const { isUserAuth, user } = useSelector((state) => state.user);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState([]);
  const [deleteReview, setDeleteReview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(`/review/get-review/${productId}`);
        setReviewData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [deleteReview]);

  const [productData] = useFetch(`/product/product-details/${productId}`);

  const addToCart = async () => {
    if (isUserAuth) {
      try {
        await axiosInstance.post("/cart/add-product", { productId });
        toast.success("Product added to cart");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      navigate("/login");
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axiosInstance.delete("/review/delete-review", { data: { reviewId } });
      setDeleteReview(!deleteReview);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <h1
        className="text-center fw-bold mt-5"
        style={{
          fontSize: "2.8rem",
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: theme ? "#222" : "#F8F8F8", // Dark mode: Light gray | Light mode: Deep black
          textShadow: theme ? "1px 1px 4px rgba(255,255,255,0.2)" : "1px 1px 3px rgba(0,0,0,0.3)", // Subtle shadow for better visibility
        }}
      >
        Product Details
      </h1>

      {loading ? (
        <Loading />
      ) : (
        <Row className="mt-4">
          {/* Product Image & Info */}
          <Col xs={12} md={6}>
            <Card
              className="product-card shadow-sm border-0 mx-auto"
              style={{
                background: theme ? "#1E1E1E" : "#F7F7F7",
                color: theme ? "#EAEAEA" : "#222",
                borderRadius: "12px",
                border: theme ? "none" : "1px solid #DDDDDD",
              }}
            >
              <Card.Img
                className="product-image p-3"
                variant="top"
                src={productData?.image}
                style={{
                  borderRadius: "10px",
                  maxHeight: "350px",
                  objectFit: "contain",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.03)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              />
              <Card.Body>
                <Card.Title className="fw-bold text-center">{productData?.title}</Card.Title>
                <Card.Text
                  className="text-center"
                  style={{
                    color: theme ? "#CFCFCF" : "#444",
                    fontSize: "1.1rem",
                  }}
                >
                  {productData?.description}
                </Card.Text>
                <Card.Text className="text-center fw-bold h3">₹{productData?.price}</Card.Text>

                {/* Buy Now Button */}
                <Button
                  onClick={addToCart}
                  className="w-100 fw-semibold py-2 mt-2"
                  style={{
                    background: theme ? "#00A9D8" : "#3A7BD5",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                  <BuyNow />
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Reviews Section */}
          <Col>
            <Card
              className="reviews-card shadow-sm"
              style={{
                background: theme ? "#2A2A2A" : "#EFEFEF",
                borderRadius: "12px",
                padding: "15px",
              }}
            >
              <Card.Body>
                <Card.Title
                  className="text-center fw-bold"
                  style={{
                    color: theme ? "#EAEAEA" : "#222",
                    fontSize: "1.5rem",
                  }}
                >
                  Reviews
                </Card.Title>
                <ul className="list-unstyled p-2">
                  {reviewData?.map((review) => (
                    <li
                      className="d-flex flex-column mb-3 p-3"
                      key={review._id}
                      style={{
                        borderRadius: "10px",
                        background: theme ? "#3A3A3A" : "#F4F4F4",
                        color: theme ? "#fff" : "#333",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="fw-bold">{review?.userId?.name}</h6>
                        <small
                          style={{
                            fontSize: "0.85rem",
                            color: theme ? "#A8A8A8" : "#666",
                          }}
                        >
                          {new Date(review?.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <p className="m-0 mt-1">{review?.comment}</p>

                      {/* Show delete button only if the logged-in user wrote the review */}
                      {user && user.id === review?.userId?._id && (
                        <Button
                          onClick={() => handleDelete(review._id)}
                          className="btn-sm fw-semibold mt-2"
                          style={{
                            backgroundColor: "#FF6B6B",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            padding: "5px 10px",
                            transition: "0.3s",
                          }}
                          onMouseOver={(e) => (e.target.style.opacity = "0.8")}
                          onMouseOut={(e) => (e.target.style.opacity = "1")}
                        >
                          Delete
                        </Button>
                      )}
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
