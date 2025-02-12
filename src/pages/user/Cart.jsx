import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { OrderIcon } from "../../components/shared/OrderIcon";
import { UnHappy } from "../../components/shared/UnHappy";

export const Cart = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Get cart data
  const { cartData } = useSelector((state) => state.cart);

  // Add quantity
  const addQuantity = async (productId) => {
    try {
      await axiosInstance.post("/cart/add-cartQuantity", { productId });
      toast.success("Quantity increased");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error while adding the product");
    }
  };

  // Remove quantity
  const removeQuantity = async (productId) => {
    try {
      await axiosInstance.delete("/cart/remove-product", { data: { productId } });
      toast.success("Quantity decreased");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error while removing the product");
    }
  };

  // Make payment
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      const session = await axiosInstance.post("/payment/create-checkout-session", {
        products: cartData?.products,
      });
      await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
    } catch (error) {
      console.error(error);
    }
  };

  if (!cartData?.products?.length) {
    return (
      <Link className="text-decoration-none" to={"/"}>
        <UnHappy message={"Your cart is empty!"} theme={theme} />
      </Link>
    );
  }

  return (
    <Container className="py-5" style={{ maxWidth: "1200px" }}>
      <h1
        className="text-center fw-bold my-4"
        style={{
          color: theme ? "#333" : "#F2F2F2",
          fontSize: "3rem",
          letterSpacing: "2px",
        }}
      >
        🛒 Your Cart
      </h1>

      <div className="cart-items-container" style={{ borderTop: "1px solid #DDD" }}>
        {cartData?.products?.map((product) => (
          <Row
            key={product.productId._id}
            className="cart-item my-4 p-4 shadow-lg"
            style={{
              backgroundColor: theme ? "#1F1F1F" : "#FFF",
              borderRadius: "12px",
              boxShadow: theme ? "0 4px 20px rgba(0, 0, 0, 0.6)" : "0 4px 20px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
          >
            <Col xs={12} md={3} className="text-center">
              <Card.Img
                className="img-fluid rounded-3 shadow-sm"
                src={product.productId.image}
                style={{
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: theme ? "0 4px 8px rgba(0, 0, 0, 0.5)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Col>
            <Col xs={12} md={4} className="d-flex flex-column justify-content-center align-items-start">
              <h5
                style={{
                  color: theme ? "#F2F2F2" : "#333",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  lineHeight: "1.5",
                }}
              >
                {product.productId.title}
              </h5>
              <span
                style={{
                  color: theme ? "#AAA" : "#555",
                  fontSize: "0.95rem",
                  marginTop: "8px",
                }}
              >
                {product.productId.description.substring(0, 90)}...
              </span>
            </Col>
            <Col xs={12} md={3} className="d-flex align-items-center justify-content-center">
              <Button
                onClick={() => removeQuantity(product.productId._id)}
                className="rounded-circle border-0"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: theme ? "#FF4C00" : "#444",
                  color: "#FFF",
                  fontSize: "20px",
                  borderRadius: "50%",
                  transition: "all 0.3s ease-in-out",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                −
              </Button>
              <span
                className="mx-3"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: theme ? "#F2F2F2" : "#333",
                }}
              >
                {product.quantity}
              </span>
              <Button
                onClick={() => addQuantity(product.productId._id)}
                className="rounded-circle border-0"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: theme ? "#FF4C00" : "#444",
                  color: "#FFF",
                  fontSize: "20px",
                  borderRadius: "50%",
                  transition: "all 0.3s ease-in-out",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                +
              </Button>
            </Col>
            <Col xs={12} md={2} className="text-center d-flex flex-column justify-content-center align-items-center">
              <h6
                style={{
                  color: theme ? "#F2F2F2" : "#333",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "12px",
                }}
              >
                ₹{product.price * product.quantity}
              </h6>
            </Col>
          </Row>
        ))}
      </div>

      {/* Total Section */}
      <Row
        className="rounded-3 shadow-lg p-5 mt-5 d-flex justify-content-between"
        style={{
          backgroundColor: theme ? "#FF4C00" : "#444",
          color: theme ? "#333" : "#F2F2F2",
          borderRadius: "15px",
          boxShadow: theme ? "0 8px 16px rgba(0, 0, 0, 0.5)" : "0 8px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Col className="d-flex flex-column justify-content-center align-items-start">
          <h5
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: theme ? "#333" : "#F2F2F2",
              marginBottom: "15px",
            }}
          >
            Total:
          </h5>
          <h4
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: theme ? "#333" : "#F2F2F2",
            }}
          >
            ₹{cartData.totalPrice || 0}
          </h4>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            onClick={makePayment}
            className="fw-bold d-flex align-items-center justify-content-center py-3"
            style={{
              backgroundColor: theme ? "#333" : "#FF4C00",
              color: theme ? "#F2F2F2" : "#333",
              border: "none",
              fontSize: "1.25rem",
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
              padding: "12px 40px",
            }}
          >
            <OrderIcon height={"25px"} className="me-2" />
            Place Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
