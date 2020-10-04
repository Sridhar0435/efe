import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";
// import Item from "./Item";
import { read, listRelated } from "./ApiCore";
import Card from "./Card";
import ShowImage from "../core/ShowImage";
import "../../css/card.css";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState({});
  const [loadPage, setLoadPage] = useState(false);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

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
    // setLoadPage(true);
  }, [props]);
  console.log(product);
  console.log(relatedProduct);
  return (
    <div className="container-fluid singleProductMain">
      <div className="row singleRow">
        {/* <div className="col-8">
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
          //comments implement pending
        </div> */}
        {product && product.description && (
          <Card
            product={product}
            showViewProductButton={false}
            singleProductFrom={true}
          />
        )}
      </div>

      {relatedProduct.length > 0 && (
        <>
          <hr />
          <div className="showRelatedItems">
            <h2 className="newarrival">Related items</h2>
            <Carousel breakPoints={breakPoints}>
              {relatedProduct.map((item) => (
                <div key={item._id} className="box">
                  <div className="box_div">
                    <ShowImage
                      item={item}
                      url="product"
                      className="cartcheck"
                    />
                    <h5 className="relatedname mt-2">{item.name}</h5>
                    <h5 className="relatedprice mt-1">₹{item.price}</h5>
                    <Link to={`/product/${item._id}`}>
                      <button className="btn addtocart">View Product</button>
                    </Link>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
