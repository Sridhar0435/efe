import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });
  const { token } = isAuthenticated();
  const { name, email, password, error, success } = values;

  const init = (userId) => {
    //console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <form className="signupform">
      <h3 className="h3-login">Update Account</h3>
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
      <button
        onClick={clickSubmit}
        style={{ marginBottom: "10px" }}
        className="btn btn-block"
      >
        update
      </button>
    </form>
  );

  return (
    <>
      {/* <h2>Profile</h2> */}
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </>
  );
};

export default Profile;
