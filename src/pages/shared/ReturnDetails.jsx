import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const ReturnDetails = ({ role = "admin" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Get order id
  const { orderId } = useParams();

  // Handle role
  const user = {
    role: "admin",
    returnDetails: `/order/return-details/${orderId}`,
  };

  if (role === "seller") {
    (user.role = "seller"),
      (user.returnDetails = `/order/return-details-seller/${orderId}`);
  }

  // Config navigate
  const navigate = useNavigate();

  // Store order data
  const [orders, setOrders] = useState([]);

  // Api call
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: user.returnDetails,
        });

        // Set data
        setOrders(response?.data?.data);
      } catch (error) {
        toast(error.response?.data?.message);
      }
    };

    fetchOrderDetails();
  }, []);

  // Handle action
  const actionHandler = async (action) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/order/handle-return",
        data: { orderId, action },
      });
      toast(response?.data?.message);
      // Navigate
      navigate(`/${role}/return-list-returned`);
    } catch (error) {
      toast(error.response?.data?.message);
    }
  };

  return (
    <Container style={{ minHeight: "450px" }}>
      <h1
        className={
          theme
            ? "text-black  h1 text-center fw-bold my-5"
            : "text-white h1 text-center fw-bold my-5"
        }
      >
        Return Details
      </h1>

      {orders?.products?.map((product) => (
        <Row
          className="d-flex justify-content-between align-items-center gap-3 my-2 p-3 rounded-3 mx-1"
          key={product._id}
          style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
        >
          <Col xs={12} md={2}>
            <Card.Img
              className="img-fluid object-fit-contain rounded-3"
              src={product.productId.image}
              style={{ minHeight: "210px" }}
            />
          </Col>
          <Col xs={12} md={3}>
            <Card.Title className="fw-normal">
              {product.productId.title}
            </Card.Title>
          </Col>
          <Col xs={12} md={2}>
            <Card.Text className="fw-normal">{product.quantity}</Card.Text>
          </Col>
          <Col xs={12} md={2}>
            <Card.Text className="fw-normal">
              ₹{product.productId.price * product.quantity}
            </Card.Text>
          </Col>
          <Col xs={12} md={2}>
            {orders?.returnApprovalStatus === "pending" ? (
              <>
                <Button
                  onClick={() => actionHandler("approve")}
                  className="text-white me-1  "
                  variant={theme ? "warning " : "dark "}
                >
                  <span className="me-1"></span>
                  Approve
                </Button>
                <Button
                  onClick={() => actionHandler("reject")}
                  className=" text-white "
                  variant={theme ? "warning " : "dark "}
                >
                  <span className="me-1"></span>
                  Reject
                </Button>
              </>
            ) : (
              <>
                {orders?.returnApprovalStatus} (
                {new Date(orders?.createdAt).toLocaleDateString()})
              </>
            )}
          </Col>
        </Row>
      ))}
    </Container>
  );
};
