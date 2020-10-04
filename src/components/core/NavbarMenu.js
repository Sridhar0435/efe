import React, { useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { UserContext } from "../UserContext";
import { signout, isAuthenticated } from "../auth";
import "../../css/navbarmain.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const NavbarMenu = ({ history }) => {
  const MenuItems = [
    {
      title: "Home",
      url: "/",
      cName: "nav-links",
    },
    {
      title: "Shop",
      url: "/shop",
      cName: "nav-links",
    },
    {
      title: "User dashboard",
      url: "/user/dashboard",
      cName: "nav-links",
    },
    {
      title: "Admin dashboard",
      url: "/admin/dashboard",
      cName: "nav-links",
    },
    {
      title: "Log in",
      url: "/signin",
      cName: "nav-links",
    },
    {
      title: "Create a account",
      url: "/signup",
      cName: "nav-links",
    },
    {
      title: "Sign out",
      url: "/Signout",
      cName: "nav-links",
    },
    {
      title: "Cart",
      url: "/cart",
      cName: "nav-links",
    },
  ];
  const [menuCliked, setMenuCliked] = useState(false);
  const { cartValue, setCartValue } = useContext(UserContext);
  const [time, setTime] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
      setTime(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  return (
    <nav className="NavbarItems">
      <h3 className="navbar-logo">
        <i className="fab fa-react"></i>
      </h3>

      <div className="menuIcon" onClick={() => setMenuCliked(!menuCliked)}>
        <span className="icon icon-bars"></span>
        <span className="icon icon-bars overlay"></span>
      </div>
      {/* <i className={menuCliked ? "fas fa-times" : "fas fa-bars"}></i> */}

      {time ? (
        <ul className={menuCliked ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link
              className="nav-links"
              style={isActive(history, "/")}
              onClick={() => setMenuCliked(!menuCliked)}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-links"
              style={isActive(history, "/shop")}
              onClick={() => setMenuCliked(!menuCliked)}
              to="/shop"
            >
              Shop
            </Link>
          </li>

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
              <Link
                className="nav-links"
                style={isActive(history, "/user/dashboard")}
                onClick={() => setMenuCliked(!menuCliked)}
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                className="nav-links"
                style={isActive(history, "/admin/dashboard")}
                onClick={() => setMenuCliked(!menuCliked)}
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
                  className="nav-links"
                  style={isActive(history, "/signin")}
                  onClick={() => setMenuCliked(!menuCliked)}
                  to="/signin"
                >
                  Log in
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-links"
                  style={isActive(history, "/signup")}
                  onClick={() => setMenuCliked(!menuCliked)}
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
                className="nav-links span"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                    setMenuCliked(!menuCliked);
                  })
                }
              >
                Signout
              </span>
            </li>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              <span
                style={{ color: "#ffffff" }}
                className="nav-links span mr-1 hellouser"
              >
                Hello, {isAuthenticated().user.name}
              </span>
            </li>
          )}
          <li className="nav-item">
            <Link
              className="nav-links"
              style={isActive(history, "/cart")}
              to="/cart"
            >
              <i className="fas fa-shopping-bag"></i>{" "}
              <sup className="sup">
                <small className="cart-badge badgeNum">{cartValue}</small>
              </sup>
            </Link>
          </li>
          {/* {MenuItems.map((item, index) => {

          return (
            <li className={item.cName}>
              <Link style={isActive(history, item.url)} to={item.url}>
                {item.title}
              </Link>
            </li>
          );
        })} */}
        </ul>
      ) : (
        ""
      )}
    </nav>
  );
};

export default withRouter(NavbarMenu);
