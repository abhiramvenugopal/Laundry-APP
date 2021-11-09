import './landing-page.css'
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router ,Switch, Route, Link,useHistory } from "react-router-dom";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer"
import Register from "../Register/register";
const axios = require('axios');

function LandingPage() {
  const [loginFailed, setLoginFailed] = useState(false)
  const [wentWrong, setWentWrong] = useState(false)
  useEffect(()=>{
    console.log('hello')
    window.localStorage.removeItem('Token')
  },[])
  const [login, setLogin] = useState(true);
  
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
            window.localStorage.setItem("User",JSON.stringify(response.data.user))
            console.log(response.data.token)
            historyobj.push("/create")
        })
        .catch(function (error) {
          setLoginFailed(true)
        })
    } catch (error) {
      setWentWrong(true)
        
    }
  }
    return (
        <div className="landing-page-container">
            <header className="header-section">
              <Nav/>
            </header>
            { wentWrong && <div class="alert alert-warning alert-dismissable">
              <button  class="close" data-dismiss="alert" aria-label="close">×</button>
              <strong>Something went wrong!</strong>
            </div>}
            {login &&
            <div className="row">
              <div className="col-md-6 left-section">
                    <div className="register-left-heading">
                      <div className="laundry-service-heading">
                        <span>Laundry</span>
                        <span>Service</span>
                      </div>
                      <div className="left-sub-heading">
                        <span>Doorstep Wash &</span>
                        <span>Dryclean Service</span>
                      </div>
                    </div>
                    <div className="signin-button-container">
                      <div  className="signin-button-div">
                        <span>Don’t Have An Account?</span>
                        <div className="btn-div">
                          <button onClick={()=>{setLogin(false)}} className="btn signin-btn">Register</button>
                        </div>
                      </div>
                    </div>
                    
              </div>

              
              <div className="col-md-6 right-section ">
                <div className="login-container">
                  <div className="register-form-heading">
                    <span>SIGN IN</span>
                  </div>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="signin-form">
                          <div className="col-md-12 form-group set-flex-start input-div-margin">
                            <input {...email} type="text" className="form-control custom-form-input input-full-width"  placeholder="Name/Email"/>
                          </div>
                          <div className=" col-md-12 form-group set-flex-start input-div-margin">
                            <input {...password}  type="password" className="form-control custom-form-input input-full-width"  placeholder="Password"/>
                          </div>
                          <div className="sigin-btn-div">
                            <button  className="register-btn " type="submit">Sign In</button>
                          </div>
                          {loginFailed && <div class="alert alert-danger m-3" role="alert">
                          Wrong credentials Invalid username or password
                          </div>}
                          
                      </div>
                          
                        
                    </form>
                  </div>

                </div>
                

              </div>

            </div>}
            {(!login) && <Register changeParentval={()=>{setLogin(true)}} />}
            <div className="promo-section">
                <div className="center">
                    <hr className="hr-promo" />
                    <h3>Now Refer & Earn ₹500 for every referral*</h3>
                    <p>* Terms and conditions will be applied</p>
                </div>
            </div>
            <footer>
              <Footer/>

            </footer>
        </div>

      
    );
  }
export default LandingPage;