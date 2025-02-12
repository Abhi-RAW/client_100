import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";
import { Container, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";
import styled from "styled-components";
import { Box } from "@mui/material";

const StyledContainer = styled(Container)`
  min-height: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 50px;
  color: ${({ theme }) => (theme ? "black" : "white")};
`;

const StyledTable = styled(Table)`
  border-radius: 10px;
`;

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  background-color: ${({ theme }) => (theme ? "#FFF6E3" : "#d9d9d9")};
  &:hover {
    background-color: ${({ theme }) => (theme ? "#F9E4B7" : "#B8B8B8")};
  }
`;

const StyledTableCell = styled(TableCell)`
  background-color: ${({ theme }) => (theme ? "#FFF6E3" : "#d9d9d9")};
  color: ${({ theme }) => (theme ? "black" : "white")};
  text-decoration: none;
`;

export const OrderList = ({ action = "processing", role = "admin" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Get search value
  const { searchResult } = useSelector((state) => state.search);

  // Store orders
  const [orders, setOrders] = useState([]);

  // Handle role
  const user = {
    role: "admin",
    orders: "/order/get-orders-by-status",
    searchOrders: "/order/search-orders",
  };

  if (role === "seller") {
    user.role = "seller";
    user.orders = "/order/get-seller-orders-by-status";
    user.searchOrders = "/order/search-seller-orders";
  }

  // Api call
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: user.orders,
          data: { status: action },
        });
        setOrders(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [action, user.orders]);

  // Search orders
  useEffect(() => {
    const handleSearch = async () => {
      if (searchResult) {
        try {
          const response = await axiosInstance({
            method: "POST",
            url: user.searchOrders,
            data: { searchResult, status: action },
          });
          setOrders(response?.data?.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        // When no searchResult, fetch orders again
        const fetchOrders = async () => {
          try {
            const response = await axiosInstance({
              method: "POST",
              url: user.orders,
              data: { status: action },
            });
            setOrders(response?.data?.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchOrders();
      }
    };
    handleSearch();
  }, [searchResult, action, user.orders]);

  return (
    <StyledContainer>
      <Title theme={theme}>Order List</Title>
      <TableContainer component={Paper}>
        <StyledTable aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <StyledTableRow key={order._id}>
                <StyledTableCell component="th" scope="row">
                  <Link
                    className="text-decoration-none"
                    to={`/${role}/order-details-${action}/${order?._id}`}
                  >
                    {order?._id}
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    className="text-decoration-none"
                    to={`/${role}/order-details-${action}/${order?._id}`}
                  >
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    className="text-decoration-none"
                    to={`/${role}/order-details-${action}/${order?._id}`}
                  >
                    {order?.orderStatus}
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </StyledContainer>
  );
};
