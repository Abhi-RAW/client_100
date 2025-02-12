import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

export const Loading = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ minHeight: 450 }}
    >
      <Spinner
        animation="border"
        role="status"
        variant={theme ? "dark" : "light"}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <span className={theme ? "text-black" : "text-white mt-2 ms-2"}>
        Loading...
      </span>
    </div>
  );
};
