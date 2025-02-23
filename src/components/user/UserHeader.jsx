import { useEffect, useRef } from "react";
import { Button, Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
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
      const [cartRes, wishlistRes] = await Promise.all([
        axiosInstance.get("/cart/cart"),
        axiosInstance.get("/wishlist/wishlist")
      ]);

      dispatch(setCartData(cartRes?.data?.data || []));
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
      className="py-2 fixed-top shadow-sm"
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
          style={{ color: theme ? "#000" : "#fff", whiteSpace: "nowrap" }}
        >
          K-Store
        </Navbar.Brand>

        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          
          {/* Center Content: Categories + Search */}
          <div className="d-flex flex-column flex-lg-row align-items-lg-center w-100">
            
            {/* Categories */}
            <Nav className="me-auto d-flex gap-2 gap-lg-3 mb-2 mb-lg-0">
              {categories.map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    dispatch(setCategory(item));
                    dispatch(setSearchValue(""));
                  }}
                  style={{ color: theme ? "#000" : "#fff", fontSize: "1rem", whiteSpace: "nowrap" }}
                >
                  {item}
                </Link>
              ))}
            </Nav>

            {/* Search Bar */}
            <Form
              className="d-flex flex-grow-1 mx-lg-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                ref={inputValue}
                onKeyDown={handleKeyDown}
                style={{
                  background: theme ? "#fff" : "#D9D9D9",
                  border: `1px solid ${theme ? "#000" : "#fff"}`,
                  color: "#000",
                  borderRadius: "5px",
                  padding: "8px",
                }}
              />
              <Button
                variant="outline-dark"
                onClick={handleSearch}
                style={{
                  background: theme ? "#000" : "#fff",
                  color: theme ? "#fff" : "#000",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  transition: "background 0.3s ease, color 0.3s ease",
                }}
              >
                Search
              </Button>
            </Form>
          </div>

          {/* Right-side Icons & Actions */}
          <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
            
            {/* Account Dropdown */}
            <NavDropdown
              title={<span className="h6" style={{ color: theme ? "#000" : "#fff" }}>Account ↓</span>}
              align="end"
            >
              <NavDropdown.Item as={Link} to="/user/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user/orders">Orders</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user/cart" onClick={handleCartClick}>Cart</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user/wishlist">Wishlist</NavDropdown.Item>
            </NavDropdown>

            {/* Cart Icon */}
            <Link to="/user/cart" onClick={handleCartClick}>
              <CartIcon component="header" />
            </Link>

            {/* Dark Mode Toggle */}
            <DarkMode />

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              style={{
                background: theme ? "#000" : "#fff",
                color: theme ? "#fff" : "#000",
                border: "none",
                padding: "8px 12px",
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
