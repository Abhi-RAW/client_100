import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Users = ({
  role = "user",
  action = "Activate",
  status = "activate",
}) => {
  const { theme } = useSelector((state) => state.theme);
  const { searchResult } = useSelector((state) => state.search);
  const navigate = useNavigate();

  const user = {
    users: "/user/users",
    userDelete: "user/delete-user",
    activateUser: "/user/activate-user",
    deactivateUser: "/user/deactivate-profile",
    userDetails: "/user/user-details",
    searchUsers: "user/search-active-users",
  };

  if (role === "seller") {
    user.users =
      status === "active"
        ? "/seller/active-sellers"
        : "/seller/inactive-sellers";
    user.userDelete = "/seller/delete-seller";
    user.activateUser = "/seller/activate-seller";
    user.deactivateUser = "seller/deactivate/profile";
    user.searchUsers =
      status === "active"
        ? "/seller/search-active-sellers"
        : "seller/search-inactive-sellers";
  } else if (status === "inactive") {
    user.users = "/user/inactive-users";
    user.searchUsers = "/user/search-inactive-users";
  } else if (status === "active") {
    user.users = "/user/active-users";
  }

  if (action === "Delete" && role === "user") {
    user.userDelete = "/user/delete-user";
  } else if (action === "Activate" && role === "user") {
    user.activateUser = "/user/activate-user";
  } else if (action === "Deactivate" && role === "user") {
    user.deactivateUser = "/user/deactivate-profile";
  } else if (action === "Delete" && role === "seller") {
    user.userDelete = "/seller/delete-seller";
  } else if (action === "Activate" && role === "seller") {
    user.activateUser = "/seller/activate-seller";
  } else if (action === "Deactivate" && role === "seller") {
    user.deactivateUser = "/seller/deactivate-profile";
  }

  const [users, setUsers] = useState([]);
  const [userStatus, setUserStatus] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: user.users,
        });
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [user.users, userStatus, deleteUser, searchResult]);

  const actionHandler = async (userId, action) => {
    try {
      if (action === "Delete") {
        await axiosInstance({
          method: "DELETE",
          url: user.userDelete,
          data: { userId },
        });
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
        setDeleteUser(true);
      } else if (action === "View" && role === "user") {
        navigate(`/admin/user-details/${userId}`);
      } else if (action === "Deactivate") {
        const response = await axiosInstance({
          method: "PUT",
          url: user.deactivateUser,
          data: { userId },
        });
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === userId
              ? { ...u, status: "inactive", ...response.data.data }
              : u
          )
        );
        setUserStatus(false);
      } else if (action === "Activate") {
        const response = await axiosInstance({
          method: "PUT",
          url: user.activateUser,
          data: { userId },
        });
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === userId
              ? { ...u, status: "active", ...response.data.data }
              : u
          )
        );
        setUserStatus(true);
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewProfile = (userId) => {
    if (role === "seller") {
      navigate(`/admin/seller-details/${userId}`);
      return;
    } else if (role === "user") {
      navigate(`/admin/user-details/${userId}`);
      return;
    }
  };

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: user.searchUsers,
          data: { searchResult },
        });
        setUsers(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchResult) {
      fetchSearchData();
    } else {
      setUsers(users);
    }
  }, [searchResult, user.searchUsers]);

  return (
    <Container>
      <h1
        className={theme ? "text-center text-dark mt-5" : "text-center text-light mt-5"}
      >
        {`List of ${status} ${role}s`}
      </h1>
      <Row className="mt-5">
        {users.length === 0 ? (
          <Spinner animation="border" variant="primary" className="d-block mx-auto" />
        ) : (
          users.map((user) => (
            <Col md={4} lg={3} key={user._id} className="mb-4">
              <Card
                style={{
                  backgroundColor: theme ? "#F0F8FF" : "#444444",
                  color: theme ? "#000" : "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Card.Body>
                  <Card.Title className="text-center">{user.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted text-center">
                    {user.email}
                  </Card.Subtitle>
                  <div className="d-flex justify-content-center mt-3">
                    <Button
                      onClick={() => viewProfile(user._id)}
                      variant={theme ? "outline-primary" : "outline-light"}
                      className="mx-2"
                    >
                      View Profile
                    </Button>
                    <Button
                      onClick={() => actionHandler(user._id, action)}
                      variant={theme ? "outline-success" : "outline-warning"}
                      className="mx-2"
                    >
                      {action}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};
