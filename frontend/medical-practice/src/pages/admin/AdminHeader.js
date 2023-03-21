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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="appointments">Appointments</Link> </li>
                    <li><Link to="edit">Account</Link></li>
                    <button onClick={logout}>Log out</button>
                </ul>
            </nav>
        </header>

    );
};

export default AHeader;