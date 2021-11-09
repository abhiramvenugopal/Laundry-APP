import './footer.css'
import React from 'react';
import facebook from "../../assets/img/facebook.svg";
import instagram from "../../assets/img/instagram.svg";
import linkedin from "../../assets/img/linkedin.svg";
function Footer(){
    return(
        <div className="footer" >
            <div className="mt-5 mb-5 row">
                <div className="col-md-4 about-us-section">
                    <span className="custom-span-lg mt-2">ABOUT US</span>
                    <span className="mt-2">Doorstep Wash & Dryclean Service</span>

                </div>
                <div className="col-md-1 custom-col">
                    <span className="custom-span-md mt-2">Home</span>
                    <span className="mt-2">Sign In</span>
                    <span className="mt-2">Register</span>

                </div>
                <div className="col-md-1 custom-col">
                    <span className="custom-span-md mt-2">Pricing</span>

                </div>
                <div className="col-md-1 custom-col">
                    <span className="custom-span-md mt-2">Career</span>
                    <span className="mt-2">Blogs</span>
                    <span className="mt-2">Create</span>

                </div>
                <div className="col-md-1 custom-col">
                    <span className="custom-span-md mt-2">Contact</span>

                </div>
                <div className="col-md-4 about-us-section">
                    <span className="custom-span-lg mt-2">SOCIAL MEDIA</span>
                    <div className="row mt-2">
                        <img className="pl-3" src={facebook} alt="error" />
                        <img className="pl-3" src={instagram} alt="error" />
                        <img className="pl-3" src={linkedin} alt="error" />

                    </div>
                </div>
            </div>

        </div>
    )
}
export default Footer