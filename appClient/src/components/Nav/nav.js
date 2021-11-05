import './nav.css'
import React from 'react';
function nav() {
    return (
        <nav className="navbar navbar-expand-md bg-white pt-3">
            <div className="container-fluid">
                <h2 className="text-primary" style={{marginLeft:"120px",font:"caption"}}>LAUNDRY</h2>
                <div className="navbar-nav right" >
                    <a className="nav-link"  href="#">Home</a>
                    <a className="nav-link" href="#">Pricing</a>
                    <a className="nav-link " href="#">Career</a>
                    <a className="nav-link " href="#">Sign in</a>
                </div>
             </div>
        </nav>
    );
  }
  
export default nav;