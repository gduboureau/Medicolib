import React from "react";
import { Link,useLocation } from "react-router-dom";


import './header.css';
import { accountService } from "../pages/users/Authentification/LocalStorage";

const Header = () => {

    const location = useLocation();

    if (!accountService.isLogged()){
        return (
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Accueil</Link> </li>
                        <li><Link to={"/login"} state={{ prev: location.pathname }}>Se connecter</Link></li>
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