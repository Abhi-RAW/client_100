import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export const Design = () => {
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
            Design at Mart
          </h1>
        </div>
        <div className={theme ? "text-center text-black" : "text-center"}>
          <p>
            At <strong>Mart</strong>, we believe that great design plays a
            crucial role in delivering exceptional user experiences. From our
            website to our product pages, we focus on creating visually
            appealing, intuitive, and responsive designs to enhance every
            interaction. <br />
            <br />
            <strong>Our Design Philosophy:</strong> <br />
            Our design approach focuses on minimalism, ease of navigation, and
            the use of high-quality visuals to highlight the premium nature of
            Apple products. We aim to create a seamless shopping experience
            where form and function come together to delight our users. <br />
            <br />
            <strong>Design Process:</strong> <br />
            Our design process is collaborative, iterative, and user-centered.
            We work closely with our development team to ensure that every
            design element aligns with both our brand and our users' needs.
            Here's a brief overview of our process:
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>
                <strong>Research:</strong> Understanding user needs, market
                trends, and design best practices.
              </li>
              <li>
                <strong>Wireframing:</strong> Creating low-fidelity wireframes
                to map out the structure of key pages.
              </li>
              <li>
                <strong>Prototyping:</strong> Developing interactive prototypes
                to visualize user flow and design interactions.
              </li>
              <li>
                <strong>UI Design:</strong> Crafting high-fidelity UI designs
                with color schemes, typography, and icons.
              </li>
              <li>
                <strong>User Testing:</strong> Gathering feedback from users to
                refine and improve the design.
              </li>
            </ul>
            <br />
            <strong>Design Assets:</strong> <br />
            Below are a few visual design assets used throughout our platform,
            available for download:
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>
                <Button
                  variant="link"
                  href="/design-assets/logo.svg"
                  target="_blank"
                >
                  Mart Logo (SVG)
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  href="/design-assets/web-design.png"
                  target="_blank"
                >
                  Mart Web Design (PNG)
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  href="/design-assets/iphone-mockup.jpg"
                  target="_blank"
                >
                  Mart iPhone Mockup Image
                </Button>
              </li>
            </ul>
            <br />
            If you have any questions or need further design resources, feel
            free to contact our design team at{" "}
            <a href="mailto:design@store.com">design@store.com</a>.
          </p>
        </div>
      </div>
    </Container>
  );
};
