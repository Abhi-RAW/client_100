import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";


export const AboutUs = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  return (
    <Container fluid className="p-3">
      <div className="text-white d-flex justify-content-center align-items-center my-5 flex-column gap-2 flex-wrap">
        <div className="my-5">
          <h1
            className={
              theme ? "text-center text-black" : "text-white text-center"
            }
          >
            About Us
          </h1>
        </div>
        <div className={theme ? "text-center text-black" : "text-center"}>
          <p>
            Welcome to <strong>Mart</strong>
          </p>
          <p>your ultimate destination for the latest Apple products!</p>
          <p>
            We are passionate about offering the most innovative Apple
            technology, from iPhones and MacBooks to the latest accessories.
          </p>
          <p>
            At Mart, we guarantee authenticity, exceptional customer service,
            and a wide selection of high-quality products at competitive prices.
          </p>
          <p>
            Our mission is to make premium Apple technology accessible to
            everyone, enabling you to stay connected, productive, and creative.
          </p>
          <p>
            Join the Mart family today and experience the excellence of Apple
            like never before.
          </p>
          <p>
            Happy shopping! <br /> – The Mart Team
          </p>
        </div>
      </div>
    </Container>
  );
};
