import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { UnHappy } from "../../components/shared/UnHappy";

export const PaymentCancel = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    // Handle stock and clear cart
    const updatePaymentStatus = async () => {
      try {
        // Update payment status
        const updatedPaymentStatus = await axiosInstance({
          method: "PUT",
          url: "/payment/payment-cancelled",
        });
        console.log(updatedPaymentStatus);
      } catch (error) {
        console.log(error);
      }
    };
    updatePaymentStatus();
  }, []);

  return (
    <>
      <Link className="text-decoration-none" to={"/"}>
        <UnHappy message={"Your payment has cancelled!"} theme={theme} />
      </Link>
    </>
  );
};
