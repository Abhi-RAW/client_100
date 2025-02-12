import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";

export const StarRatings = ({ productId, getAverageRating }) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Store average rating
  const [rating, setRating] = useState(0);

  // Api call
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/review/get-avg-rating",
          data: { productId },
        });

        setRating(response?.data?.data);
        getAverageRating(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRating();
  }, [productId]);

  const totalStars = 5;
  const stars = [];

  // Loop for each star (1 to 5)
  for (let i = 1; i <= totalStars; i++) {
    if (i <= Math.floor(rating)) {
      // Fully filled star
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={theme ? "text-warning mb-3" : "text-black mb-3"}
          height="30px"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else if (i === Math.floor(rating) + 1 && rating % 1 !== 0) {
      // Partially filled star (showing a half-filled star)
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={theme ? "text-warning mb-3" : "text-black mb-3"}
          height="30px"
        >
          <defs>
            <clipPath id={`clip-${i}`}>
              <rect
                x="0"
                y="0"
                width={`${(rating % 1) * 100}%`}
                height="100%"
              />
            </clipPath>
          </defs>
          <g clipPath={`url(#clip-${i})`}>
            <path
              fill="currentColor"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            />
          </g>
          {/* Empty portion (remaining part of the star) */}
          <g
            clipPath={`url(#clip-${i})`}
            transform="scale(-1, 1) translate(-24, 0)"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </g>
        </svg>
      );
    } else {
      // Empty star
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={theme ? "text-warning mb-3" : "text-black mb-3"}
          height="30px"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      );
    }
  }

  return <div>{stars}</div>;
};
