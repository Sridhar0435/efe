import React, { useState, useEffect, useContext } from "react";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import { ProductContext } from "../UserContext";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  const { pro } = useContext(ProductContext);
  console.log(`pro ${pro.length}`);
  useEffect(() => {
    console.log("MAX DEPTH ...");
    setItems(getCart());
    localStorage.removeItem("fromCart");
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h5>Your cart has {`pro ${pro.length}`} items</h5>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pro.map((product, i) => (
              <Card
                key={i}
                product={product}
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
                setRun={setRun}
                run={run}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is Empty...! <br /> <Link to="/shop">Continue shopping</Link>{" "}
    </h2>
  );

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="col-md-8 cart-page">
          {pro.length > 0 ? showItems(pro) : noItemsMessage()}
        </div>
        <div className="col-md-4">
          <h5 className="mb-4 yourcursummary">Your current summery</h5>
          <hr />
          <Checkout products={pro} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
