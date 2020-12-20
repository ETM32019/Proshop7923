import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts, deleteProduct } from "../actions/productActions";

const ProductListScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = productDelete;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = id => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = e => {
    // Create product handler
  };

  return (
    <>
      <div className="">
        <div className="col">
          <h1>Products</h1>
        </div>
        <div className="col text-right">
          <button
            className="btn btn-primary my-3"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus"></i> Create Product
          </button>
        </div>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button type="button" className="btn btn-light btn-sm">
                        <i className="fas fa-edit"></i>
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ProductListScreen;
