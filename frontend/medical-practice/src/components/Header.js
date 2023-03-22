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
                        <li><Link to="/">Accueil</Link> </li>
                        <li><Link to="/login">Se connecter</Link></li>
                    </ul>
                </nav>
            </header>
    
        );
    }else{
        return (
            <header>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link> </li>
                    <li><Link to="/admin/appointments">Mon compte</Link> </li>
                </ul>
            </nav>
        </header>
        );
    }
};

export default Header;