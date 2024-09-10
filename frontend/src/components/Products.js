import React, { useState, useEffect } from "react";
import { Pagination } from "./Pagination";
import { handleError } from "../utils";
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 10;

  // Access token (you'll get this token after login)
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/products?page=${currentPage}&limit=${productsPerPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"), // Pass token in Authorization header
            },
          }
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        handleError(error);
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, accessToken]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1>Paginated Products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ width: "100%", textAlign: "left" }}
        >
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, key) => (
              <tr key={product._id}>
                <td>{key + 1}</td>
                <td>{product.title}</td>
                <td>{product.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination totalPages={totalPages} paginate={paginate} />
    </div>
  );
};
