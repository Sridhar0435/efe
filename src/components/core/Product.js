import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./ApiCore";
import Card from "./Card";
import "../../css/card.css";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState({});

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        setProduct(data);
        //fetch related product
        listRelated(data._id).then((data) => {
          if (data.err) {
            setError(data.err);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);
  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h3>Related Products</h3>
          {relatedProduct.map((p, i) => (
            <div key={i} className="mb-3">
              <Card product={p} />
            </div>
          ))}
          {/* //comments implement pending */}
        </div>
      </div>
    </Layout>
  );
};

export default Product;