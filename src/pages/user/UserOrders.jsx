import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";
import { UnHappy } from "../../components/shared/UnHappy";

export const UserOrders = () => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Store order data
  const [orders, setOrders] = useState([]);

  // Api call
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/order/get-user-orders",
        });

        // Sort orders by createdAt field
        const sortedOrders = response?.data?.data?.sort((a, b) => {
          return new Date(b?.createdAt) - new Date(a?.createdAt); // sorting in descending order
        });

        setOrders(sortedOrders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <Container style={{ minHeight: "400px" }}>
      {orders.length !== 0 && (
        <h1
          className={
            theme
              ? "text-black h1 text-center fw-bold my-5"
              : "text-white h1 text-center fw-bold my-5"
          }
        >
          Orders
        </h1>
      )}
      {orders.length === 0 && (
        <Link className="text-decoration-none" to={"/"}>
          <UnHappy
            message={"We are still waiting to take your first order!"}
            theme={theme}
          />
        </Link>
      )}
      {orders?.map((order) => (
        <div key={order._id}>
          {order.products.map((product) => (
            <Row
              className="d-flex justify-content-between align-items-center gap-3 my-2 p-3 rounded-3 mx-1"
              key={product._id}
              style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
            >
              <Col xs={12} md={2}>
                <Card.Img
                  className="img-fluid object-fit-contain rounded-3"
                  src={product?.productId?.image}
                  style={{ minHeight: "210px" }}
                />
              </Col>
              <Col xs={12} md={3}>
                <Card.Title className="fw-normal">
                  {product?.productId?.title}
                </Card.Title>
              </Col>
              <Col xs={12} md={2}>
                <Card.Text className="fw-normal">{product?.quantity}</Card.Text>
              </Col>
              <Col xs={12} md={2}>
                <Card.Text className="fw-normal">
                  ₹{product?.productId?.price * product?.quantity}
                </Card.Text>
              </Col>
              <Col xs={12} md={2}>
                {order.returnApprovalStatus === "approved" ||
                order.returnApprovalStatus === "rejected" ? (
                  <Card.Text className={theme ? "warning text-white" : "dark"}>
                    {order.returnApprovalStatus === "approved"
                      ? `Returned (${new Date(
                          order.updatedAt
                        ).toLocaleDateString()})`
                      : `Rejected (${new Date(
                          order.updatedAt
                        ).toLocaleDateString()})`}
                  </Card.Text>
                ) : (
                  <Link to={`/user/return/${order._id}`}>
                    <Button
                      variant={theme ? "warning text-white" : "dark text-white"}
                    >
                      Return
                    </Button>
                  </Link>
                )}
              </Col>
            </Row>
          ))}
        </div>
      ))}
    </Container>
  );
};
