import React from "react";
import { Link } from "react-router-dom";
import { accountService } from "../users/Authentification/LocalStorage";
import { useNavigate } from "react-router-dom";

import './header.css';

const AHeader = () => {
    const navigate = useNavigate();
    const logout = () => {
        accountService.logout();
        navigate('/')
    }

    return (

        <header>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="appointments">Mes rendez-vous</Link> </li>
                    <li><Link to="edit">Mon compte</Link></li>
                    <button onClick={logout}>Déconnexion</button>
                </ul>
            </nav>
        </header>

    );
};

export default AHeader;