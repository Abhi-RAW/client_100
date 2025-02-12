import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export const Marketing = () => {
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
            Marketing at Mart
          </h1>
        </div>
        <div className={theme ? "text-center text-black" : "text-center"}>
          <p>
            At <strong>Mart</strong>, our marketing efforts are centered around
            delivering the right message to the right audience at the right
            time. We leverage digital marketing, creative campaigns, and
            innovative strategies to promote our premium Apple products and
            connect with our customers. <br /> <br />
            <strong>Our Marketing Approach:</strong> <br />
            Our marketing strategy is built on a foundation of data-driven
            decisions, creativity, and customer engagement. We focus on
            understanding our customers' needs, creating compelling content, and
            driving conversions through various marketing channels. Here's a
            snapshot of how we approach marketing:
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>
                <strong>Digital Advertising:</strong> We use targeted ads on
                platforms like Google, Facebook, and Instagram to reach the
                right audience and drive traffic to our store.
              </li>
              <li>
                <strong>Content Marketing:</strong> Our content strategy
                includes blogs, product reviews, and tutorials that help our
                customers make informed decisions.
              </li>
              <li>
                <strong>Influencer Marketing:</strong> We collaborate with
                influencers to promote our products and showcase real-life use
                cases.
              </li>
              <li>
                <strong>Email Campaigns:</strong> We send personalized offers
                and product recommendations to our subscribers to increase
                engagement and drive sales.
              </li>
            </ul>
            <br />
            <strong>Current Marketing Campaigns:</strong> <br />
            We are currently running several campaigns to showcase our new
            products and boost brand awareness. Below are some of our active
            campaigns:
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>
                <Button
                  variant="link"
                  href="/campaigns/iphone-launch"
                  target="_blank"
                >
                  Mart iPhone 15 Launch Campaign
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  href="/campaigns/holiday-sale"
                  target="_blank"
                >
                  Mart Holiday Sale - Limited Time Offers
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  href="/campaigns/new-accessories"
                  target="_blank"
                >
                  New Accessories Collection - Discover the Latest Trends
                </Button>
              </li>
            </ul>
            <br />
            <strong>Marketing Resources:</strong> <br />
            If you're looking for marketing materials, here are some assets you
            can use:
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>
                <Button
                  variant="link"
                  href="/marketing-assets/ad-banner1.jpg"
                  target="_blank"
                >
                  Mart Banner Ad - 300x250
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  href="/marketing-assets/iphone-ad-video.mp4"
                  target="_blank"
                >
                  Mart iPhone 15 Launch Video
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  href="/marketing-assets/holiday-sale-flyer.pdf"
                  target="_blank"
                >
                  Holiday Sale Flyer (PDF)
                </Button>
              </li>
            </ul>
            <br />
            For more details on our marketing strategy, collaboration requests,
            or to get involved with our campaigns, feel free to reach out to our
            marketing team at{" "}
            <a href="mailto:marketing@store.com">marketing@store.com</a>.
          </p>
        </div>
      </div>
    </Container>
  );
};
