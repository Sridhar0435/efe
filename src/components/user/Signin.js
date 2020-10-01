import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, autheticate, isAuthenticated } from "../auth/index";
import "../../css/signin.css";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "siri@gmail.com",
    password: "123456",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const onsubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      console.log(data);
      if (data.err) {
        setValues({
          ...values,
          error: data.err,
          loading: false,
        });
      } else {
        autheticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signInForm = () => (
    <form className="signinform">
      <h3 className="h3-login">Login</h3>
      <div className="form-group">
        {/* <label>Email</label> */}
        <input
          onChange={handleChange("email")}
          type="email"
          name="email"
          placeholder="Email"
          className="form-control sign"
          value={email}
          autoFocus
        />
      </div>
      <div className="form-group">
        {/* <label>Password</label> */}
        <input
          onChange={handleChange("password")}
          type="password"
          name="password"
          placeholder="Password"
          className="form-control sign"
          value={password}
        />
      </div>
      <button
        onClick={onsubmit}
        style={{ marginBottom: "10px" }}
        className="btn btn-block"
      >
        Signin
      </button>
      <Link to="/" className="rts mt-2">
        Return to Store
      </Link>{" "}
      <span className="dot">•</span>{" "}
      <Link className="rts" to="/signin">
        Forgot your password?
      </Link>
    </form>
  );

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        if (localStorage.getItem("fromCart")) {
          // localStorage.removeItem("fromCart");
          return <Redirect to="/cart" />;
        } else {
          return <Redirect to="/user/dashboard" />;
        }
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Fragment>
      {showError()}
      {showLoading()}
      {signInForm()}
      {redirectUser()}
    </Fragment>
  );
};

export default SignIn;
