import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated!</Message>}
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
              id="userProfileNameInput"
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
              id="userProfileEmailInput"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordLabel">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="userProfilePasswordInput"
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
              id="userProfileConfirmPasswordInput"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
      <div className="col-md-9">
        <h2>My orders</h2>
      </div>
    </div>
  );
};

export default ProfileScreen;
