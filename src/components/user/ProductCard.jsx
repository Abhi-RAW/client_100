import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { StarRatings } from "../shared/StarRatings";
import { AverageRatings } from "../shared/AverageRatings";
import { FaShoppingCart } from "react-icons/fa"; // New cart icon
import { WishlistIcon } from "../shared/WishlistIcon";

export const ProductCard = ({ product }) => {
  const { theme } = useSelector((state) => state.theme);
  const { isUserAuth } = useSelector((state) => state.user);
  const { wishlistData } = useSelector((state) => state.wishlist);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [average, setAverage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Check if product is already in wishlist
  useEffect(() => {
    if (wishlistData?.products) {
      setIsInWishlist(
        wishlistData.products.some((p) => p?.productId?._id === product?._id)
      );
    }
  }, [wishlistData, product]);

  // Add to Cart Function
  const addToCart = async (productId) => {
    if (!isUserAuth) return navigate("/login");

    try {
      await axiosInstance.post("/cart/add-product", { productId });
      toast.success("Product added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to cart");
    }
  };

  // Wishlist Toggle Function (Optimized)
  const wishlistHandler = useCallback(async () => {
    if (!isUserAuth) return navigate("/login");

    setIsInWishlist((prev) => !prev); // Instant UI update

    try {
      if (isInWishlist) {
        await axiosInstance.delete("/wishlist/remove-product", {
          data: { productId: product?._id },
        });
        toast.success("Removed from wishlist!");
      } else {
        await axiosInstance.post("/wishlist/add-product", { productId: product?._id });
        toast.success("Added to wishlist!");
      }
    } catch (error) {
      toast.error("Error updating wishlist");
      setIsInWishlist((prev) => !prev); // Revert UI if API fails
    }
  }, [isInWishlist, isUserAuth, navigate, product]);

  return (
    <Card
      className="border-0 shadow-lg rounded-4"
      style={{
        backgroundColor: theme ? "#FFF6E3" : "#f8f9fa",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Wishlist & Stock Status */}
      <div className="d-flex justify-content-between align-items-center p-2">
        <span
          className="d-flex align-items-center"
          onClick={wishlistHandler}
          style={{ cursor: "pointer", transition: "transform 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <WishlistIcon filled={isInWishlist} />
        </span>
        <span
          className={`badge ${product.stock !== 0 ? "bg-success" : "bg-danger"} text-white`}
        >
          {product.stock !== 0 ? `Available: ${product.stock}` : "Out of Stock"}
        </span>
      </div>

      {/* Product Image */}
      <Link to={`/product-details/${product?._id}`} className="text-decoration-none">
        <Card.Img
          className="object-fit-contain"
          variant="top"
          src={product?.image || "https://via.placeholder.com/150"}
          alt={product?.title}
          loading="lazy" // Lazy load image
          style={{ height: "220px", padding: "10px" }}
        />
      </Link>

      <Card.Body className="text-center">
        {/* Product Title */}
        <Link to={`/product-details/${product?._id}`} className="text-decoration-none text-black">
          <Card.Title
            className="fw-bold"
            style={{ fontSize: "1.1rem", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.target.style.color = "#ff9800")}
            onMouseLeave={(e) => (e.target.style.color = "#000")}
          >
            {product.title}
          </Card.Title>
        </Link>

        {/* Product Description */}
        <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
          {product?.description}
        </Card.Text>

        {/* Price */}
        <Card.Text className="fw-bold fs-5">₹{product?.price}</Card.Text>

        {/* Ratings */}
        <div className="d-flex justify-content-center align-items-center mt-2">
          <Link to={isUserAuth ? `/user/add-review/${product._id}` : "/login"}>
            <StarRatings
              productId={product?._id}
              getAverageRating={setAverage}
              starStyle={{
                fontSize: "1.2rem",
                color: "#ffd700",
                marginRight: "3px",
                transition: "transform 0.2s",
              }}
            />
          </Link>
          <AverageRatings average={average} />
        </div>

        {/* Add to Cart Button (Disabled if out of stock) */}
        <Button
          className="w-100 mt-3 d-flex align-items-center justify-content-center fw-bold rounded-pill"
          variant={theme ? "warning" : "dark"}
          style={{ transition: "background 0.3s ease-in-out" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ff9800")}
          onMouseLeave={(e) => (e.currentTarget.style.background = theme ? "#ffc107" : "#212529")}
          onClick={() => addToCart(product?._id)}
          disabled={product.stock === 0}
        >
          <FaShoppingCart size={25} />
          <span className="ms-2">
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </span>
        </Button>
      </Card.Body>
    </Card>
  );
};
