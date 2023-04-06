import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { accountService } from "../../pages/users/Authentification/Sessionstorage";
import { useMemo } from "react";

import './assets/patientHeader.css';
import Logo from './assets/logo.png';
import Profil from './assets/profil.png';
import Appointment from './assets/appointment.png';
import Documents from './assets/documents.png';
import Logout from './assets/logout.png';
import Arrow from './assets/arrow.png';


const PatientHeader = () => {

    const mail = useMemo(() => ({mail: accountService.getEmail()}), []); // Crée une référence unique à mail
    
    const [data, setData] = useState({
        firstName:"",
        lastName: ""
    });

    useEffect(() =>{
        axios.post("/informations-patient", mail)
            .then((response) => {
            const newData = response.data;
            setData({
                firstName: newData[1],
                lastName: newData[2],
                });
            })
            .catch((error) => {
            console.log(error);
            });
    }, [mail]);
    

    const logout = () => {
        accountService.logout();
    }

    const toggleMenu = () => {
        let accountMenu = document.getElementById("accountMenu")
        let arrowMenu = document.getElementById("arrowMenu")
        accountMenu.classList.toggle("openmenu");
        arrowMenu.classList.toggle("openmenu");
    }

    return (
        <header>
            {data.firstName && data.lastName ? (
                <nav class="patient-nav">
                    <Link to="/">
                        <img src={Logo} alt="Logo" class="logo-patient" />
                    </Link>
                    <ul>
                        <li class="header-li-largescale"><a href="/patient/appointments">Mes rendez-vous</a></li>
                        <li class="header-li-largescale"><a href="/patient/documents">Mes documents</a></li>
                        <li>
                            <button class="account" onClick={toggleMenu}>
                                {data.firstName} {data.lastName}
                                <img id="arrowMenu" src={Arrow} alt="Arrow" />
                            </button>
                        </li>
                    </ul>
                    <div class="accountmenu-wrap" id="accountMenu">
                        <div class="accountmenu">
                            <a href="/patient/edit" class="accountmenu-component">
                                <img src={Profil} alt="Profil" />
                                <p>Mon compte</p>
                            </a>
                            <hr />
                            <div class="header-reported-li-largescale">
                                <a href="/patient/appointments" class="accountmenu-component">
                                    <img src={Appointment} alt="Appointment" />
                                    <p>Mes rendez-vous</p>
                                </a>
                                <hr />
                                <a href="/patient/documents" class="accountmenu-component">
                                    <img src={Documents} alt="Documents" />
                                    <p>Mes documents</p>
                                </a>
                                <hr />
                            </div>
                            <a href="/" class="accountmenu-component" onClick={logout}>
                                <img src={Logout} alt="Logout" />
                                <p>Déconnexion</p>
                            </a>
                        </div>
                    </div>
                </nav>
            ) : null}
        </header>
    );
}

export default PatientHeader;