import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getOrderDetails } from "../actions/orderActions";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading) {
    const addDecimals = num => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <div className="row">
        <div className="col-md-8">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </li>
            <li className="list-group-item">
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </li>
            <li className="list-group-item">
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ul className="list-group list-group-flush">
                  {order.orderItems.map((item, index) => (
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
                  <div className="col">${order.itemsPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Shipping</div>
                  <div className="col">${order.shippingPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Tax</div>
                  <div className="col">${order.taxPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Total</div>
                  <div className="col">${order.totalPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                {error && <Message variant="danger">{error}</Message>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
