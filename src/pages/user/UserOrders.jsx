import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";
import { UnHappy } from "../../components/shared/UnHappy";

export const UserOrders = () => {
  const { theme } = useSelector((state) => state.theme);
  const [orders, setOrders] = useState([]);

  // Fetch Orders
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get("/order/get-user-orders");

        const sortedOrders = response?.data?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <Container className="py-4" style={{ minHeight: "100vh" }}>
      
      {/* Title */}
      {orders.length > 0 && (
        <h1 className={`text-center fw-bold my-4 ${theme ? "text-black" : "text-white"}`}>
          My Orders
        </h1>
      )}

      {/* No Orders */}
      {orders.length === 0 && (
        <Link to="/" className="text-decoration-none">
          <UnHappy message="We are still waiting to take your first order!" theme={theme} />
        </Link>
      )}

      {/* Order List */}
      {orders?.map((order) => (
        <Card
          key={order._id}
          className="mb-4 shadow-sm border-0"
          style={{
            backgroundColor: theme ? "#FFF6E3" : "#1E1E1E",
            color: theme ? "#000" : "#fff",
            borderRadius: "12px",
          }}
        >
          <Card.Header className="d-flex justify-content-between align-items-center p-3" 
            style={{ 
              backgroundColor: theme ? "#007BFF" : "#333",  // New Blue color
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}>
            <span className="fw-bold">Order ID: {order._id}</span>
            <span className="fw-normal">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </Card.Header>

          <Card.Body>
            {order.products.map((product) => (
              <Row
                key={product._id}
                className="align-items-center py-3 px-2"
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                {/* Product Image */}
                <Col xs={12} md={2} className="text-center">
                  <Card.Img
                    src={product?.productId?.image}
                    className="img-fluid rounded"
                    style={{ maxHeight: "150px", objectFit: "contain" }}
                  />
                </Col>

                {/* Product Title */}
                <Col xs={12} md={4}>
                  <Card.Title className="fw-semibold">{product?.productId?.title}</Card.Title>
                  <Card.Text className="fw-light">Qty: {product?.quantity}</Card.Text>
                </Col>

                {/* Price */}
                <Col xs={12} md={2} className="fw-bold">
                  ₹{product?.productId?.price * product?.quantity}
                </Col>

                {/* Return Status / Button */}
                <Col xs={12} md={4} className="text-center">
                  {order.returnApprovalStatus === "approved" || order.returnApprovalStatus === "rejected" ? (
                    <span
                      className={`fw-bold px-3 py-1 rounded-pill ${order.returnApprovalStatus === "approved"
                        ? "bg-success text-white"
                        : "bg-danger text-white"
                      }`}
                    >
                      {order.returnApprovalStatus.charAt(0).toUpperCase() + order.returnApprovalStatus.slice(1)}{" "}
                      ({new Date(order.updatedAt).toLocaleDateString()})
                    </span>
                  ) : (
                    <Link to={`/user/return/${order._id}`}>
                      <Button
                        className="fw-semibold px-3 py-2 rounded-pill"
                        style={{
                          backgroundColor: theme ? "#007BFF" : "#ff6347",  // Blue in Light Mode, Red in Dark Mode
                          border: "none",
                          color: theme ? "#fff" : "#fff",
                        }}
                      >
                        Request Return
                      </Button>
                    </Link>
                  )}
                </Col>
              </Row>
            ))}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};
