import { useEffect, useState } from "react";
import { Table, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

export const ReturnList = ({ action = "Pending", role = "admin" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Get search value
  const { searchResult } = useSelector((state) => state.search);

  // Store orders
  const [orders, setOrders] = useState([]);

  // Handle role
  const user = {
    role: "admin",
    returnRequests: "/order/return-requests",
    returnStatus: "/order/get-return-status",
    searchReturnRequests: "order/search-return-requests",
    searchOrderStatus: "/order/search-order-by-return-status",
  };

  if (role === "seller") {
    (user.role = "seller"),
      (user.returnRequests = "/order/seller-return-requests");
    user.searchReturnRequests = "/order/search-seller-return-requests";
    user.returnStatus = "/order/get-return-status-seller";
    user.searchOrderStatus =  "/order/search-seller-order-by-return-status";
  }

  // Api call
  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: action === "Returned" ? user.returnStatus : user.returnRequests,
          data: { status: action.toLowerCase() },
        });

        setOrders(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReturns();
  }, [action]);

  // Search orders
  useEffect(() => {
    const handleSearch = async () => {
      if (searchResult) {
        try {
          const response = await axiosInstance({
            method: "POST",
            url: action === 'Returned' ? user.searchOrderStatus : user.searchReturnRequests,
            data: { searchResult, status: action.toLowerCase() },
          });
          setOrders(response?.data?.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        const fetchOrders = async () => {
          try {
            const response = await axiosInstance({
              method: "POST",
              url:
                action === "Returned" ? user.returnStatus : user.returnRequests,
              data: { status: action.toLowerCase() },
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
  }, [searchResult, action, ]);

  return (
    <Container style={{ minHeight: "400px" }}>
      <h1
        className={
          theme ? "text-center text-black mt-5" : "text-center text-white mt-5"
        }
      >
        Return List {action !== "Returned" ? action : ""}
      </h1>
      <Row
        className="mt-5 p-2 rounded-3"
        style={{
          backgroundColor: theme ? "#FFF6E3" : "#d9d9d9",
        }}
      >
        <Table className="rounded-3">
          <thead className="rounded-3">
            <tr>
              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Order ID
              </th>

              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Date
              </th>

              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td
                  style={{
                    backgroundColor: theme ? "#FFF6E3" : "#d9d9d9",
                    cursor: "pointer",
                  }}
                >
                  <Link
                    className="text-decoration-none text-black"
                    to={`/${role}/return-details-${action.toLowerCase()}/${
                      order?._id
                    }`}
                  >
                    {" "}
                    {order?._id}
                  </Link>
                </td>

                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  <Link
                    className="text-decoration-none text-black"
                    to={`/${role}/return-details-${action.toLowerCase()}/${
                      order?._id
                    }`}
                  >
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </Link>
                </td>

                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  <Link
                    className="text-decoration-none text-black"
                    to={`/${role}/return-details-${action}/${order?._id}`}
                  >
                    {order?.returnApprovalStatus}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
