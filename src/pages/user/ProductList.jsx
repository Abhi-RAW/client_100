import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ProductCard } from "../../components/user/ProductCard";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { Loading } from "../../components/shared/Loading";

export const ProductList = () => {
  // Get category global state
  const { category } = useSelector((state) => state.category);

  // Get searchValue global state
  const { searchResult } = useSelector((state) => state.search);

  // Render product
  const [renderProducts, setRenderProducts] = useState([]);

  // Api call
  const [products, loading, error] = useFetch("/product/products");

  // Category base search
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/product/category",
          data: { category },
        });

        // Set selected category
        setRenderProducts(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    // Filter products
    if (category) {
      fetchCategory();
    } else {
      setRenderProducts(products);
    }
  }, [category, products]);

  // Search product
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/product/search",
          data: { searchResult },
        });

        // Set selected category
        setRenderProducts(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    // Filter products
    if (searchResult) {
      handleSearch();
    } else if (!category && products) {
      setRenderProducts(products);
    }
  }, [searchResult, products]);
  return (
    <Container style={{minHeight:550}}>
      {loading ? (
        <Loading />
      ) : (
        <Row className="mt-4">
          {renderProducts?.map((product) => (
            <Col
              className="crd-col"
              xs={12}
              sm={6}
              md={4}
              xl={3}
              key={product._id}
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )} 
    </Container>
  );
};
