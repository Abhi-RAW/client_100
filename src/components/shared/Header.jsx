import { useRef, useState } from "react";
import { Button, Container, Form, Nav, Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/features/categorySlice";
import { setSearchValue } from "../../redux/features/searchSlice";
import { DarkMode } from "../../components/shared/DarkMode";

export const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const inputValue = useRef();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleSearch = () => {
    dispatch(setSearchValue(inputValue.current.value));
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const navbarStyle = {
    backgroundColor: theme ? "#F5F0CD" : "#2b2b2b",
    borderBottom: theme ? "2px solid #F5F0CD" : "2b2b2b",
    transition: "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out",
  };

  const brandPartStyle = {
    color: theme ? "#000" : "#fff",
    transition: "transform 0.3s ease-in-out",
    fontWeight: "bold"
  };

  const navItemBaseStyle = {
    color: theme ? "#000" : "#fff",
    transition: "all 0.3s ease-in-out",
    padding: "8px 12px",
    borderRadius: "4px",
    textDecoration: "none",
    display: "inline-block",
  };

  const hoverEffect = {
    backgroundColor: "#ff9800",
    color: "#fff",
    transform: "scale(1.1)",
    boxShadow: "0px 4px 6px rgba(255, 152, 0, 0.4)",
  };

  const searchInputStyle = {
    background: theme ? "#F5F0CD" : "#D9D9D9",
    border: "2px solid #ff9800",
    borderRadius: "5px",
    transition: "border-color 0.3s ease-in-out",
    width: "250px",
  };

  const buttonStyle = {
    borderRadius: "5px",
    border: "2px solid #ff9800",
    transition: "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out",
    color: theme ? "#000" : "#fff",
    fontWeight: "bold",
  };

  const loginButtonStyle = {
    ...buttonStyle,
    marginLeft: "auto",
  };

  return (
    <Navbar expand="lg" className="py-3 fixed-top shadow-sm" style={navbarStyle}>
      <Container fluid>
        <Navbar.Brand
          onClick={() => {
            dispatch(setCategory(""));
            dispatch(setSearchValue(""));
          }}
          className="d-flex align-items-center"
        >
          <Link to={"/"} className="nav-link d-flex align-items-center">
            <span style={brandPartStyle}>New</span>
            <span style={brandPartStyle}>-</span>
            <span style={brandPartStyle}>Buy</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="d-flex align-items-center">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            {["iPhone", "Macbook", "iPad", "Airpods", "Watch"].map((item) => (
              <Link
                key={item}
                to={"/"}
                className="nav-link mt-2 mx-2"
                onClick={() => {
                  dispatch(setCategory(item.toLowerCase()));
                  dispatch(setSearchValue(""));
                }}
                style={hoveredItem === item ? { ...navItemBaseStyle, ...hoverEffect } : navItemBaseStyle}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item}
              </Link>
            ))}
            <NavItem className="mx-2 mt-2">
              <DarkMode />
            </NavItem>
          </Nav>
          <Form className="d-flex align-items-center" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              ref={inputValue}
              style={searchInputStyle}
            />
            <Button
              variant="outline-light"
              className="search-button"
              onClick={handleSearch}
              onKeyDown={handleKeyDown}
              style={buttonStyle}
            >
              Search
            </Button>
          </Form>
          <Button
            as={Link}
            to="/login"
            variant="outline-light"
            className="ms-3"
            style={loginButtonStyle}
          >
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
