import { Container, Navbar, NavDropdown, Form, Button, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { axiosInstance } from "../../config/axiosInstance";
import { useRef } from "react";
import { setSearchValue } from "../../redux/features/searchSlice";

export const SellerHeader = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const inputValue = useRef();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/seller/logout");
      localStorage.removeItem("token");
      navigate("/seller/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Searching  
  const handleSearch = () => dispatch(setSearchValue(inputValue.current.value));
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // function for dropdowns
  const dropdownItems = (title, links) => (
    <NavDropdown
      title={
        <span
          className="h6 fw-semibold"
          style={{ color: theme ? "#333333" : "#ffffff" }}
        >
          {title}
        </span>
      }
      className="ms-4"
      menuVariant={theme ? "light" : "dark"}
    >
      {links.map(({ path, label }, index) => (
        <div key={index}>
          <NavDropdown.Item
            as={Link}
            to={path}
            onClick={() => dispatch(setSearchValue(""))}
            style={{ color: theme ? "#333333" : "#ffffff" }}
          >
            {label}
          </NavDropdown.Item>
          {index < links.length - 1 && <NavDropdown.Divider />}
        </div>
      ))}
    </NavDropdown>
  );

  return (
    <Navbar
      expand="lg"
      className={`py-3 shadow-sm ${theme ? "bg-light-gray" : "bg-dark"}`}
      fixed="top"
    >
      <Container fluid>
        {/* Brand Logo */}
        <Navbar.Brand className="fw-bold ms-3">
          <Link
            to="/seller"
            className="nav-link"
            style={{ color: theme ? "#333333" : "#ffffff" }}
          >
            K<span className="text-warning">-</span>Store
          </Link>
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile View */}
        <Navbar.Toggle aria-controls="navbarScroll" className="border-0" />

        <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-between">
          {/* Left Section - Navigation Links */}
          <Nav className="align-items-center">
            {/* Profile Link */}
            <Nav.Link
              as={Link}
              to="/seller/profile"
              className="ms-4 fw-semibold"
              style={{ color: theme ? "#333333" : "#ffffff" }}
            >
              Profile
            </Nav.Link>

            {/* Product Dropdown */}
            {dropdownItems("Product", [
              { path: "/seller/seller-products", label: "Products" },
              { path: "/seller/add-product", label: "Add" },
              { path: "/seller/delete-product", label: "Delete" },
            ])}

            {/* Banner Dropdown */}
            {dropdownItems("Banner", [
              { path: "/seller/banners", label: "Banners" },
              { path: "/seller/add-banner", label: "Add" },
            ])}

            {/* Order Dropdown */}
            {dropdownItems("Order", [
              { path: "/seller/orders-processing", label: "Processing" },
              { path: "/seller/orders-success", label: "Success" },
              { path: "/seller/orders-shipping", label: "Shipping" },
              { path: "/seller/orders-delivery", label: "Out for delivery" },
              { path: "/seller/orders-delivered", label: "Delivered" },
            ])}
          </Nav>

          {/* Right Section - Search Bar, Dark Mode, Logout */}
          <div className="d-flex align-items-center">
            {/* Search Bar */}
            <Form className="d-flex ms-4" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="rounded-pill"
                ref={inputValue}
                onKeyDown={handleKeyDown}
                style={{
                  backgroundColor: theme ? "#ffffff" : "#343a40",
                  color: theme ? "#333333" : "#ffffff",
                  border: "",
                  width: "250px",
                  padding: "8px 12px",
                }}
              />
              <Button
                variant={theme ? "outline-dark" : "outline-light"}
                onClick={handleSearch}
                className="ms-2"
              >
                Search
              </Button>
            </Form>

            {/* Dark Mode Toggle */}
            <span className="ms-4">
              <DarkMode />
            </span>

            {/* Logout Button */}
            <Button
              variant="outline-danger"
              onClick={handleLogout}
              className="ms-4 fw-semibold"
              style={{ color: "red" }}
            >
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
