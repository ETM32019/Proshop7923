import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <div className="row">
        {products.map(product => (
          <div
            className="col-sm-12 col-md-6 col-lg-4 col-xl-3"
            key={product._id}
          >
            <Product product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
