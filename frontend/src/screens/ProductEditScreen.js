import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, history, productId, product]);

  const submitHandler = e => {
    e.preventDefault();
    // update product
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
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
                id="productEditNameInput"
              />
            </div>
            <div className="form-group">
              <label htmlFor="priceLabel">Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Price..."
                value={price}
                onChange={e => setPrice(e.target.value)}
                id="productEditEmailInput"
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageLabel">Image</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter image url..."
                value={image}
                onChange={e => setImage(e.target.value)}
                id="productEditImageInput"
              />
            </div>
            <div className="form-group">
              <label htmlFor="brandLabel">Brand</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Brand..."
                value={brand}
                onChange={e => setBrand(e.target.value)}
                id="productEditBrandInput"
              />
            </div>
            <div className="form-group">
              <label htmlFor="countInStockLabel">Count In Stock</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter count in stock..."
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
                id="productEditCountInStockInput"
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryLabel">Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Category..."
                value={category}
                onChange={e => setCategory(e.target.value)}
                id="productEditCategoryInput"
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionLabel">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Description..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                id="productEditDescriptionInput"
              />
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

export default ProductEditScreen;
