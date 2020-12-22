import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_FAIL
} from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
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
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
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
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="image-file"
                  onChange={uploadFileHandler}
                />
                <label className="custom-file-label" htmlFor="custom-file">
                  Choose file
                </label>
              </div>
              {uploading && <Loader />}
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
