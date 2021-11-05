import './landing-page.css'
import React, { useState } from 'react';
import { BrowserRouter as Router ,Switch, Route, Link,useHistory } from "react-router-dom";
const axios = require('axios');
function LandingPage() {

  var historyobj=useHistory();
  const useFormInput = initialValue => {
      const [value, setValue] = useState(initialValue);
      
      const handleChange = e => {
          setValue(e.target.value);
      }
      return {
          value,
          onChange: handleChange
      }
  }
  const email = useFormInput('');
  const password = useFormInput('');

  let handleSubmit=function(event) {
    try {
        event.preventDefault();
        console.log(email.value)
        console.log(password.value)
        axios.post('http://localhost:3005/api/v1/user/signin',{username:email.value,password:password.value})
        .then(function (response) {
            window.localStorage.setItem("Token",response.data.token)
            console.log(response.data.token)
            historyobj.push("/create")
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    } catch (error) {
        console.log(error)
        alert("login Failed")
        
    }
  }

    return (
      <div className="container">
        <div className="row">
          <div className="col bg-white-light">
            <div className="center pt-5">
              <h1 className="text-primary font-weight-bold"style={{marginLeft:"-200px" }}>Laundry</h1><br/>
              <h1 className="text-primary font-weight-bold"style={{marginLeft:"-220px"}}>Service</h1><br/>
              <p style={{marginLeft:"-220px"}}>Doorstep Wash & Dryclean Service</p>
            </div><br/><br/>
            <div style={{marginLeft:"-250px"}}>
              <p>Don’t Have An Account?</p>
            <button type="submit" className="btn btn-primary"style={{marginLeft:"-90px"}}>Register</button>
            </div>
          </div>
          <div className="col bg-light">
               <h2 className="text-primary pt-5" style={{marginLeft:"-430px"}}>SIGN IN</h2><br/>
               <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="text-primary"style={{marginLeft:"-440px"}}>Phone/Email</label><br/><br/>
                      <input  {...email} type="email" className="form-control"  placeholder="Phone/Email"></input>
                    </div><br/>
                    <div className="form-group">
                      <label className="text-primary"style={{marginLeft:"-460px"}}>Password</label><br/><br/>
                      <input {...password} type="password" className="form-control" placeholder="Password"></input>
                    </div>
                    <a className="text-primary"style={{marginLeft:"380px"}}>Forget Password?</a>
                    <br/>
                    
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
          </div>
        </div>
      </div>
    );
  }
export default LandingPage;