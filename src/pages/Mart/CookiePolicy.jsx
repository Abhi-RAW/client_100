import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

export const CookiePolicy = () => {
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
            Cookie Policy
          </h1>
        </div>
        <div className={theme ? "text-center text-black" : "text-center"}>
          <p>
            Welcome to <strong>Mart</strong>. This Cookie Policy explains how
            we use cookies and similar technologies to enhance your experience
            when you visit our website or use our services. By using our
            website, you agree to the use of cookies in accordance with this
            policy. <br /> <br />
            <strong>1. What Are Cookies?</strong> Cookies are small text files
            that are stored on your device when you visit a website. They help
            us remember your preferences, improve the website’s functionality,
            and provide you with a personalized experience. <br /> <br />
            <strong>2. Types of Cookies We Use:</strong> We use the following
            types of cookies on our website: <br />-{" "}
            <strong>Essential Cookies:</strong> These are necessary for the
            operation of our website and allow you to navigate and use its
            features. <br />- <strong>Performance Cookies:</strong> These
            cookies collect information about how visitors use our website, such
            as which pages are visited most often. They help us improve the
            performance and functionality of our website. <br />-{" "}
            <strong>Functionality Cookies:</strong> These cookies allow us to
            remember your preferences, such as your language or region, and
            provide enhanced, more personalized features. <br />-{" "}
            <strong>Targeting Cookies:</strong> These cookies are used to
            deliver targeted advertising based on your interests. They also help
            limit the number of times you see an ad and measure the
            effectiveness of advertising campaigns. <br /> <br />
            <strong>3. Managing Cookies:</strong> You can control and manage
            cookies through your browser settings. Most browsers allow you to
            block or delete cookies. However, please note that blocking or
            deleting cookies may impact your experience on our website and limit
            some of the website's features. <br /> <br />
            <strong>4. Third-Party Cookies:</strong> We may also use third-party
            cookies provided by trusted partners, such as analytics services and
            advertising networks. These cookies help us understand user behavior
            and deliver targeted ads. <br /> <br />
            <strong>5. Consent to Cookies:</strong> By continuing to use our
            website, you consent to our use of cookies in accordance with this
            Cookie Policy. If you do not accept the use of cookies, please
            disable them through your browser settings or refrain from using our
            website. <br /> <br />
            <strong>6. Changes to This Policy:</strong> We may update this
            Cookie Policy from time to time. Any changes will be posted on this
            page, and the date of the most recent update will be indicated at
            the top of the page. We encourage you to review this policy
            periodically. <br /> <br />
            <strong>7. Contact Us:</strong> If you have any questions or
            concerns about this Cookie Policy or our use of cookies, please
            contact us at support@store.com. <br /> <br />
            Thank you for visiting Mart, and we hope you enjoy your shopping
            experience with us! – The Mart Team
          </p>
        </div>
      </div>
    </Container>
  );
};
