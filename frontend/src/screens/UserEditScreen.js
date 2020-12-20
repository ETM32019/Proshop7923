import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="nameLabel">Name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Enter Name..."
                value={name}
                onChange={e => setName(e.target.value)}
                id="userEditNameInput"
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
                id="userEditEmailInput"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-check pb-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
                id="userEditIsAdminInput"
              ></input>
              <label className="form-check-label" htmlFor="isAdminLabel">
                Is Admin
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
