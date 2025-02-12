import { useEffect, useRef, useState } from "react";
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
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const inputValue = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const categories = ["iPhone", "Macbook", "iPad", "Airpods", "Watch"];

  // Fetch cart & wishlist data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartRes = await axiosInstance.get("/cart/cart");
        setCart(cartRes?.data?.data || []);

        const wishlistRes = await axiosInstance.get("/wishlist/wishlist");
        setWishlist(wishlistRes?.data?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Dispatch cart & wishlist data to Redux
  useEffect(() => {
    dispatch(setCartData(cart));
    dispatch(setWishlistData(wishlist));
  }, [cart, wishlist, dispatch]);

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
          className="d-flex align-items-center"
          onClick={() => {
            dispatch(setCategory(""));
            dispatch(setSearchValue(""));
          }}
          style={{ color: theme ? "#000" : "#fff", fontWeight: "bold", fontSize: "1.5rem" }}
        >
          K-Mart
        </Navbar.Brand>

        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="d-flex align-items-center justify-content-between">
          {/* Categories & Account Dropdown */}
          <div className="d-flex align-items-center">
            <Nav className="me-auto my-2 my-lg-0">
              {categories.map((item) => (
                <CategoryLink key={item} item={item} theme={theme} dispatch={dispatch} />
              ))}
            </Nav>

            <AccountDropdown theme={theme} />
          </div>

          {/* Search Bar */}
          <SearchBar
            theme={theme}
            inputValue={inputValue}
            handleSearch={handleSearch}
            handleKeyDown={handleKeyDown}
          />

          {/* Icons & Logout Button */}
          <div className="d-flex align-items-center gap-3">
            <DarkMode />
            <Link to="/user/cart">
              <CartIcon />
            </Link>
            <LogoutButton handleLogout={handleLogout} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Category Links Component
const CategoryLink = ({ item, theme, dispatch }) => (
  <Link
    to="/"
    className="nav-link mt-2 mx-2"
    onClick={() => {
      dispatch(setCategory(item.toLowerCase()));
      dispatch(setSearchValue(""));
    }}
    style={{
      color: theme ? "#000" : "#fff",
      transition: "all 0.3s ease-in-out",
      padding: "8px 12px",
      borderRadius: "4px",
      textDecoration: "none",
      display: "inline-block",
      fontWeight: "500",
    }}
  >
    {item}
  </Link>
);

// Account Dropdown Component
const AccountDropdown = ({ theme }) => (
  <NavDropdown
    className="ms-3"
    title={<span style={{ color: theme ? "#000" : "#fff", fontWeight: "bold", cursor: "pointer" }}>Account </span>}
    id="navbarScrollingDropdown"
    style={{ fontWeight: "500", fontSize: "1rem" }}
  >
    {[
      { path: "/user/profile", icon: "fas fa-user-circle", label: "Profile" },
      { path: "/user/orders", icon: "fas fa-box-open", label: "Orders" },
      { path: "/user/cart", icon: "fas fa-shopping-cart", label: "Cart" },
      { path: "/user/wishlist", icon: "fas fa-heart", label: "Wishlist" },
    ].map(({ path, icon, label }) => (
      <NavDropdown.Item as={Link} to={path} key={label} style={dropdownItemStyle}>
        <i className={`${icon} me-2`}></i> {label}
      </NavDropdown.Item>
    ))}
  </NavDropdown>
);

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
        transition: "border-color 0.3s ease-in-out",
        width: "250px",
      }}
      className="me-2"
    />
    <Button
      variant="outline-light"
      onClick={handleSearch}
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

// Logout Button Component
const LogoutButton = ({ handleLogout }) => (
  <Button
    variant="outline-warning"
    onClick={handleLogout}
    style={{
      borderRadius: "5px",
      border: "2px solid #ff9800",
      fontWeight: "bold",
      padding: "8px 15px",
    }}
  >
    Logout
  </Button>
);

// Dropdown Item Style
const dropdownItemStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: "1rem",
  fontWeight: "500",
  padding: "10px 15px",
  transition: "background 0.3s ease-in-out",
};

