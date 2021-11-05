import './landing-page.css'
import React from 'react';
import { BrowserRouter as Router ,Switch, Route, Link,useHistory } from "react-router-dom";
function LandingPage() {
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
               <form>
                    <div className="form-group">
                      <label className="text-primary"style={{marginLeft:"-440px"}}>Phone/Email</label><br/><br/>
                      <input type="email" className="form-control"  placeholder="Phone/Email"></input>
                    </div><br/>
                    <div className="form-group">
                      <label className="text-primary"style={{marginLeft:"-460px"}}>Password</label><br/><br/>
                      <input type="password" className="form-control" placeholder="Password"></input>
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