import { useRef, useState } from "react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/features/categorySlice";
import { setSearchValue } from "../../redux/features/searchSlice";
import { DarkMode } from "../../components/shared/DarkMode";

export const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const inputValue = useRef();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate(); // ✅ React Router navigation

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchValue(inputValue.current.value));
    setExpanded(false);
  };

  return (
    <Navbar expand="lg" className="py-2 fixed-top shadow-sm" expanded={expanded} style={{ backgroundColor: theme ? "#F5F0CD" : "#222" }}>
      <Container fluid className="d-flex align-items-center justify-content-between">
        {/* LOGO - Navigate to Home */}
        <Navbar.Brand
          className="fw-bold fs-4"
          style={{ color: theme ? "#000" : "#fff", cursor: "pointer" }}
          onClick={() => {
            navigate("/"); // ✅ Navigates to Home.jsx
            dispatch(setCategory(""));
            dispatch(setSearchValue(""));
            setExpanded(false);
          }}
        >
          🛒 K-Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" onClick={() => setExpanded(!expanded)} className="border-0" />

        <Navbar.Collapse id="navbarScroll" className="justify-content-center">
          <Nav className="d-flex flex-wrap justify-content-center">
            {["Mobile", "Laptop", "Watch", "Fashion", "Headphone", "Beauty&Care"].map((item) => (
              <Nav.Link
                key={item}
                onClick={() => {
                  dispatch(setCategory(item.toLowerCase()));
                  dispatch(setSearchValue(""));
                  setExpanded(false);
                }}
                className="mx-2 text-uppercase fw-semibold"
                style={{ color: theme ? "#333" : "#ddd", fontSize: "0.9rem", padding: "6px 10px", transition: "all 0.3s ease-in-out" }}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>

          <div className={`d-${expanded ? "block" : "none"} d-lg-flex align-items-center gap-3 mt-3 mt-lg-0`}>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                ref={inputValue}
                style={{ width: "180px", borderRadius: "20px", border: "1px solid #ff9800", padding: "6px", backgroundColor: theme ? "#fff" : "#444", color: theme ? "#000" : "#fff" }}
              />
              <Button type="submit" style={{ backgroundColor: "#ff9800", border: "none", borderRadius: "20px", padding: "6px 10px" }}>🔍</Button>
            </Form>

            <DarkMode />

            <Button as={Link} to="/login" style={{ borderRadius: "20px", border: "1px solid #ff9800", backgroundColor: "transparent", color: theme ? "#000" : "#fff", padding: "6px 10px" }}>
              Login
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
