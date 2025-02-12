import { Link } from "react-router-dom";
import { UnHappy } from "../../components/shared/UnHappy";
import { useSelector } from "react-redux";

export const ErrorPage = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <Link className="text-decoration-none">
        <UnHappy message={"This page is on vacation!"} theme={theme} />
      </Link>
    </>
  );
};
