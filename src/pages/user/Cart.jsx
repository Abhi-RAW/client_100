import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { OrderIcon } from "../../components/shared/OrderIcon";
import { UnHappy } from "../../components/shared/UnHappy";
import { setCartData } from "../../redux/features/cartSlice"; // 

export const Cart = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { cartData } = useSelector((state) => state.cart);

  // Fetch fresh cart data
  const fetchCartData = async () => {
    try {
      const response = await axiosInstance.get("/cart");
      dispatch(setCartData(response.data)); // 
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // **Add quantity**
  const addQuantity = async (productId) => {
    try {
      const updatedCart = {
        ...cartData,
        products: cartData.products.map((product) =>
          product.productId._id === productId
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
        totalPrice: cartData.totalPrice + cartData.products.find(p => p.productId._id === productId).price, 
      };
      dispatch(setCartData(updatedCart));

      await axiosInstance.post("/cart/add-cartQuantity", { productId });

      toast.success("Quantity increased");
      fetchCartData(); // ✅ Fetch fresh data for accuracy
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error while adding the product");
    }
  };

  // **Remove quantity / Remove product if 0**
  const removeQuantity = async (productId) => {
    try {
      const product = cartData.products.find((p) => p.productId._id === productId);
      if (!product) return;

      if (product.quantity === 1) {
        // ✅ Remove product from cart when quantity becomes zero
        await axiosInstance.delete("/cart/remove-product", { data: { productId } });

        const updatedCart = {
          ...cartData,
          products: cartData.products.filter((p) => p.productId._id !== productId),
          totalPrice: cartData.totalPrice - product.price, 
        };
        dispatch(setCartData(updatedCart));

        toast.success("Removed from cart");
      } else {
        // ✅ Decrease quantity normally
        const updatedCart = {
          ...cartData,
          products: cartData.products.map((product) =>
            product.productId._id === productId
              ? { ...product, quantity: product.quantity - 1 }
              : product
          ),
          totalPrice: cartData.totalPrice - product.price, // ✅ Update total
        };
        dispatch(setCartData(updatedCart));

        await axiosInstance.delete("/cart/remove-product", { data: { productId } });
        toast.success("Quantity decreased");
      }

      fetchCartData(); // ✅ Fetch fresh data for accuracy
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error while removing the product");
    }
  };

  // **Make payment**
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
        <UnHappy message={"🚨 Alert: Your cart is feeling a bit lonely. It could really use some items to keep it company! 🚨"} theme={theme} />
      </Link>
    );
  }

  return (
    <Container className="py-5" style={{ maxWidth: "1200px" }}>
      <h1 className="text-center fw-bold my-4" style={{ color: theme ? "#333" : "#F2F2F2", fontSize: "3rem", letterSpacing: "2px" }}>
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
              <Card.Img className="img-fluid rounded-3 shadow-sm" src={product.productId.image} style={{ height: "180px", objectFit: "cover", borderRadius: "12px" }} />
            </Col>
            <Col xs={12} md={4} className="d-flex flex-column justify-content-center align-items-start">
              <h5 style={{ color: theme ? "#F2F2F2" : "#333", fontSize: "1.3rem", fontWeight: "bold", lineHeight: "1.5" }}>
                {product.productId.title}
              </h5>
              <span style={{ color: theme ? "#AAA" : "#555", fontSize: "0.95rem", marginTop: "8px" }}>
                {product.productId.description.substring(0, 90)}...
              </span>
            </Col>
            <Col xs={12} md={3} className="d-flex align-items-center justify-content-center">
              <Button onClick={() => removeQuantity(product.productId._id)} className="rounded-circle border-0" style={{ width: "40px", height: "40px", backgroundColor: theme ? "#FF4C00" : "#444", color: "#FFF", fontSize: "20px", borderRadius: "50%" }}>
                −
              </Button>
              <span className="mx-3" style={{ fontSize: "1.25rem", fontWeight: "bold", color: theme ? "#F2F2F2" : "#333" }}>
                {product.quantity}
              </span>
              <Button onClick={() => addQuantity(product.productId._id)} className="rounded-circle border-0" style={{ width: "40px", height: "40px", backgroundColor: theme ? "#FF4C00" : "#444", color: "#FFF", fontSize: "20px", borderRadius: "50%" }}>
                +
              </Button>
            </Col>
            <Col xs={12} md={2} className="text-center d-flex flex-column justify-content-center align-items-center">
              <h6 style={{ color: theme ? "#F2F2F2" : "#333", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "12px" }}>
                ₹{product.price * product.quantity}
              </h6>
            </Col>
          </Row>
        ))}
      </div>

      {/* Total Section */}
      <Row className="rounded-3 shadow-lg p-5 mt-5 d-flex justify-content-between" style={{ backgroundColor: theme ? "#FF4C00" : "#444", color: theme ? "#333" : "#F2F2F2", borderRadius: "15px" }}>
        <Col className="d-flex flex-column justify-content-center align-items-start">
          <h5>Total:</h5>
          <h4>₹{cartData.totalPrice || 0}</h4>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Button onClick={makePayment}>
            <OrderIcon height={"25px"} className="me-2" />
            Place Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
