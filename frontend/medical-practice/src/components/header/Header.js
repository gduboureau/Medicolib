import React from "react";
import axios from "axios";
import { Link,useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { accountService } from "../../pages/users/Authentification/Sessionstorage";


import './assets/header.css';
import Logo from './assets/logo.jpg';
import Profil from './assets/profil.png';
import Logout from './assets/logout.png';
import Arrow from './assets/arrow.png';


const Header = () => {

    const location = useLocation();

    let mail = {mail : accountService.getEmail()};
    
    const [data, setData] = useState({
        firstName:"",
        lastName: ""
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        axios.post("/informations-patient", mail)
            .then((response) => {
            const newData = response.data;
            setData({
                firstName: newData[1],
                lastName: newData[2],
                });
                setIsLoading(false);
            })
            .catch((error) => {
            console.log(error);
            });
    });
    

    const logout = () => {
        accountService.logout();
    }

    const toggleMenu = () => {
        let accountMenu = document.getElementById("accountMenu")
        let arrowMenu = document.getElementById("arrowMenu")
        accountMenu.classList.toggle("openmenu");
        arrowMenu.classList.toggle("openmenu");
    }
        
    if (!accountService.isLogged()){
        return (
            <header>
                <nav>
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="logo"/> {/*https://www.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_18246203.htm#query=medical%20logo&position=7&from_view=keyword&track=ais%22%3EImage */}
                    </Link>
                    <ul>
                        <li>
                            <Link to={"/login"} state={{ prev: location.pathname }} className="Login">
                                Se connecter
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }else{
        if(!isLoading){
            return (
                <header>
                <nav>
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="logo"/> {/*https://www.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_18246203.htm#query=medical%20logo&position=7&from_view=keyword&track=ais%22%3EImage */}
                    </Link>
                    <ul>
                        <li><a href="/patient/appointments">Mes rendez-vous</a></li>
                        <li><a href="/patient/documents">Mes documents</a></li>
                        <li>
                            <a className="account" onClick={toggleMenu}>
                                {data.firstName} {data.lastName}
                                <img id="arrowMenu" src={Arrow} alt="Arrow"/>
                            </a>
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
            </header>
            );
        }
    }
};

export default Header;