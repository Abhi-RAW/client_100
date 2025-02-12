import { useSelector } from "react-redux";


export const AverageRatings = ({ average }) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={theme ? "orange" : "black"}
        viewBox="0 0 25 25"
        strokeWidth={1.5}
        className="size-12"
        height="32px"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
        />
        <text x="12" y="15" textAnchor="middle" fontSize="9" fill="white">
          {average || 0}
        </text>
      </svg>
    </div>
  );
};
