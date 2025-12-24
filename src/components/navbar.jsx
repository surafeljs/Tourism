import React from 'react';
import  '../styles/navbar.css'
import navbarlogo from '../../public/images/navbar/navbarlogo.png'
import {Link} from 'react-router-dom'
export const NavBar=()=>{
    return(
        <>
        <nav className="navbar">
            <div className="logo">
                <img src={navbarlogo} alt="logo" width={80}  />
                <h1 >Tourism Ethiopia</h1>
            </div>
            <div className="navlink">
<Link to={'/'} className="link">Home</Link>
<Link to={'/gallery'}className="link">Gallery</Link>
<Link to={'/videos'}className="link">Videos</Link>
<Link to={'/about'}className="link">About</Link>
<Link to={'/signup'}className="link">sign Up</Link>

            </div>
        </nav>
        </>
    )
}