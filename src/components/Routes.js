import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext, ProductContext } from "./UserContext";
import NavbarMenu from "./core/NavbarMenu";
import Signup from "../components/user/Signup";
import Signin from "../components/user/Signin";
import Home from "../components/core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Footer from "./core/Footer";

import "../css/styles.css";

const Routes = () => {
  const [cartValue, setCartValue] = useState(0);
  const [pro, setPro] = useState([]);

  const checkLocalStorage = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        return setPro(JSON.parse(localStorage.getItem("cart")));
      } else {
        return [];
      }
    } else {
      return [];
    }
  };
  const zero = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        return setCartValue(JSON.parse(localStorage.getItem("cart")).length);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };
  // const providerValue = useMemo(() => ({value, setValue}), [value, setValue])
  useEffect(() => {
    zero();
    checkLocalStorage();
  }, []);
  return (
    <Router>
      <UserContext.Provider value={{ cartValue, setCartValue }}>
        <ProductContext.Provider value={{ pro, setPro }}>
          <NavbarMenu />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/shop" exact component={Shop} />

            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/home" exact component={Home} />
            <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            <AdminRoute
              path="/admin/dashboard"
              exact
              component={AdminDashboard}
            />
            <AdminRoute path="/create/category" exact component={AddCategory} />
            <AdminRoute path="/create/product" exact component={AddProduct} />
            <Route path="/product/:productId" exact component={Product} />
            <Route path="/cart" exact component={Cart} />
            <AdminRoute path="/admin/orders" exact component={Orders} />
            <PrivateRoute path="/profile/:userId" exact component={Profile} />
            <AdminRoute
              path="/admin/products"
              exact
              component={ManageProducts}
            />
            <AdminRoute
              path="/admin/product/update/:productId"
              exact
              component={UpdateProduct}
            />
          </Switch>
          <Footer />
        </ProductContext.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export default Routes;
