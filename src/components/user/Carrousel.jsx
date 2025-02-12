import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { useEffect, useState } from "react";

export const Carrousel = () => {
  // Get current banner status
  const { banner } = useSelector((state) => state.banner);

  // Store banner theme
  const [bannerTheme, setBannerTheme] = useState([]);

  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Set default theme
  const themes = {
    themeUrl: "/banner/yellow-banners",
  };

  // Set banner
  if (!theme) {
    themes.themeUrl = "/banner/black-banners";
  }

  // Api call
  useEffect(() => {
    const themeHandler = async () => {
      const response = await axiosInstance({
        method: "GET",
        url: themes.themeUrl,
      });

      setBannerTheme(response?.data?.data);
    };
    themeHandler();
  }, [theme, themes.themeUrl]);

  if (!banner) return;

  return (
    <Carousel data-bs-theme="dark" style={{ maxHeight: "600px" }}>
      {bannerTheme?.map((theme) => (
        <Carousel.Item key={theme._id}>
          <img
            className="d-block w-100"
            src={theme.image}
            style={{ borderRadius: "50px", objectFit: "fit", maxHeight: "540px" }} // Adjust styles for the image
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
