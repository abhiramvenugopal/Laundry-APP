import React, { useEffect, useState } from 'react';
import { Dropdown} from 'react-bootstrap';
import './nav.css'
import icon from '../../assets/img/usericon.png'

function Nav() {
    const [signedin,setSignedin]=useState(false)
    const [active,setActive]=useState(false)
    useEffect(()=>{
        const token=window.localStorage.getItem('Token')
        console.log('token',token) 
        if(token){
            setSignedin(true)
        }
        else{
            setSignedin(false)
        }
    },[])
    const handleActive=()=>{
        if (active){
            setActive(false)
        }
        else{
            setActive(true)
        }
    }
    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      
      // Close the dropdown menu if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }
    return (
        <div className="body">
          <div className="topnav">
            
            <i onClick={handleActive} style={{float:"right"}} className="fa fa-bars fa-2x icon "></i>
            <div className={(!active?"navcontent":"toggle")}>
                <p className="caption" ><b>Laundry</b></p>
                <a className={(signedin?"hidecomponent":"")}  href="#home">Sign-In</a>
                <a className={(signedin?"active ":"hidecomponent")}><img src={icon} className="icons"></img><button onClick={myFunction} className="dropbtn"> user-name</button>
                    <div id="myDropdown" className="dropdown-content">
                        <a href="/">signout</a>
                    </div>                       
                </a>
                <a href="#news">Career</a>
                <a href="#contact">Pricing</a>
                <a className={(signedin?"":"active")} href="#about">Home</a>
                
            </div>
</div>
        </div>
    );
  }
  
export default Nav;