import React from "react";
import { Link } from "react-router-dom";

import './header.css';

const Header = () => {
    return (

        <header>
            <nav>
                <ul>
                    <li><Link to="/"> Home</Link> </li>
                    <li><Link to="/register">Sign Up</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                </ul>
            </nav>
        </header>

    );
};

export default Header;