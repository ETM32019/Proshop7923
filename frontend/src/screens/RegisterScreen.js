import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="nameLabel">Name</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Name..."
            value={name}
            onChange={e => setName(e.target.value)}
            id="registerNameInput"
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailLabel">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="registerEmailInput"
            aria-describedby="emailHelp"
          />
          <small id="registerEmailHelp" className="form-text text-muted">
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
            id="registerPasswordInput"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPasswordLabel">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password..."
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            id="registerConfirmPasswordInput"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
      <div className="row py-3">
        <div className="col">
          Have Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
