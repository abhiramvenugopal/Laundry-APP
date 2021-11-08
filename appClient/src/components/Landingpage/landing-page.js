import './landing-page.css'
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router ,Switch, Route, Link,useHistory } from "react-router-dom";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer"
import Register from "../Register/register";
const axios = require('axios');

function LandingPage() {
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
            console.log('hel',response.data.token)
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
        <div>
            <header className="header-section">
              <Nav/>
            </header>
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

                      </div>
                          
                        
                    </form>
                  </div>

                </div>
                

              </div>

            </div>}
            {(!login) && <Register changeParentval={()=>{setLogin(true)}} />}
            <footer className="footer-section">
                <Footer/>
            </footer>

        </div>

      // <div className="container">
      //   <div className="row">
      //     <div className="col bg-white-light">
      //       <div className="center pt-5">
      //         <h1 className="text-primary font-weight-bold"style={{marginLeft:"-200px" }}>Laundry</h1><br/>
      //         <h1 className="text-primary font-weight-bold"style={{marginLeft:"-220px"}}>Service</h1><br/>
      //         <p style={{marginLeft:"-220px"}}>Doorstep Wash & Dryclean Service</p>
      //       </div><br/><br/>
      //       <div style={{marginLeft:"-250px"}}>
      //         <p>Don’t Have An Account?</p>
      //       <button type="submit" className="btn btn-primary"style={{marginLeft:"-90px"}}>Register</button>
      //       </div>
      //     </div>
      //     <div className="col bg-light">
      //          <h2 className="text-primary pt-5" style={{marginLeft:"-430px"}}>SIGN IN</h2><br/>
      //          <form onSubmit={handleSubmit}>
      //               <div className="form-group">
      //                 <label className="text-primary"style={{marginLeft:"-440px"}}>Phone/Email</label><br/><br/>
      //                 <input  {...email} type="email" className="form-control"  placeholder="Phone/Email"></input>
      //               </div><br/>
      //               <div className="form-group">
      //                 <label className="text-primary"style={{marginLeft:"-460px"}}>Password</label><br/><br/>
      //                 <input {...password} type="password" className="form-control" placeholder="Password"></input>
      //               </div>
      //               <a className="text-primary"style={{marginLeft:"380px"}}>Forget Password?</a>
      //               <br/>
                    
      //               <button type="submit" className="btn btn-primary">Sign in</button>
      //           </form>
      //     </div>
      //   </div>
      // </div>
    );
  }
export default LandingPage;