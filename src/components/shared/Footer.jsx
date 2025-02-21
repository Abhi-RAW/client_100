import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export const Footer = () => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  return (
    <Row
      className={
        theme
          ? "bg-light text-dark mt-5 p-5 w-100 m-auto"
          : "bg-black text-white mt-5 p-5 w-100 m-auto"
      }
    >
      <Col xs={6} sm={4}>
        <h6 className="text-uppercase font-weight-bold mb-3">BUSINESS</h6>
        <ul className="list-unstyled">
          <li>
            <Link
              to={"/seller/signup"}
              className={
                theme
                  ? "text-decoration-none text-primary"
                  : "text-decoration-none text-white"
              }
            >
              Sell on Mart
            </Link>
          </li>
          <li className={theme ? "text-secondary" : ""}>Design</li>
          <li className={theme ? "text-secondary" : ""}>Marketing</li>
          <li className={theme ? "text-secondary" : ""}>Advertisement</li>
        </ul>
      </Col>
      <Col xs={6} sm={4}>
        <h6 className="text-uppercase font-weight-bold mb-3">Company</h6>
        <ul className="list-unstyled text-secondary">
          <li>About us</li>
          <li>Contact</li>
          <li>Jobs</li>
          <li>Press kit</li>
        </ul>
      </Col>
      <Col xs={6} sm={4}>
        <h6 className="text-uppercase font-weight-bold mb-3">Legal</h6>
        <ul className="list-unstyled text-secondary">
          <li>Terms of use</li>
          <li>Privacy policy</li>
          <li>Cookie policy</li>
        </ul>
      </Col>
      <span className={theme ? "text-secondary" : "text-white"}>
        Copyright &copy; 2024-2025 kmart.com
      </span>
    </Row>
  );
};
