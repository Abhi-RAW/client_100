import { useEffect, useRef } from "react";
import { Button, Container, Form, Nav, NavDropdown, Navbar, NavItem } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/features/categorySlice";
import { setSearchValue } from "../../redux/features/searchSlice";
import { setCartData } from "../../redux/features/cartSlice";
import { setWishlistData } from "../../redux/features/wishlistSlice";
import { axiosInstance } from "../../config/axiosInstance";
import { DarkMode } from "../../components/shared/DarkMode";
import { CartIcon } from "../shared/CartIcon";

export const UserHeader = () => {
  const inputValue = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const categories = ["Mobile", "Laptop", "Watch", "Fashion", "Headphone", "Beauty&Care"];

  // Fetch Cart & Wishlist Data
  const fetchData = async () => {
    try {
      const cartRes = await axiosInstance.get("/cart/cart");
      dispatch(setCartData(cartRes?.data?.data || []));

      const wishlistRes = await axiosInstance.get("/wishlist/wishlist");
      dispatch(setWishlistData(wishlistRes?.data?.data || []));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSearch = () => {
    dispatch(setSearchValue(inputValue.current.value));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCartClick = async () => {
    await fetchData();
    navigate("/user/cart");
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
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-3"
          onClick={() => {
            dispatch(setCategory(""));
            dispatch(setSearchValue(""));
          }}
          style={{ color: theme ? "#000" : "#fff" }}
        >
          K-Store
        </Navbar.Brand>

        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="d-flex align-items-center justify-content-between">
          
          {/* Categories */}
          <Nav className="me-auto my-2 my-lg-0">
            {categories.map((item) => (
              <Link
                key={item}
                to="/"
                className="nav-link"
                onClick={() => {
                  dispatch(setCategory(item));
                  dispatch(setSearchValue(""));
                }}
                style={{ color: theme ? "#000" : "#fff", fontSize: "1.1rem" }}
              >
                {item}
              </Link>
            ))}
          </Nav>

          {/* Account Dropdown */}
          <NavDropdown
            title={<span className="h5" style={{ color: theme ? "#000" : "#fff" }}>Account ↓</span>}
          >
            <NavDropdown.Item as={Link} to="/user/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/user/orders">Orders</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/user/cart" onClick={handleCartClick}>Cart</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/user/wishlist">Wishlist</NavDropdown.Item>
          </NavDropdown>

          {/* Search Bar */}
          <Form className="d-flex w-50 mx-3" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              ref={inputValue}
              onKeyDown={handleKeyDown}
              style={{
                background: theme ? "#fff" : "#D9D9D9", // Light mode: white | Dark mode: gray
                border: `1px solid ${theme ? "#000" : "#fff"}`, // Black border in light mode, white in dark mode
                color: theme ? "#000" : "#000", // Black text for readability
                borderRadius: "5px",
                padding: "10px"
              }}
            />
            <Button
              variant="outline-dark"
              onClick={handleSearch}
              style={{
                background: theme ? "#000" : "#fff", // Black in light mode, white in dark mode
                color: theme ? "#fff" : "#000", // White text in light mode, black in dark mode
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                transition: "background 0.3s ease, color 0.3s ease"
              }}
            >
              Search
            </Button>
          </Form>

          {/* Cart & Dark Mode */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/user/cart" onClick={handleCartClick}>
              <CartIcon component={"header"} />
            </Link>
            <DarkMode />

            {/* Logout Button (Now outside the dropdown) */}
            <Button
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
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
