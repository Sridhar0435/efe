import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Search from "./Search";
import { getProducts } from "./ApiCore";
import Card from "./Card";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="E commerece app"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4 newarrival">
        <span className="newbestbottomline">New Arrivals</span>
      </h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-md-3 col-sm-12 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>

      <h2 className="mb-4 newarrival">
        <span className="newbestbottomline">Best Sellers</span>
      </h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <div key={i} className="col-md-3 col-sm-12 mb-3">
            <Card key={i} product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
