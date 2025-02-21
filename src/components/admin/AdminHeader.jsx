import { Container, Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/features/searchSlice";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { axiosInstance } from "../../config/axiosInstance";
import { useRef } from "react";

export const AdminHeader = () => {
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputValue = useRef();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/admin/logout");
      localStorage.removeItem("token");
      navigate("/admin/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    dispatch(setSearchValue(inputValue.current.value));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Navbar
      expand="lg"
      className="py-3 fixed-top shadow-sm"
      style={{
        backgroundColor: theme ? "#F5F0CD" : "#2b2b2b",
        borderBottom: `2px solid ${theme ? "#F5F0CD" : "#2b2b2b"}`,
        transition: "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out",
      }}
    >
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand>
          <Link to="/admin" className="nav-link fw-bold fs-3" style={{ color: theme ? "#000" : "#fff" }}>
            K<span className="text-danger">-</span>Mart
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* Other Navbar Items */}
          <Nav className="me-auto">
            <NavDropdown className="me-3" title={<span style={{ color: theme ? "#000" : "#fff" }}>Seller</span>}>
              <NavDropdown.Item as={Link} to="/admin/sellers">Sellers</NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="/admin/inactive-sellers">Inactive Sellers</NavDropdown.Item> */}
              <NavDropdown.Item as={Link} to="/admin/delete-seller">Delete</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown className="me-3" title={<span style={{ color: theme ? "#000" : "#fff" }}>User</span>}>
              <NavDropdown.Item as={Link} to="/admin/users">Users</NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="/admin/inactive-users">Inactive Users</NavDropdown.Item> */}
              <NavDropdown.Item as={Link} to="/admin/delete-user">Delete</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown className="me-3" title={<span style={{ color: theme ? "#000" : "#fff" }}>Product</span>}>
              <NavDropdown.Item as={Link} to="/admin/products">Products</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/add-product">Add</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/delete-product">Delete</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown className="me-3" title={<span style={{ color: theme ? "#000" : "#fff" }}>Returns</span>}>
              <NavDropdown.Item as={Link} to="/admin/return-list-returned">Returned Orders</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/return-list-approved">Approved Returns</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/return-list-rejected">Rejected Returns</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown className="me-3" title={<span style={{ color: theme ? "#000" : "#fff" }}>Banners</span>}>
              <NavDropdown.Item as={Link} to="/admin/banners">Banner List</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/add-banner">Add Banner</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown className="me-3" title={<span style={{ color: theme ? "#000" : "#fff" }}>Orders</span>}>
              <NavDropdown.Item as={Link} to="/admin/orders-processing">Processing</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/orders-success">Success</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/orders-shipping">Shipping</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/orders-delivery">Delivery</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex ms-auto" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              ref={inputValue}
              onKeyDown={handleKeyDown}
              style={{
                background: theme ? "#fff" : "#D9D9D9",
                border: `1px solid ${theme ? "#000" : "#fff"}`,
                color: theme ? "#000" : "#fff",
                borderRadius: "5px",
                padding: "10px",
              }}
            />
            <Button
              variant="outline-dark"
              onClick={handleSearch}
              style={{
                background: theme ? "#000" : "#fff",
                color: theme ? "#fff" : "#000",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                transition: "background 0.3s ease, color 0.3s ease",
              }}
            >
              Search
            </Button>
          </Form>

          {/* Profile (Moved outside dropdown) */}
          <Link
            to="/admin/profile"
            className="nav-link fw-semibold ms-3"
            style={{ color: theme ? "#000" : "#fff", fontSize: "1.1rem" }}
          >
            Profile
          </Link>

          {/* Dark Mode Toggle */}
          <DarkMode />

          {/* Logout Button */}
          <Button
            variant="outline-danger"
            className="ms-3"
            onClick={handleLogout}
            style={{
              background: theme ? "#000" : "#fff",
              color: theme ? "#fff" : "#000",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              transition: "background 0.3s ease, color 0.3s ease",
            }}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
