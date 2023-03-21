import React from "react";
import { Link } from "react-router-dom";

import './header.css';
import { accountService } from "../pages/users/Authentification/LocalStorage";

const Header = () => {

    if (!accountService.isLogged()){
        return (
            <header>
                <nav>
                    <ul>
                        <li><Link to="/"> Home</Link> </li>
                        <li><Link to="/login">Log In</Link></li>
                    </ul>
                </nav>
            </header>
    
        );
    }else{
        return (
            <header>
            <nav>
                <ul>
                    <li><Link to="/"> Home</Link> </li>
                    <li><Link to="/admin/appointments"> Mon compte</Link> </li>
                </ul>
            </nav>
        </header>
        );
    }
};

export default Header;