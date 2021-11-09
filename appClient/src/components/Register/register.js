import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { useHistory } from 'react-router';
import './register.css'
import Nav from "../Nav/nav";
import Footer from "../Footer/footer"
function Register(props)
{
    const [name,setName]=useState("");
    const [phone,setPhone]=useState("");
    const [district,setDistrict]=useState("");
    const [pincode,setPincode]=useState("");
    const [email,setEmail]=useState("");
    const [state,setState]=useState("");
    const [password,setPassword]=useState("");
    const [streetAddress,setStreetAddress]=useState("");
    const [locked,setLocked]=useState(true)
    const history=useHistory();

  async function signUP(event){
      event.preventDefault()
      let address=[{streetAddress,state,district,pincode}]
      let item={name,phone,email,address,password}
      console.log(item)

      let result= await fetch("http://localhost:3005/api/v1/user/register",{
      method:'POST',
      body:JSON.stringify(item),
      headers:{
        "content-Type":"application/json"
        }
      })
      result= await result.json()
      console.log("result:", result)
      props.changeParentval()
    }
    const handlePasswordFeild=()=>{
      if (locked){
        setLocked(false)
        document.querySelector("#passwordfeild").type="text"
      }
      else{
        setLocked(true)
        document.querySelector("#passwordfeild").type="password"
      }
    }
    return(
        <div>
            <div className="row">
              <div className="col-md-3 left-section">
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
                        <span>Already Have Account</span>
                        <div className="btn-div">
                          <button onClick={()=>{props.changeParentval()}} className="btn signin-btn">Sign In</button>
                        </div>
                      </div>
                    </div>
                    
              </div>

              
              <div className="col-md-9 right-section">
                <div className="register-form-heading">
                  <span>REGISTER</span>
                </div>
                <div>
                  <form>
                    <div className="row custom-row-style">
                          <div className="col-md-6 form-group set-flex-start">
                            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control custom-form-input"  placeholder="Name"/>
                          </div>
                          <div className=" col-md-6 form-group set-flex-start">
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control custom-form-input"  placeholder="Email"/>
                          </div>
                    </div>
                    <div className="row custom-row-style">
                          <div className="col-md-6 form-group set-flex-start">
                            <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control custom-form-input"  placeholder="Phone"/>
                          </div>
                          <div value={state} onChange={(e)=>setState(e.target.value)} className=" col-md-6 form-group set-flex-start custom-select">
                            <select class="form-select form-select-lg mb-3 custom-form-input w-100" aria-label=".form-select-lg example">
                              <option selected>State</option>
                              <option value="Kerala">Kerala</option>
                              <option value="Tamilnadu">Tamilnadu</option>
                              <option value="Karnataka">Karnataka</option>
                              <option value="Andhra Pradesh">Andhra Pradesh</option>
                            </select>
                          </div>
                    </div>
                    <div className="row custom-row-style">
                          <div className=" col-md-6 form-group set-flex-start custom-select">
                            <select value={district} onChange={(e)=>setDistrict(e.target.value)}  class="form-select form-select-lg mb-3 custom-form-input w-100" aria-label=".form-select-lg example">
                              <option selected>District</option>
                              <option value="Thrissur">Thrissur</option>
                              <option value="Visakhapatnam">Visakhapatnam</option>
                              <option value="Bengaluru">Bengaluru </option>
                              <option value="Chennai">Chennai</option>
                              <option value="Coimbatore">Coimbatore</option>
                            </select>
                          </div>
                          <div className=" col-md-6 form-group set-flex-start">
                            <input value={streetAddress} onChange={(e)=>setStreetAddress(e.target.value)} type="text" className="form-control custom-form-input"  placeholder="Address"/>
                          </div>
                    </div>
                    <div className="row custom-row-style">
                          <div className="col-md-6 form-group set-flex-start">
                            <input value={pincode} onChange={(e)=>setPincode(e.target.value)} type="number" className="form-control custom-form-input"  placeholder="Pincode"/>
                          </div>
                          <div className="col-md-6 form-group set-flex-start">
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} id="passwordfeild" type="password" className="form-control custom-form-input"  placeholder="Password"/>
                            <span style={{fontSize:"24px",color:"grey",display:"flex",position:"absolute",right:"2rem",top:'0.5rem',justifyContent:"right",}} onClick={handlePasswordFeild} className={(locked?"fa fa-lock":"fa fa-unlock")} ></span>
                          </div>
                    </div>
                    <div className="reg-btn-chk">
                      <div className="form-check mb-4">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
                        <label className="form-check-label" for="flexCheckIndeterminate">
                        I agree to Terms & Condition receiving marketing and promotional materials
                        </label>
                      </div>
                      <div>
                        <button onClick={(event)=>{signUP(event)}} className="register-btn " type="submit">Register</button>
                      </div>

                    </div>
                    
                      
                  </form>
                </div>

              </div>

            </div>
      
        </div>
    )
}
export default Register