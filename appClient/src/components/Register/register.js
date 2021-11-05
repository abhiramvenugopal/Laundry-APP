import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { useHistory } from 'react-router';
import './register.css'
function Register()
{
    const [name,setName]=useState("");
    const [phone,setPhone]=useState("");
    const [district,setDistrict]=useState("");
    const [pincode,setPincode]=useState("");
    const [email,setEmail]=useState("");
    const [state,setState]=useState("");
    const [password,setPassword]=useState("");
    const [streetAddress,setStreetAddress]=useState("");
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
      history.push()
    }
    return(
        <div className="container">
        <div className="row">
            <div className="col-3 bg-white">
            <div className="center pt-5">
              <h1 className="text-primary font-weight-bold"style={{marginLeft:"-200px" }}>Laundry</h1><br/>
              <h1 className="text-primary font-weight-bold"style={{marginLeft:"-220px"}}>Service</h1><br/>
              <p style={{marginLeft:"-225px"}}>Doorstep Wash &</p>
              <p style={{marginLeft:"-235px"}}>Dryclean Service</p>
            </div><br/><br/>
            <div style={{marginLeft:"-250px"}}>
              <p>Already Have Account</p>
            <button type="submit" className="btn btn-primary"style={{marginLeft:"-80px"}}>Sign IN</button>
            </div>
            </div>
            <div className="col-9 bg-light">
            <h2 className="text-primary pt-1" style={{marginLeft:"-680px"}}>REGISTER</h2><br/>
            <form>
                <div className="row">
                    <div className="col">
                      <label className="text-primary"style={{marginLeft:"-350px"}}>Name</label><br/>
                      <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control"  placeholder=""></input>

                      <label className="text-primary"style={{marginLeft:"-350px"}}>Phone</label><br/>
                      <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control"  placeholder=""></input>

                      <label className="text-primary"style={{marginLeft:"-350px"}}>District</label><br/>
                      <input type="text"value={district} onChange={(e)=>setDistrict(e.target.value)} className="form-control"  placeholder=""></input>

                      <label className="text-primary"style={{marginLeft:"-350px"}}>Pincode</label><br/>
                      <input type="text"value={pincode} onChange={(e)=>setPincode(e.target.value)} className="form-control"  placeholder=""></input>
                    </div><br/>

                    <div className="col">
                      <label className="text-primary"style={{marginLeft:"-350px"}}>Email</label><br/>
                      <input type="text"value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control"  placeholder=""></input>

                      <label className="text-primary"style={{marginLeft:"-350px"}}>State</label><br/>
                      <input type="text"value={state} onChange={(e)=>setState(e.target.value)} className="form-control"  placeholder=""></input>

                      <label className="text-primary"style={{marginLeft:"-330px"}}>Address</label><br/>
                      <input type="text"value={streetAddress} onChange={(e)=>setStreetAddress(e.target.value)} className="form-control"  placeholder=""></input>

                      <label className="text-primary"style={{marginLeft:"-330px"}}>Password</label><br/>
                      <input type="Password"value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control"  placeholder=""></input>
                    </div>
                </div><br/>
                <input type="checkbox" />
                <label>I agree to Terms & Condition receiving marketing and promotional materials</label><br/>
                <button onClick={(event)=>{signUP(event)}} className="btn btn-primary">Submit</button>
            </form>
            </div>
            </div>
        </div>
    )
}
export default Register