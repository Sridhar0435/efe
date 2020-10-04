import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
// import swal from "@sweetalert/with-react";
import Layout from "../core/Layout";
import { signup } from "../auth/index";

// import { API } from "../../config";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    error: "",
    loading: false,
    success: false,
  });

  const {
    name,
    email,
    password,
    confirmpassword,
    loading,
    error,
    success,
  } = values;
  const handleChange = (name) => (event) => {
    if (name == "email") {
      setValues({
        ...values,
        error: false,
        [name]: event.target.value.toLocaleLowerCase(),
      });
    } else {
      setValues({
        ...values,
        error: false,
        [name]: event.target.value,
      });
    }
  };

  const onsubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    if (password !== confirmpassword) {
      return setValues({
        ...values,
        error: "Password and confirm password does not match",
      });
      //   return alert("Password and confirm password does not match");
    } else {
      signup({ name, email, password }).then((data) => {
        console.log(data);
        if (data.errors) {
          setValues({
            ...values,
            error: data.errors.errors[0].msg,
            success: false,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            confirmpassword: "",
            success: true,
          });
        }
      });
    }
  };

  const signUpForm = () => (
    <form className="signupform">
      <h3 className="h3-login">Create Account</h3>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="name"
          type="text"
          placeholder="Name"
          className="form-control sign"
          value={name}
          autoFocus
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("email")}
          type="email"
          name="email"
          placeholder="Email"
          className="form-control sign"
          value={email}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("password")}
          type="password"
          name="password"
          placeholder="Password"
          className="form-control sign"
          value={password}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("confirmpassword")}
          type="password"
          name="confirmpassword"
          placeholder="Confirm password"
          className="form-control sign"
          value={confirmpassword}
        />
      </div>
      <button
        onClick={onsubmit}
        style={{ marginBottom: "10px" }}
        className="btn btn-block"
      >
        Signup
      </button>
      <Link to="/" className="rts mt-2">
        Return to Store
      </Link>{" "}
      <span className="dot">•</span>{" "}
      <Link className="rts" to="/signin">
        Log in
      </Link>
    </form>
  );

  const showError = () => {
    return (
      <div
        className="alert alert-danger signupdangeralert"
        style={{ display: error ? "" : "none", textAlign: "center" }}
      >
        {error}
      </div>
    );
  };
  const showLoading = () =>
    loading && (
      <div className="alert alert-info signindangeralert">
        <h2>Loading...</h2>
      </div>
    );
  const showSuccess = () => (
    <div
      className="alert alert-info signupdangeralert"
      style={{
        display: success ? "" : "none",
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 12%)",
      }}
    >
      New account is created, Please <Link to="/signin">signin</Link>
    </div>
  );

  return (
    <div className="signupMain">
      {showError()}
      {showLoading()}
      {showSuccess()}
      {signUpForm()}
      {/* {JSON.stringify(values)} */}
    </div>
  );
};

export default SignUp;
