import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="card my-3 p-2 rounded">
      <Link to={`/product/${product._id}`}>
        <img className="card-img-top" src={product.image} alt="Product" />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <div className="card-title">
            <strong>{product.name}</strong>
          </div>
        </Link>
        <div className="card-text">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
        <div className="card-text">
          <h3>${product.price}</h3>
        </div>
      </div>
    </div>
  );
};

export default Product;
