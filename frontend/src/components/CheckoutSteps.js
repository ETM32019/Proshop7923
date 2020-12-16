import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <ul class="nav justify-content-center mb-4">
      <li class="nav-item">
        {step1 ? (
          <Link class="nav-link" to="/login">
            Sign In
          </Link>
        ) : (
          <Link class="nav-link disabled" aria-disabled="true" tabindex="-1">
            Sign In
          </Link>
        )}
      </li>
      <li class="nav-item">
        {step2 ? (
          <Link class="nav-link" to="/shipping">
            Shipping
          </Link>
        ) : (
          <Link class="nav-link disabled" aria-disabled="true" tabindex="-1">
            Shipping
          </Link>
        )}
      </li>
      <li class="nav-item">
        {step3 ? (
          <Link class="nav-link" to="/payment">
            Payment
          </Link>
        ) : (
          <Link class="nav-link disabled" aria-disabled="true" tabindex="-1">
            Payment
          </Link>
        )}
      </li>
      <li class="nav-item">
        {step4 ? (
          <Link class="nav-link" to="/placeorder">
            Place Order
          </Link>
        ) : (
          <Link class="nav-link disabled" aria-disabled="true" tabindex="-1">
            Place Order
          </Link>
        )}
      </li>
    </ul>
  );
};

export default CheckoutSteps;
