import { createBrowserRouter } from "react-router-dom";
import { ProtectedRouteUser } from "./ProtectedRouteUser";
import { UserLayout } from "../layout/UserLayout";
import { Home } from "../pages/user/Home";
import { AboutUs } from "../pages/Mart/AboutUs";
import { Contact } from "../pages/Mart/Contact";
import { ProductList } from "../pages/user/ProductList";
import { ProductDetails } from "../pages/shared/ProductDetails";
import { Signup } from "../pages/shared/Signup";
import { Login } from "../pages/shared/Login";
import { Cart } from "../pages/user/Cart";
import { ErrorPage } from "../pages/shared/ErrorPage";
import { ProtectedRouteSeller } from "./ProtectedRouteSeller";
import { AddNewProduct } from "../pages/shared/AddNewProduct";
import { Profile } from "../pages/shared/Profile";
import { SellerLayout } from "../layout/SellerLayout";
import { Products } from "../pages/shared/Products";
import { AdminLayout } from "../layout/AdminLayout";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import { Users } from "../pages/shared/Users";
import { AddBanner } from "../components/shared/AddBanner";
import { Banners } from "../pages/shared/Banners";
import { AddReview } from "../pages/user/AddReview";
import { Wishlist } from "../pages/user/Wishlist";
import { ForgotPassword } from "../pages/shared/ForgotPassword";
import { ResetPassword } from "../pages/shared/ResetPassword";
import { SentMail } from "../pages/shared/SentMail";
import { PaymentSuccess } from "../pages/user/PaymentSuccess";
import { PaymentCancel } from "../pages/user/PaymentCancel";
import { UpdateProduct } from "../pages/shared/UpdateProduct";
import { UserOrders } from "../pages/user/UserOrders";
import { OrderList } from "../pages/shared/OrderList";
import  OrderDetails  from "../pages/shared/OrderDetails";
import { AdminHome } from "../pages/admin/AdminHome";
import { SellerHome } from "../pages/seller/SellerHome";
import { TermsAndConditions } from "../pages/Mart/TermsAndConditions";
import { PrivacyPolicy } from "../pages/Mart/PrivacyPolicy";
import { CookiePolicy } from "../pages/Mart/CookiePolicy";
import { Jobs } from "../pages/Mart/Jobs";
import { PressKit } from "../pages/Mart/PressKit";
import { Design } from "../pages/Mart/Design";
import { Marketing } from "../pages/Mart/Marketing";
import { Advertisement } from "../pages/Mart/Advertisement";


export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword role="user" />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword role="user" />,
      },
      {
        path: "sent-mail",
        element: <SentMail />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "cookie-policy",
        element: <CookiePolicy />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "press-kit",
        element: <PressKit />,
      },
      {
        path: "design",
        element: <Design />,
      },
      {
        path: "marketing",
        element: <Marketing />,
      },
      {
        path: "advertisement",
        element: <Advertisement />,
      },

      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "product-details/:productId",
        element: <ProductDetails />,
      },

      {
        path: "user",
        element: <ProtectedRouteUser />,

        children: [
          {
            path: "cart",
            element: <Cart />,
          },

          {
            path: "profile",
            element: <Profile role="user" />,
          },
          {
            path: "orders",
            element: <UserOrders />,
          },
          {
            path: "payment-success",
            element: <PaymentSuccess />,
          },
          {
            path: "payment-cancel",
            element: <PaymentCancel />,
          },
          // {
          //   path: "return/:orderId",
          //   element: <Return />,
          // },
          {
            path: "add-review/:productId",
            element: <AddReview />,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
          },
        ],
      },
    ],
  },
  {
    path: "seller",
    element: <SellerLayout />,
    errorElement: <ErrorPage role="seller" />,
    children: [
      { path: "login", element: <Login role="seller" /> },

      { path: "signup", element: <Signup role="seller" /> },
      {
        path: "forgot-password",
        element: <ForgotPassword role="seller" />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword role="seller" />,
      },

      {
        element: <ProtectedRouteSeller />,
        children: [
          { path: "", element: <SellerHome role="seller" /> },
          {
            path: "seller-products",
            element: <Products role="seller" action="Update" />,
          },
          {
            path: "delete-product",
            element: <Products role="seller" action="Delete" />,
          },
          { path: "add-product", element: <AddNewProduct role="seller" /> },
          { path: "add-banner", element: <AddBanner role="seller" /> },
          {
            path: "product-details/:productId",
            element: <ProductDetails role="seller" />,
          },
          {
            path: "update-product/:productId",
            element: <UpdateProduct role="seller" />,
          },

          { path: "profile", element: <Profile role="seller" /> },
          {
            path: "banners",
            element: <Banners role="seller" />,
          },

          {
            path: "orders-processing",
            element: <OrderList action="processing" role="seller" />,
          },
          {
            path: "orders-success",
            element: <OrderList action="success" role="seller" />,
          },
          {
            path: "orders-shipping",
            element: <OrderList action="shipping" role="seller" />,
          },
          {
            path: "orders-success",
            element: <OrderList action="success" role="seller" />,
          },
          {
            path: "orders-delivery",
            element: <OrderList action="delivery" role="seller" />,
          },
          {
            path: "orders-delivered",
            element: <OrderList action="delivered" role="seller" />,
          },
          {
            path: "order-details-processing/:orderId",
            element: <OrderDetails action="Success" role="seller" />,
          },
          {
            path: "order-details-success/:orderId",
            element: <OrderDetails action="Shipping" role="seller" />,
          },
          {
            path: "order-details-shipping/:orderId",
            element: <OrderDetails action="Delivery" role="seller" />,
          },
          {
            path: "order-details-delivery/:orderId",
            element: <OrderDetails action="Delivered" role="seller" />,
          },
          {
            path: "order-details-delivered/:orderId",
            element: <OrderDetails action="Delivered" role="seller" />,
          },
        ],
      },
    ],
  },

  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage role="admin" />,
    children: [
      { path: "signup", element: <Signup role="admin" /> },
      { path: "login", element: <Login role="admin" /> },
      {
        path: "forgot-password",
        element: <ForgotPassword role="admin" />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword role="admin" />,
      },

      {
        element: <ProtectedRouteAdmin />,
        children: [
          { path: "", element: <AdminHome role="admin" /> },
          {
            path: "products",
            element: <Products action="Update" role="admin" />,
          },
          // {
          //   path: "return-list-returned",
          //   element: <ReturnList action="Returned" role="admin" />,
          // },
          // {
          //   path: "return-list-approved",
          //   element: <ReturnList action="Approved" role="admin" />,
          // },
          // {
          //   path: "return-list-rejected",
          //   element: <ReturnList action="Rejected" role="admin" />,
          // },
          // {
          //   path: "return-details-returned/:orderId",
          //   element: <ReturnDetails action="returned" role="admin" />,
          // },
          // {
          //   path: "return-details-approved/:orderId",
          //   element: <ReturnDetails action="Approved" role="admin" />,
          // },
          // {
          //   path: "return-details-rejected/:orderId",
          //   element: <ReturnDetails action="Rejected" role="admin" />,
          // },
          {
            path: "delete-product",
            element: <Products role="admin" action="Delete" />,
          },
          {
            path: "users",
            element: <Users role="user" status="active" action="Deactivate" />,
          },
          { path: "profile", element: <Profile role="admin" /> },

          {
            path: "delete-user",
            element: <Users role="user" action="Delete" />,
          },
          {
            path: "inactive-users",
            element: <Users role="user" action="Activate" status="inactive" />,
          },
          {
            path: "deactivate-seller",
            element: (
              <Users role="seller" action="Deactivate" status="active" />
            ),
          },

          {
            path: "delete-seller",
            element: <Users role="seller" action="Delete" status="active" />,
          },
          {
            path: "sellers",
            element: (
              <Users role="seller" status="active" action="Deactivate" />
            ),
          },
          {
            path: "orders-processing",
            element: <OrderList action="processing" role="admin" />,
          },
          {
            path: "orders-success",
            element: <OrderList action="success" role="admin" />,
          },
          {
            path: "orders-shipping",
            element: <OrderList action="shipping" role="admin" />,
          },

          {
            path: "orders-delivery",
            element: <OrderList action="delivery" role="admin" />,
          },
          {
            path: "orders-delivered",
            element: <OrderList action="delivered" />,
          },
          {
            path: "order-details-processing/:orderId",
            element: <OrderDetails action="Success" role="admin" />,
          },
          {
            path: "order-details-success/:orderId",
            element: <OrderDetails action="Shipping" role="admin" />,
          },
          {
            path: "order-details-shipping/:orderId",
            element: <OrderDetails action="Delivery" role="admin" />,
          },
          {
            path: "order-details-delivery/:orderId",
            element: <OrderDetails action="Delivered" role="admin" />,
          },
          {
            path: "order-details-delivered/:orderId",
            element: <OrderDetails action="Delivered" role="admin" />,
          },
          {
            path: "seller-details/:userId",
            element: <Profile role="seller" action="Details" />,
          },
          {
            path: "user-details/:userId",
            element: <Profile role="user" action="Details" />,
          },
          {
            path: "inactive-sellers",
            element: (
              <Users role="seller" action="Activate" status="inactive" />
            ),
          },
          { path: "add-product", element: <AddNewProduct role="admin" /> },
          {
            path: "update-product/:productId",
            element: <UpdateProduct role="admin" action="Update" />,
          },
          {
            path: "product-details/:productId",
            element: <ProductDetails />,
          },
          {
            path: "banners",
            element: <Banners role="admin" />,
          },
          {
            path: "delete/banner",
            element: <Banners />,
          },
          { path: "add-banner", element: <AddBanner role="admin" /> },
        ],
      },
    ],
  },
]);