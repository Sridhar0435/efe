import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import "../../css/card.css";
import "../../css/cart.css";
import { UserContext, ProductContext } from "../UserContext";
const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  singleProductFrom = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  // console.log(product);
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const { setCartValue } = useContext(UserContext);
  const { setPro } = useContext(ProductContext);

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-success badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock</span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value, (countUpdate) => {
        setPro(countUpdate);
      });
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Add quantity</span>
            </div>
            <input
              type="number"
              className="form-contorl"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id, (cart, localcartupdate) => {
              setCartValue(cart);
              setPro(localcartupdate);
            });
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-default mt-2 mb-2"
        >
          <i className="far fa-trash-alt"></i>
        </button>
      )
    );
  };

  const addToCart = () => {
    addItem(product, (cart, localcart) => {
      setRedirect(true);
      setCartValue(cart);
      setPro(localcart);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return "";
    }
  };

  const cartFromCardFalse = (product) => {
    return (
      <tr>
        <td>
          <div className="cart-info-out">
            <ShowImage item={product} url="product" className="cartcheck" />
            <div className="cart-box">
              <p>
                {product.name} {showStock(product.quantity)}
              </p>
              <small>Price: ₹{product.price}</small>
              <br />
              {showRemoveButton(showRemoveProductButton)}
            </div>
          </div>
        </td>
        <td>
          <input
            type="number"
            className="form-contorl"
            value={count}
            onChange={handleChange(product._id)}
          />
          {/* {showCartUpdateOptions(cartUpdate)} */}
        </td>
        <td>₹{product.price}</td>
      </tr>
    );
  };

  const showSingleProduct = (product) => {
    return (
      <>
        <div className="col-md-6 col-sm-12 ft">
          <div className="singleproleft">
            <ShowImage item={product} url="product" className="cartcheck" />
          </div>
        </div>
        <div className="col-md-6 col-sm-12 snd">
          <div className="singleproright">
            <h6>Category: {product.category && product.category.name}</h6>
            <h2 className="mb-4 productricebrand">{product.name}</h2>
            <h2 className="mb-5 productprice">₹{product.price}</h2>
            <p className="mb-5 productdesc">{product.description}</p>
            <button className="btn  addtocart" onClick={addToCart}>
              Add to Bag
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {cartUpdate && cartFromCardFalse(product)}
      {singleProductFrom && showSingleProduct(product)}
      {!cartUpdate && !singleProductFrom && (
        <div className="card cart">
          <div className="card-body card-center-cu">
            {shouldRedirect(redirect)}
            <ShowImage item={product} url="product" />
            <div className="productname mt-2">{product.name}</div>
            {/* <p className="lead mt-2">{product.description.substring(0, 50)}</p> */}
            <p className="homeprice">₹ {product.price}</p>

            {showStock(product.quantity)}
            <br />
            <div className="flexbestseller">
              <Link to={`/product/${product._id}`}>
                {showViewProductButton ? (
                  <button className="btn btn-outline-primary mt-2 mb-2 mr-1 addtocart">
                    View Product
                  </button>
                ) : (
                  ""
                )}
              </Link>

              {showAddToCartButton && product.quantity > 0 ? (
                <button
                  onClick={addToCart}
                  className="btn mt-2 mb-2 ml-1 addtocart"
                >
                  Add to Bag
                </button>
              ) : (
                <button className="btn mt-2 mb-2 ml-1 cursornotallowed">
                  Add to Bag
                </button>
              )}
            </div>
            {showCartUpdateOptions(cartUpdate)}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
