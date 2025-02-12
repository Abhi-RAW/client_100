import { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const Banners = ({ role = "admin" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Get search value
  const { searchResult } = useSelector((state) => state.search);

  // Store banners
  const [banners, setBanners] = useState([]);
  const [deleteBanner, setDeleteBanner] = useState({});

  // Handle role
  const user = {
    role: "admin",
    banners: "/banner/banners",
    searchBanner: "/banner/search-banners",
  };

  if (role === "admin") {
    user.banners = "/banner/banners";
    user.searchBanner = "/banner/search-banners";
  } else if (role === "seller") {
    user.banners = "/banner/seller-banners";
    user.searchBanner = "/banner/search-seller-banners";
  }

  // Api call
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: user.banners,
        });
        setBanners(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBanners();
  }, [deleteBanner, user.banners, searchResult]);

  // Handle delete
  const handleDelete = async (bannerId) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: "/banner/delete-banner",
        data: { bannerId },
      });
      setDeleteBanner(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Api call for search
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: user.searchBanner,
          data: { searchResult },
        });
        setBanners(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchResult) {
      fetchSearchData();
    } else {
      setBanners(banners);
    }
  }, [searchResult, banners, user.searchBanner]);

  return (
    <Container style={{ minHeight: 400 }}>
      <h1
        className={
          theme ? "text-center text-dark mt-5" : "text-center text-light mt-5"
        }
      >
        Banner List
      </h1>
      <Row className="mt-5 p-3">
        {banners?.map((banner) => (
          <Col key={banner._id} xs={12} md={4} lg={3} className="mb-4">
            <Card
              style={{
                backgroundColor: theme ? "#FFF6E3" : "#333",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Img
                variant="top"
                src={banner?.image}
                alt="Banner Image"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <Card.Body>
                <Card.Title
                  className={theme ? "text-dark" : "text-light"}
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: theme ? "black" : "white", // Ensure text is visible
                  }}
                >
                  {banner.title}
                </Card.Title>
                <Button
                  variant={theme ? "warning" : "dark"}
                  className="text-white btn-sm w-100"
                  onClick={() => handleDelete(banner._id)}
                  style={{
                    backgroundColor: theme ? "#000" : "#444", // Visible button color
                  }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
