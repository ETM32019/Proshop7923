import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div class="form-group">
          <legend>Select Method</legend>
          <div className="col">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="paymentMethod"
                id="PayPal"
                value="PayPal"
                checked
                onChange={e => setPaymentMethod(e.target.value)}
              />
              <label class="form-check-label" htmlFor="payPalLabel">
                PayPal or Credit Card
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
