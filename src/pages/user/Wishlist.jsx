import { useEffect } from "react";
import toast from "react-hot-toast";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { UnHappy } from "../../components/shared/UnHappy";
import { setWishlistData } from "../../redux/features/wishlistSlice";

export const Wishlist = () => {
  const dispatch = useDispatch();

  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Get current wishlist data
  const { wishlistData } = useSelector((state) => state.wishlist);

  // Function to fetch updated wishlist
  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get("/wishlist/wishlist");
      dispatch(setWishlistData(response.data.data)); // Update Redux store
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch wishlist on component mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  // Add to cart
  const addToCart = async (productId) => {
    try {
      await axiosInstance.post("/cart/add-product-wishlist-to-cart", { productId });
      toast.success("Product added to cart");
      fetchWishlist(); // Fetch updated wishlist after adding to cart
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to cart");
      console.log(error);
    }
  };

  // Remove product
  const removeProduct = async (productId) => {
    try {
      await axiosInstance.delete("/wishlist/remove-product", {
        data: { productId },
      });
      toast.success("Product removed from wishlist");
      fetchWishlist(); // Fetch updated wishlist after removing product
    } catch (error) {
      toast.error("Error removing product");
      console.log(error);
    }
  };

  return (
    <Container fluid className="py-5">
      {/* Wishlist Header */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8}>
          {wishlistData?.products?.length > 0 ? (
            <h1
              className="text-center fw-bold mb-4"
              style={{
                color: theme ? "#333" : "#FFF",
                fontSize: "2.5rem",
              }}
            >
              🧡 Your Wishlist
            </h1>
          ) : (
            <Link className="text-decoration-none" to={"/"}>
              <UnHappy message={" Tip: Start adding your favorite items to make your dreams come true. Your future self will thank you!"} theme={theme} />
            </Link>
          )}
        </Col>
      </Row>

      {/* Wishlist Items */}
      {wishlistData?.products?.length > 0 && (
        <Row>
          {wishlistData?.products?.map((product) => (
            <Col
              xs={12} sm={6} md={4} lg={3}
              key={product.productId._id}
              className="mb-4 d-flex justify-content-center"
            >
              <Card
                className="border-0 shadow-sm rounded-4 w-100"
                style={{
                  backgroundColor: theme ? "#FFF" : "#F4F4F4",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
                }}
              >
                <Card.Img
                  variant="top"
                  src={product.productId.image}
                  alt={product.productId.title}
                  style={{
                    objectFit: "cover",
                    height: "200px",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <Card.Body>
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/product-details/${product.productId._id}`}
                  >
                    <Card.Title
                      className="fw-bold"
                      style={{
                        fontSize: "1.25rem",
                        color: theme ? "#333" : "#111",
                      }}
                    >
                      {product.productId.title}
                    </Card.Title>
                  </Link>
                  <Card.Text
                    className="text-muted"
                    style={{
                      fontSize: "0.95rem",
                      height: "60px",
                      overflow: "hidden",
                    }}
                  >
                    {product.productId.description.substring(0, 100)}...
                  </Card.Text>

                  {/* Price and Actions */}
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{
                      fontWeight: "bold",
                      color: theme ? "#FF4C00" : "#333",
                    }}
                  >
                    ₹{product.productId.price}
                    <div className="d-flex gap-2">
                      <Button
                        onClick={() => addToCart(product.productId._id)}
                        variant={theme ? "warning" : "dark"}
                        size="sm"
                        style={{
                          fontSize: "0.9rem",
                          padding: "6px 12px",
                          borderRadius: "5px",
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => removeProduct(product.productId._id)}
                        variant="danger"
                        size="sm"
                        style={{
                          fontSize: "0.9rem",
                          padding: "6px 12px",
                          borderRadius: "5px",
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
