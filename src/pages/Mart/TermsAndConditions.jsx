import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

export const TermsAndConditions = () => {
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
            Terms and Conditions
          </h1>
        </div>
        <div className={theme ? "text-center text-black" : "text-center"}>
          <p>
            Welcome to <strong>Mart</strong> – your trusted online destination
            for the latest Apple products and accessories. By accessing and
            using Mart, you agree to comply with and be bound by the following
            terms and conditions. Please read them carefully. If you do not
            agree to these terms, do not use our services. Mart provides an
            online shopping experience for a wide range of Apple products. You
            may only use our services for lawful purposes and in accordance with
            these Terms and Conditions. To make a purchase, you may need to
            create an account. You agree to provide accurate and complete
            information when creating your account and to keep it updated. You
            are responsible for safeguarding your account credentials. All
            prices listed on our website are subject to change without notice.
            We strive to provide accurate availability information, but product
            availability may vary. Payment for orders must be made in full at
            the time of purchase. We accept various payment methods, including
            credit/debit cards and other online payment options. We offer
            various shipping options. Delivery times may vary based on your
            location and the shipping method chosen. Any applicable shipping
            fees will be clearly displayed at checkout. If you are not satisfied
            with your purchase, please refer to our Return Policy for
            information on how to return products and request refunds. Certain
            conditions apply. We respect your privacy and take reasonable
            measures to protect your personal information. Please review our
            Privacy Policy to understand how we collect, use, and safeguard your
            data. Mart is not liable for any indirect, incidental, or
            consequential damages arising from the use of our services. Our
            liability is limited to the total amount paid for the products in
            question. We may update these Terms and Conditions from time to
            time. Any changes will be posted on this page with an updated
            revision date. It is your responsibility to review this page
            regularly to stay informed of any changes. These Terms and
            Conditions shall be governed by and construed in accordance with the
            laws of the jurisdiction in which Mart operates. Thank you for
            shopping with us! If you have any questions, feel free to reach out
            to our customer support team. – The Mart Team
          </p>
        </div>
      </div>
    </Container>
  );
};
