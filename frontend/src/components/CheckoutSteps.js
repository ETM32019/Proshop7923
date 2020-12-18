import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <ul className="nav justify-content-center mb-4">
      <li className="nav-item">
        {step1 ? (
          <Link className="nav-link" to="/login">
            Sign In
          </Link>
        ) : (
          <div
            className="nav-link disabled"
            aria-disabled="true"
            tabIndex="-1"
          >
            Sign In
          </div>
        )}
      </li>
      <li className="nav-item">
        {step2 ? (
          <Link className="nav-link" to="/shipping">
            Shipping
          </Link>
        ) : (
          <div
            className="nav-link disabled"
            aria-disabled="true"
            tabIndex="-1"
          >
            Shipping
          </div>
        )}
      </li>
      <li className="nav-item">
        {step3 ? (
          <Link className="nav-link" to="/payment">
            Payment
          </Link>
        ) : (
          <div
            className="nav-link disabled"
            aria-disabled="true"
            tabIndex="-1"
          >
            Payment
          </div>
        )}
      </li>
      <li className="nav-item">
        {step4 ? (
          <Link className="nav-link" to="/placeorder">
            Place Order
          </Link>
        ) : (
          <div
            className="nav-link disabled"
            aria-disabled="true"
            tabIndex="-1"
          >
            Place Order
          </div>
        )}
      </li>
    </ul>
  );
};

export default CheckoutSteps;
