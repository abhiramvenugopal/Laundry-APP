import './nav.css'
import activehome from "../../assets/img/trousers.jpg"
import React from 'react';
function Nav() {
    return (
        <nav className="navbar navbar-expand {-sm|-md|-lg|-xl|-xxl} bg-white custom-nav">
            <div className="container-fluid">
                <h2 className="text"><b>LAUNDRY</b></h2>
                <div className="navbar-nav right" >
                    <a  className="nav-link"  href="">Home</a>
                    <a className="nav-link" href="#">Pricing</a>
                    <a className="nav-link " href="#">Career</a>
                    <a className="nav-link " href="/">Sign in</a>
                    <div className="userdetails"><img className="userIcon" src={activehome} alt="..name" width='40' height='40' style={{"borderRadius":"50%",}}/> User name</div>
                </div>
             </div>
        </nav>
    );
  }
  
export default Nav;