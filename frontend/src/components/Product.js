import React from "react";

const Product = ({ product }) => {
  return (
    <div class="card my-3 p-3 rounded">
      <a href={`/product/${product._id}`}>
        <img class="card-img-top" src={product.image} alt="Product Image" />
      </a>
      <div className="card-body">
        <a href={`/product/${product._id}`}>
          <div className="card-title">
            <strong>{product.name}</strong>
          </div>
        </a>
        <div className="card-text my-3">
            {product.rating} from {product.numReviews} reviews
        </div>
        <h3 className="card-text">
            ${product.price}
        </h3>
      </div>
    </div>
  );
};

export default Product;
