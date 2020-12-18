import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }

  // calculate prices
  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      // Dispatch user details reset
      // Dispatch order create reset

      // eslint-disable-next-line
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row">
        <div className="col-md-8">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </li>
            <li className="list-group-item">
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </li>
            <li className="list-group-item">
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ul className="list-group list-group-flush">
                  {cart.cartItems.map((item, index) => (
                    <li className="list-group-item" key={index}>
                      <div className="row">
                        <div className="col-md-1">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="rounded img-fluid"
                          />
                        </div>
                        <div className="col">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="col-md-4">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h2>Order Summary</h2>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Items</div>
                  <div className="col">${cart.itemsPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="col">Tax</div>
                <div className="col">${cart.taxPrice}</div>
              </li>
              <li className="list-group-item">
                <div className="col">Total</div>
                <div className="col">${cart.totalPrice}</div>
              </li>
              <li className="list-group-item">
                {error && <Message variant="danger">{error}</Message>}
              </li>
              <li className="list-group-item">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
