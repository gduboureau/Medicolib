import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { accountService } from "../../pages/users/Authentification/Sessionstorage";
import { useMemo } from "react";

import './assets/doctorHeader.css';
import Logo from './assets/logo.png';
import Profil from './assets/profil.png';
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
                <img src={Logo} alt="Logo" className="logo-doctor"/> {/*https://www.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_18246203.htm#query=medical%20logo&position=7&from_view=keyword&track=ais%22%3EImage */}
            </Link>
            <ul>
                <li><button href="/doctor/appointments">Planning</button></li>
                <li><button href="/doctor/patients">Mes patients</button></li>
                <li>
                    <button className="account" onClick={toggleMenu}>
                        <span className="name">{data.firstName} {data.lastName}</span>
                        <img id="arrowMenu" src={Arrow} alt="Arrow"/> 
                        <br></br>
                        <span className="speciality">({data.speciality})</span>
                                               
                    </button>
                </li>
            </ul>
            <div className="accountmenu-wrap-doctor" id="accountMenu">
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

export default DoctorHeader;