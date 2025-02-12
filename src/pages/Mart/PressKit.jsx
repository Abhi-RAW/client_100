import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export const PressKit = () => {
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
            Mart Press Kit
          </h1>
        </div>
        <div className={theme ? "text-center text-black" : "text-center"}>
          <p>
            Welcome to the Mart Press Kit! Here, you'll find all the resources
            you need to cover our brand, products, and services. Whether you’re
            a journalist, blogger, or influencer, we’ve made it easy for you to
            get the latest news, images, logos, and other media assets. <br />{" "}
            <br />
            <strong>Press Releases</strong> <br />
            Stay up-to-date with our latest announcements and news. Below you
            can download our recent press releases:
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>
                <Button
                  variant="link"
                  href="/press-release1.pdf"
                  target="_blank"
                >
                  Mart Launches New iPhone Collection - Press Release
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  href="/press-release2.pdf"
                  target="_blank"
                >
                  Mart Expands to International Markets - Press Release
                </Button>
              </li>
            </ul>
            <br />
            <strong>Media Assets</strong> <br />
            Download high-resolution images of our products and logos for your
            articles and coverage:
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>
                <Button variant="link" href="/logo.png" target="_blank">
                  Mart Logo (PNG)
                </Button>
              </li>
              <li>
                <Button variant="link" href="/iphone-image.jpg" target="_blank">
                  Mart iPhone Collection Image
                </Button>
              </li>
              <li>
                <Button variant="link" href="/store-front.jpg" target="_blank">
                  Mart Storefront Image
                </Button>
              </li>
            </ul>
            <br />
            <strong>Company Overview</strong> <br />
            Mart is a leading retailer of premium Apple products, known for
            offering the latest iPhones, MacBooks, accessories, and more. Our
            mission is to bring high-quality technology to customers worldwide
            with a focus on authenticity, customer service, and affordability.{" "}
            <br />
            <br />
            If you need additional information or have specific requests, feel
            free to contact our PR team at{" "}
            <a href="mailto:press@store.com">press@store.com</a>.
          </p>
        </div>
      </div>
    </Container>
  );
};
