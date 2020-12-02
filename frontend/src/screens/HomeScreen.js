import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
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
      )}
    </>
  );
};

export default HomeScreen;
