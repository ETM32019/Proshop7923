import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="emailLabel">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="signInEmailInput"
            aria-describedby="emailHelp"
          />
          <small id="signInEmailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="passwordLabel">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password..."
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="signInPasswordInput"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
      <div className="row py-3">
        <div className="col">
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
