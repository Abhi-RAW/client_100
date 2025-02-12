import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  min-height: 500px;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
  color: ${({ theme }) => (theme ? "black" : "white")};
  font-size: 36px;
  text-transform: uppercase;
`;

const StyledCard = styled(Card)`
  background-color: ${({ theme }) => (theme ? "#F9F9F9" : "#333")};
  padding: 20px;
  margin: 15px 0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled(Card.Img)`
  object-fit: cover;
  border-radius: 10px;
`;

const ActionButton = styled(Button)`
  width: 100%;
  background-color: ${({ theme }) => (theme ? "#FF8A00" : "#444")};
  color: ${({ theme }) => (theme ? "black" : "white")};
  font-weight: 600;
  padding: 12px;
  border-radius: 25px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => (theme ? "#FFA500" : "#333")};
  }
`;

const OrderDetails = ({ role = "admin", action = "Success" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Get order id
  const { orderId } = useParams();

  // Config navigate
  const navigate = useNavigate();

  // Store order data
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state

  // Api call to fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);  // Set loading to true before the fetch
        const response = await axiosInstance({
          method: "GET",
          url: `/order/get-order-details/${orderId}`,
        });
        // Set data
        setOrders(response?.data?.data);
      } catch (error) {
        toast.error("Failed to fetch order details.");
        console.log(error);
      } finally {
        setLoading(false);  // Set loading to false after fetch
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Handle actions (like changing order status)
  const actionHandler = async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/order/change-order-status",
        data: { orderId, status: action.toLowerCase() },
      });
      toast.success(`Order ${action}`);
      // Navigate
      navigate(`/${role}/orders-${action.toLowerCase()}`);
    } catch (error) {
      toast.error("Failed to change order status.");
      console.log(error);
    }
  };

  if (loading) {
    return (
      <StyledContainer>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="500px">
          <Spinner animation="border" variant="primary" />
        </Box>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Title theme={theme}>Order Details</Title>

      {orders?.products?.map((product) => (
        <StyledCard key={product._id} theme={theme}>
          <Row className="d-flex justify-content-between align-items-center">
            <Col xs={12} md={3}>
              <ProductImage
                className="img-fluid"
                src={product.productId.image}
                alt={product.productId.title}
                style={{ minHeight: "210px" }}
              />
            </Col>
            <Col xs={12} md={4}>
              <Typography variant="h6" className="fw-normal">
                {product.productId.title}
              </Typography>
            </Col>
            <Col xs={12} md={2}>
              <Typography className="fw-normal">{product.quantity}</Typography>
            </Col>
            <Col xs={12} md={2}>
              <Typography className="fw-normal">
                ₹{product.productId.price * product.quantity}
              </Typography>
            </Col>
          </Row>
        </StyledCard>
      ))}

      <Row
        className="d-flex justify-content-between align-items-center p-4 rounded-3 mx-1 mt-3"
        style={{
          backgroundColor: theme ? "#F4F4F4" : "#555",
          borderRadius: "20px",
        }}
      >
        <Col className="fw-normal">
          <Typography variant="h6">Total</Typography>
        </Col>
        <Col className="fw-normal">
          <Typography variant="h6">₹{orders.totalPrice || 0}</Typography>
        </Col>
        <Col>
          {role !== "admin" && action === "Success" ? (
            ""
          ) : (
            <ActionButton
              variant="contained"
              theme={theme}
              onClick={actionHandler}
              aria-label="Change Order Status"
            >
              {action}
            </ActionButton>
          )}
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default OrderDetails;
