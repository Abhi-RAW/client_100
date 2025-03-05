import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";
import { UnHappy } from "../../components/shared/UnHappy";

export const UserOrders = () => {
  const { theme } = useSelector((state) => state.theme);
  const { isUserAuth } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

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
    <Container className="py-5" style={{ minHeight: "100vh" }}>
      {orders.length > 0 && (
        <h1 className={`text-center fw-bold my-4 ${theme ? "text-dark" : "text-light"}`}>
          My Orders
        </h1>
      )}

      {orders.length === 0 && (
        <Link to="/" className="text-decoration-none">
          <UnHappy message="We are still waiting to take your first order!" theme={theme} />
        </Link>
      )}

      {orders?.map((order) => (
        <Card
          key={order._id}
          className="mb-4 shadow border-0"
          style={{ backgroundColor: theme ? "#FFF6E3" : "#1E1E1E", color: theme ? "#000" : "#fff", borderRadius: "12px" }}
        >
          <Card.Header className="d-flex justify-content-between align-items-center p-3 bg-primary text-white"
            style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>
            <span className="fw-bold">Order ID: {order._id}</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </Card.Header>

          <Card.Body>
            {order.products.map((product) => (
              <Row key={product._id} className="align-items-center py-3 px-2 border-bottom">
                <Col xs={12} md={2} className="text-center">
                  <Card.Img src={product?.productId?.image || "https://via.placeholder.com/150"} className="img-fluid rounded" style={{ maxHeight: "120px", objectFit: "contain" }} />
                </Col>

                <Col xs={12} md={4}>
                  <Card.Title className="fw-semibold">{product?.productId?.title}</Card.Title>
                  <Card.Text className="text-muted">Qty: {product?.quantity}</Card.Text>
                </Col>

                <Col xs={12} md={2} className="fw-bold">₹{product?.productId?.price * product?.quantity}</Col>

                <Col xs={12} md={4} className="text-center d-flex flex-column gap-2">
                  <Link to={isUserAuth ? `/user/add-review/${product.productId._id}` : "/login"}>
                    <Button className="fw-semibold px-4 py-2 rounded-pill bg-success border-0">
                      Add Review
                    </Button>
                  </Link>

                  {order.returnApprovalStatus === "approved" || order.returnApprovalStatus === "rejected" ? (
                    <span
                      className={`fw-bold px-3 py-1 rounded-pill ${order.returnApprovalStatus === "approved" ? "bg-success text-white" : "bg-danger text-white"}`}
                    >
                      {order.returnApprovalStatus.charAt(0).toUpperCase() + order.returnApprovalStatus.slice(1)}
                      ({new Date(order.updatedAt).toLocaleDateString()})
                    </span>
                  ) : (
                    <Link to={`/user/return/${order._id}`}>
                      <Button className="fw-semibold px-4 py-2 rounded-pill bg-danger border-0">
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
