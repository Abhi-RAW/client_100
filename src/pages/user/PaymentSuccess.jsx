import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { Happy } from "../../components/shared/Happy";
import { Link } from "react-router-dom";

export const PaymentSuccess = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    // Handle stock and clear cart
    const clearCartAndUpdateStockAndUpdatePaymentStatus = async () => {
      try {
        // Clear cart
        const clearCart = await axiosInstance({
          method: "DELETE",
          url: "/cart/clear-cart",
        });
        console.log(clearCart);
        // Update stock
        const updateStock = await axiosInstance({
          method: "GET",
          url: "/order/update-stock",
        });
        // Update payment status
        const updatedPaymentStatus = await axiosInstance({
          method: "PUT",
          url: "/payment/payment-completed",
        });
        console.log(updatedPaymentStatus);
      } catch (error) {
        console.log(error);
      }
    };
    clearCartAndUpdateStockAndUpdatePaymentStatus();
  }, []);

  return (
    <>
    <Link className="text-decoration-none" to={"/"}>
    <Happy message={'Your payment success!'} theme={theme}/>
    </Link>
    </>
  );
}
