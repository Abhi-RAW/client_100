import { useSelector } from "react-redux";

export const CartIcon = ({ height, component }) => {
  const { cartData } = useSelector((state) => state.cart);
  const { theme } = useSelector((state) => state.theme); // Get theme state

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={theme ? "#000" : "#fff"} // Dynamic stroke color for dark/light mode
        className="size-6 fw-lighter"
        height={height || "40px"}
        style={{ transition: "stroke 0.3s ease-in-out" }} // Smooth transition for dark/light mode
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>

      {/* Cart Count Badge */}
      {component === "header" && cartData?.products?.length > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            backgroundColor: "#ff9800",
            color: "#fff",
            fontSize: "12px",
            fontWeight: "bold",
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.3s ease-in-out",
          }}
        >
          {cartData?.products?.length}
        </span>
      )}
    </div>
  );
};
