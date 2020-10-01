import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import "../../css/menu.css";
import "../../css/navbar.css";
// import Search from "./Search";
// import { itemTotal, getCart } from "./cartHelpers";
import { UserContext } from "../UserContext";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  const [menu, setMenu] = useState(false);
  // const [local, setLocal] = useState(0);
  const showMenu = () => {
    setMenu(!menu);
    console.log(menu);
  };
  const { cartValue, setCartValue } = useContext(UserContext);

  return (
    <div className="wrapper">
      <nav id="navbar" className="">
        <div className="nav-wrapper">
          {/* <!-- Navbar Logo --> */}
          <span className="cartIconMobile">
            <Link
              className="nav-link"
              style={isActive(history, "/cart")}
              to="/cart"
            >
              <i className="fas fa-shopping-cart"></i>{" "}
              <sup className="sup">
                <small className="cart-badge badgeNum">{cartValue}</small>
              </sup>
            </Link>
          </span>
          <div className="logo">
            {/* <!-- Logo Placeholder for Inlustration --> */}
            <Link to="/" className="logoRtd">
              <i className="fas fa-chess-knight"></i> RiceToDoors
              {/* <i
                className="fas fa-chess-knight"
                onClick={() => setValue("RiceToDoors")}
              ></i>{" "}
              {value} */}
            </Link>
          </div>

          {/* <!-- Navbar Links --> */}
          <ul id="menu">
            <li className="nav-item">
              <Link className="nav-link" style={isActive(history, "/")} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/shop")}
                to="/shop"
              >
                Shop
              </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/user/dashboard")}
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/admin/dashboard")}
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {!isAuthenticated() && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(history, "/signin")}
                    to="/signin"
                  >
                    Log in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(history, "/signup")}
                    to="/signup"
                  >
                    Create account
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  className="nav-link span"
                  style={{ cursor: "pointer", color: "#ffffff" }}
                  onClick={() =>
                    signout(() => {
                      history.push("/");
                    })
                  }
                >
                  Signout
                </span>
              </li>
            )}
            {isAuthenticated() && (
              <li className="nav-item">
                <span style={{ color: "#ffffff" }} className="mr-1 hellouser">
                  Hello, {isAuthenticated().user.name}
                </span>
              </li>
            )}
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/cart")}
                to="/cart"
              >
                <i className="fas fa-shopping-cart"></i>{" "}
                <sup className="sup">
                  <small className="cart-badge badgeNum">{cartValue}</small>
                </sup>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* <!-- Menu Icon --> */}
      <div className="menuIcon" onClick={showMenu}>
        <span className="icon icon-bars"></span>
        <span className="icon icon-bars overlay"></span>
      </div>
      {menu && (
        <div className="overlay-menu">
          <ul id="menu">
            <li className="nav-item">
              <Link className="nav-link" style={isActive(history, "/")} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/shop")}
                to="/shop"
              >
                Shop
              </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/user/dashboard")}
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/admin/dashboard")}
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {!isAuthenticated() && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(history, "/signin")}
                    to="/signin"
                  >
                    Log in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(history, "/signup")}
                    to="/signup"
                  >
                    Create account
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer", color: "#ffffff" }}
                  onClick={() =>
                    signout(() => {
                      history.push("/");
                    })
                  }
                >
                  Signout
                </span>
              </li>
            )}
            {isAuthenticated() && (
              <li className="nav-item">
                <span style={{ color: "#ffffff" }} className="mr-1">
                  Hello, {isAuthenticated().user.name}
                </span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/*  */}
      <ul className="nav nav-tabs bg-color-nav">
        {/* <li className="nav-item">
        <Search />
      </li> */}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
