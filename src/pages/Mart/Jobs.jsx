import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

export const Jobs = () => {
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
            Careers at Mart
          </h1>
        </div>
        <div className={theme ? "text-center text-black" : "text-center"}>
          <p>
            Join our team at <strong>Mart</strong> – an exciting, fast-paced
            company bringing the latest Apple products to customers worldwide.
            We are always looking for talented, passionate individuals to help
            us grow and continue delivering an exceptional shopping experience.
            If you're looking for a place where your skills and ideas will make
            a real impact, Mart is the right place for you! <br /> <br />
            <strong>Current Job Openings:</strong> <br /> <br />
            <strong>1. Software Developer</strong> <br />
            As a Software Developer, you will work with our development team to
            build and maintain the Mart web platform, ensuring seamless user
            experiences and implementing new features. <br />
            <strong>Responsibilities:</strong>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>
                Develop and maintain web applications using React and Node.js
              </li>
              <li>
                Collaborate with cross-functional teams to deliver new features
              </li>
              <li>Optimize performance and ensure security</li>
              <li>Write clean, maintainable code</li>
            </ul>
            <strong>Requirements:</strong>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>Experience with React, Node.js, and web development</li>
              <li>Strong understanding of APIs and databases</li>
              <li>Excellent problem-solving and communication skills</li>
            </ul>
            <br />
            <strong>2. Customer Support Representative</strong> <br />
            As a Customer Support Representative, you will be the first point of
            contact for our customers. You will assist with inquiries, resolve
            issues, and ensure customer satisfaction. <br />
            <strong>Responsibilities:</strong>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>
                Provide excellent customer service through various channels
              </li>
              <li>Resolve product-related inquiries and technical issues</li>
              <li>Assist customers with order tracking and returns</li>
              <li>Maintain customer records and update account details</li>
            </ul>
            <strong>Requirements:</strong>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>Excellent communication and interpersonal skills</li>
              <li>Experience in customer service is a plus</li>
              <li>Ability to work in a fast-paced environment</li>
            </ul>
            <br />
            <strong>How to Apply:</strong> <br />
            If you are interested in applying for any of the positions listed
            above, please send your resume and cover letter to{" "}
            <a href="mailto:careers@store.com">careers@store.com</a>. We look
            forward to hearing from you! <br /> <br />
            Thank you for considering a career with Mart. We can't wait to see
            how you can contribute to our team's success!
          </p>
        </div>
      </div>
    </Container>
  );
};
