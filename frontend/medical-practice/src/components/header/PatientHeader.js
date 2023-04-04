import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { accountService } from "../../pages/users/Authentification/Sessionstorage";
import { useMemo } from "react";

import './assets/patientHeader.css';
import Logo from './assets/logo.png';
import Profil from './assets/profil.png';
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
        <nav className="patient-nav">
            <Link to="/">
                <img src={Logo} alt="Logo" className="logo-patient"/> {/*https://www.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_18246203.htm#query=medical%20logo&position=7&from_view=keyword&track=ais%22%3EImage */}
            </Link>
            <ul>
                <li><a href="/patient/appointments">Mes rendez-vous</a></li>
                <li><a href="/patient/documents">Mes documents</a></li>
                <li>
                    <button className="account" onClick={toggleMenu}>
                        {data.firstName} {data.lastName}
                        <img id="arrowMenu" src={Arrow} alt="Arrow"/>
                    </button>
                </li>
            </ul>
            <div className="accountmenu-wrap" id="accountMenu">
                <div className="accountmenu">
                    <a href="/patient/edit" className="accountmenu-component">
                        <img src={Profil} alt="Profil"/>
                        <p>Mon compte</p>
                    </a>
                    <hr></hr>
                    <a href="/" className="accountmenu-component" onClick={logout}>
                        <img src={Logout} alt="Logout"/>
                        <p>Déconnexion</p>
                    </a>
                </div>
            </div>
        </nav>
        ): null}
    </header>
    );
}

export default PatientHeader;