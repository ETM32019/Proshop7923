import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="addressLabel">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Address..."
            value={address}
            required
            onChange={e => setAddress(e.target.value)}
            id="shippingAddressInput"
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressLabel">City</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter City..."
            value={city}
            required
            onChange={e => setCity(e.target.value)}
            id="shippingCityInput"
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressLabel">Postal Code</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Postal Code..."
            value={postalCode}
            required
            onChange={e => setPostalCode(e.target.value)}
            id="shippingPostalCodeInput"
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressLabel">Country</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Country..."
            value={country}
            required
            onChange={e => setCountry(e.target.value)}
            id="shippingCountryInput"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
