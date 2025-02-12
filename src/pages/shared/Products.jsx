import { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  min-height: 400px;
`;

const StyledHeader = styled.h1`
  text-align: center;
  margin-top: 5rem;
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => (theme ? "black" : "white")};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StyledRow = styled(Row)`
  margin-top: 5rem;
  padding: 3rem;
  border-radius: 3rem;
  background-color: ${({ theme }) => (theme ? "#FFF6E3" : "#d9d9d9")};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const StyledCard = styled(Card)`
  height: 100%;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  background-color: ${({ theme }) => (theme ? "white" : "#333")};
  color: ${({ theme }) => (theme ? "black" : "white")};
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => (theme ? "#ffc107" : "#333")};

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

export const Products = ({ action = "Update", role = "admin" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  // Get search value
  const { searchResult } = useSelector((state) => state.search);

  // Handle routes
  const product = {
    products: "/product/products",
    productDelete: "/product/delete-product",
    searchProducts: "product/search-seller-products",
  };

  // Handle role
  if (role === "seller") {
    product.products = "product/seller-products";
    product.searchProducts = "product/search-seller-products";
  } else if (role === "admin") {
    product.products = "product/products";
    product.searchProducts = "/product/search";
  }

  // Store products
  const [products, setProducts] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState({});

  // Api call
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: product.products,
        });
        // Set products to state
        if (role === "seller") {
          setProducts(response.data.data.products);
        } else {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [product.products, searchResult, deleteProduct]);

  // Handle actions
  const handleAction = async (productId) => {
    try {
      if (action === "Delete") {
        const response = await axiosInstance({
          method: "DELETE",
          url: product.productDelete,
          data: { productId },
        });
        setDeleteProduct(response.data.data);
      }

      if (action === "Update" && role === "admin") {
        navigate(`/admin/update-product/${productId}`);
      } else if (action === "Update" && role === "seller") {
        navigate(`/seller/update-product/${productId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Api call for search functionality
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: product.searchProducts,
          data: { searchResult },
        });
        setProducts(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchResult) {
      fetchSearchData();
    } else {
      setProducts(products);
    }
  }, [searchResult, products, deleteProduct]);

  return (
    <StyledContainer>
      <StyledHeader theme={theme}>
        Product {action} List
      </StyledHeader>
      <StyledRow theme={theme}>
        {products?.map((product) => (
          <Col
            key={product._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4"
          >
            <StyledCard theme={theme}>
              <Card.Body>
                <Card.Title className="text-center">
                  <Link
                    className="text-decoration-none"
                    to={
                      role === "admin"
                        ? `/admin/product-details/${product._id}`
                        : `/seller/product-details/${product._id}`
                    }
                  >
                    {product.title}
                  </Link>
                </Card.Title>
                <Card.Text className="text-center">
                  <strong>Stock:</strong> {product?.stock}
                </Card.Text>
                <div className="text-center">
                  <StyledButton theme={theme} className="btn-sm text-white" onClick={() => handleAction(product._id)}>
                    {action}
                  </StyledButton>
                </div>
              </Card.Body>
            </StyledCard>
          </Col>
        ))}
      </StyledRow>
    </StyledContainer>
  );
};
