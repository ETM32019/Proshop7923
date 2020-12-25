import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div
      id="topRatedCarousel"
      className="carousel slide bg-dark"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        {products.map((product, index) => (
          <div
            key={product._id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img src={product.image} className="img-fluid" alt={product.name} />
            <Link key={product._id} to={`/product/${product._id}`}>
              <div className="carousel-caption">
                <h2>
                  {product.name} (${product.price})
                </h2>
              </div>
            </Link>
          </div>
        ))}
        <a
          className="carousel-control-prev"
          href="#topRatedCarousel"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#topRatedCarousel"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default ProductCarousel;
