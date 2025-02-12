import { Container, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export const Contact = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  return (
    <Container fluid className="p-5">
      <div className="text-white d-flex justify-content-center align-items-center my-5 flex-column gap-2 flex-wrap">
        <div className="my-5">
          <h1
            className={
              theme ? "text-center text-black" : "text-white text-center"
            }
          >
            Contact Us
          </h1>
        </div>
        <div className={theme ? "text-center text-black" : "text-center"} style={{maxWidth: 500}}>
          <p>
            We’d love to hear from you! Whether you have a question, feedback,
            or just want to say hello, feel free to reach out to us. Our team is
            here to help you with any inquiries regarding products, orders, or
            anything else. <br /> <br />
            <strong>Get in Touch:</strong>
          </p>

          <Form className="my-4 mx-auto" style={{maxWidth: 500}}>
            <Form.Group controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="formEmail" className="my-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="formMessage" className="my-3">
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your message"
              />
            </Form.Group>

            <Button className="text-white" variant={theme ? 'warning' : 'dark'} type="submit">
              Send Message
            </Button>
          </Form>

          <p>
            <strong>Our Contact Information:</strong> <br />
            Email: <a href="mailto:support@store.com">support@store.com</a>{" "}
            <br />
            Phone: +1 (800) 123-4567 <br />
            Address: 123 Mart Street, City, State, ZIP Code
          </p>

          <p>We look forward to hearing from you!</p>
        </div>
      </div>
    </Container>
  );
};
