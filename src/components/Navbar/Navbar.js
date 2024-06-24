import React from 'react';
import logo from '../../images/dictionarry-logo-transparent.png'
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar navbar-dark custom-navbar mb-3 navbar-bottom-border">
            <div className="container d-flex justify-content-start align-items-center">
                <a href="https://dictionarry.pages.dev/"
                    className="d-flex align-items-center text-decoration-none navbar-brand-hover">
                    <img src={logo} alt="Logo" width="50" height="50" className="d-inline-block align-top mr-3" />
                    <h2 className="mb-0 ms-3 text-white">Dictionarry</h2>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;