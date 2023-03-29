import React from "react";
import { Link } from "react-router-dom";
import { accountService } from "../users/Authentification/Sessionstorage";
import { useNavigate } from "react-router-dom";

import '../../components/header.css';

const DoctorHeader = () => {
    const navigate = useNavigate();
    const logout = () => {
        accountService.logout();
        navigate('/')
    }

    return (

        <header>
            <nav>
                <ul>
                    <li><Link to="appointments">Planning</Link> </li>
                    <li><Link to="patients">Mes patients</Link> </li>
                    <button onClick={logout}>Déconnexion</button>
                </ul>
            </nav>
        </header>

    );
};

export default DoctorHeader;