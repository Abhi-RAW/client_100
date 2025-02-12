import React from "react";
import { useSelector } from "react-redux";

export const WishlistIcon = ({ productId }) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Get wishlist
  const { wishlistData } = useSelector((state) => state.wishlist);

  // Check product found in wishlist
  const found = wishlistData?.products?.find(
    (product) => product?.productId?._id === productId
  );

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={found ? (theme ? "#FF6347" : "none") : "none"}
        stroke={found ? (theme ? "#FF6347" : "#000000") : theme ? "#FF6347" : "#000000"}
        strokeWidth="2"
        className="size-6"
        height="25px"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.5 3.5 5 5.5 5c1.54 0 2.91.99 3.57 2.36h1.87C12.59 5.99 13.96 5 15.5 5 17.5 5 19 6.5 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </>
  );
};
