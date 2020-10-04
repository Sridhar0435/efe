import React from "react";
import { Link } from "react-router-dom";
import riceImage from "../../images/rice2.jpg";
import "../../css/styles.css";
import "../../css/layout.css";
const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <>
    {/* <Menu /> */}
    <div className="jumbotron" id="home-content">
      <div className="wide-cta-1 short blue">
        <div className="img-product">
          <a title="Shop Clear Genius" href="#">
            <img src={riceImage} alt="" />
          </a>
        </div>
        <div className="copy-wrap">
          <h1> We Deliver Your The Rice Bags At Your Door.</h1>
          <p></p>
          <p>
            <Link
              className="button"
              to="/"
              style={{
                background:
                  "linear-gradient(to right, rgb(115, 210, 230) 0%, rgb(247, 235, 97) 0%)",
              }}
            >
              SHOP WITH TRUST
            </Link>
          </p>
        </div>
      </div>
      {/* <h2>{title}</h2> */}
      {/* <p className="lead">{description}</p> */}
    </div>
    <div className={className}>{children}</div>
  </>
);

export default Layout;
