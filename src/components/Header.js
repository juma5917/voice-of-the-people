// By Juma Samwel
import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
    return (
        <nav className="header">
            <ul>
                <li><Link to="/home">Home</Link></li> 
                <li><Link to="/feedback">Feedback</Link></li> 
                <li><Link to="/login">Admin Dashboard</Link></li>
            </ul>
        </nav>
    );
};

export default Header;