import { Container, NavDropdown, Navbar, Form, Button } from "react-bootstrap";
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
      handleSearch();
    }
  };

  return (
    <Navbar
      expand="lg"
      className="py-3 fixed-top shadow-sm"
      style={{
        backgroundColor: theme ? "#F5F0CD" : "#2b2b2b",
        borderBottom: `2px solid ${theme ? "#F5F0CD" : "#444"}`,
        transition: "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out",
      }}
    >
      <Container fluid>
        {/* Brand Logo */}
        <Navbar.Brand className="mb-2 me-4">
          <Link to={"/admin"} className="nav-link hover" style={{ fontWeight: "bold", fontSize: "1.5rem", color: theme ? "#000" : "#fff" }}>
            K-Mart
          </Link>
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile View */}
        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="d-flex align-items-center justify-content-between">
          {/* Dropdown Menus */}
          <div className="d-flex align-items-center">
            <NavDropdownMenu title="Seller" theme={theme} options={[
              { path: "/admin/sellers", label: "Sellers" },
              // { path: "/admin/inactive-sellers", label: "Inactive" },
              { path: "/admin/delete-seller", label: "Delete" }
            ]} />

            <NavDropdownMenu title="User" theme={theme} options={[
              { path: "/admin/users", label: "Users" },
              // { path: "/admin/inactive-users", label: "Inactive" },
              { path: "/admin/delete-user", label: "Delete" }
            ]} />

            <NavDropdownMenu title="Product" theme={theme} options={[
              { path: "/admin/products", label: "Products" },
              { path: "/admin/add-product", label: "Add" },
              { path: "/admin/delete-product", label: "Delete" }
            ]} />

            <NavDropdownMenu title="Banner" theme={theme} options={[
              { path: "/admin/banners", label: "Banners" },
              { path: "/admin/add-banner", label: "Add" }
            ]} />

            <NavDropdownMenu title="Order" theme={theme} options={[
              { path: "/admin/orders-processing", label: "Processing" },
              { path: "/admin/orders-success", label: "Success" },
              { path: "/admin/orders-shipping", label: "Shipping" },
              { path: "/admin/orders-delivery", label: "Out for Delivery" },
              { path: "/admin/orders-delivered", label: "Delivered" }
            ]} />
          </div>

          {/* Search Bar */}
          <SearchBar theme={theme} inputValue={inputValue} handleSearch={handleSearch} handleKeyDown={handleKeyDown} />

          {/* Profile & Dark Mode */}
          <Link to="/admin/profile" className="nav-link ms-3" style={{ fontWeight: "bold", color: theme ? "#000" : "#fff" }}>
            Profile
          </Link>

          <DarkMode />

          {/* Logout Button */}
          <Button
            variant="outline-light"
            onClick={handleLogout}
            className="ms-3"
            style={{
              borderRadius: "5px",
              border: "2px solid #ff9800",
              color: theme ? "#000" : "#fff",
              fontWeight: "bold",
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Reusable Dropdown Component
const NavDropdownMenu = ({ title, theme, options }) => {
  const dispatch = useDispatch();
  return (
    <NavDropdown
      className="ms-3"
      title={<span style={{ color: theme ? "#000" : "#fff", fontWeight: "bold", cursor: "pointer" }}>{title}</span>}
      id="navbarScrollingDropdown"
      style={{ fontWeight: "500", fontSize: "1rem" }}
    >
      {options.map(({ path, label }, index) => (
        <div key={index}>
          <NavDropdown.Item as={Link} to={path} style={dropdownItemStyle(theme)} onClick={() => dispatch(setSearchValue(""))}>
            {label}
          </NavDropdown.Item>
          {index < options.length - 1 && <NavDropdown.Divider />}
        </div>
      ))}
    </NavDropdown>
  );
};

// Search Bar Component
const SearchBar = ({ theme, inputValue, handleSearch, handleKeyDown }) => (
  <Form className="d-flex align-items-center mx-3" onSubmit={(e) => e.preventDefault()}>
    <Form.Control
      type="search"
      placeholder="Search"
      ref={inputValue}
      onKeyDown={handleKeyDown}
      style={{
        background: theme ? "#F5F0CD" : "#D9D9D9",
        border: "2px solid #ff9800",
        borderRadius: "5px",
        padding: "5px 10px",
        color: theme ? "#000" : "#333",
      }}
    />
    <Button
      variant="outline-light"
      onClick={handleSearch}
      className="ms-2"
      style={{
        borderRadius: "5px",
        border: "2px solid #ff9800",
        color: theme ? "#000" : "#fff",
        fontWeight: "bold",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      Search
    </Button>
  </Form>
);

// Dropdown Item Styling
const dropdownItemStyle = (theme) => ({
  color: theme ? "#000" : "#fff",
  fontWeight: "500",
  cursor: "pointer",
});

export default AdminHeader;
