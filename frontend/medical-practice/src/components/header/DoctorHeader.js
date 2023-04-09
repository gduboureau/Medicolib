import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { accountService } from "../../pages/users/Authentification/Sessionstorage";
import { useMemo } from "react";

import './assets/doctorHeader.css';
import Logo from './assets/logo.png';
import Profil from './assets/profil.png';
import Planning from './assets/appointment.png';
import Patients from './assets/patients.png';
import Logout from './assets/logout.png';
import Arrow from './assets/arrow.png';

const DoctorHeader = () => {

    const mail = useMemo(() => ({mail: accountService.getEmail()}), []); // Crée une référence unique à mail
    
    const [data, setData] = useState({
        firstName:"",
        lastName: "",
        speciality:""
    });

    useEffect(() =>{
        axios.post("/informations-doctor", mail)
            .then((response) => {
            const newData = response.data;
            setData({
                firstName: newData[1],
                lastName: newData[2],
                speciality: newData[4]
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
            {data.firstName && data.lastName && data.speciality ? (
                <nav className="doctor-nav">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="logo-doctor" />
                    </Link>
                    <ul>
                        <li className="header-li-largescale">
                            <a href="/doctor/appointments">Planning</a>
                        </li>
                        <li className="header-li-largescale">
                            <a href="/doctor/patients">Mes patients</a>
                        </li>
                        <li>
                            <button className="account" onClick={toggleMenu}>
                                <span className="name">{data.firstName} {data.lastName}</span>
                                <img id="arrowMenu" src={Arrow} alt="Arrow" />
                                <br />
                                <span className="speciality">({data.speciality})</span>
                            </button>
                        </li>
                    </ul>
                    <div className="accountmenu-wrap" id="accountMenu">
                        <div className="accountmenu">
                            <a href="/doctor/edit" className="accountmenu-component">
                                <img src={Profil} alt="Profil" />
                                <p>Mon compte</p>
                            </a>
                            <hr />
                            <div className="header-reported-li-largescale">
                                <a href="/doctor/appointments" className="accountmenu-component">
                                    <img src={Planning} alt="Planning" />
                                    <p>Planning</p>
                                </a>
                                <hr />
                                <a href="/doctor/patients" className="accountmenu-component">
                                    <img src={Patients} alt="Patients" />
                                    <p>Mes patients</p>
                                </a>
                                <hr />
                            </div>
                            <a href="/" className="accountmenu-component" onClick={logout}>
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

export default DoctorHeader;