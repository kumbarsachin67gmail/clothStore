import React, { useState } from "react";
import Layout from "../core/Layout";
import { API } from "../config";
import {Link, Redirect} from 'react-router-dom';
import {signin,authenticate} from '../auth';
import {isAuthenticated} from '../auth';

const Signin = () => {
  const [values, setValues] = useState({
    email: "kumbarsachin67@gmail.com",
    password: "123456",
    error: "",
    loading:false,
    redirectToReferrer:false
  });

  const {user} = isAuthenticated();

  const { email, password, loading, error,redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signup = (user) => {
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values,error:false,loading:true})
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false,loading:false });
      } else {
        authenticate(data,()=>{
            setValues({
                ...values,
                redirectToReferrer:true
               
              });
        })
      }
    });
  };

  const signUpForm = () => (
    <form className="col-5 offset-3">
      <div className="form-group">
        <label><strong>Email</strong></label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label><strong>Password</strong></label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => (
    loading && (<div className="alert alert-info"><h2>loading...</h2></div>)
  );

  const redirectUser = () =>{
      if(redirectToReferrer){
          if(user && user.role===1){
            return <Redirect to="/admin/dashboard"/>
          }
          else{
            return <Redirect to="/user/dashboard"/>
          }
      }
      if(isAuthenticated()){
        return <Redirect to="/"/>
      }
  }

  return (
    <Layout
      title="Signin  Page"
      description="Node React ecommerce website"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signUpForm()} 
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
