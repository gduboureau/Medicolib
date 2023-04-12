import React, { useState } from 'react';
import axios from 'axios';
import { accountService } from '../Authentification/Sessionstorage';
import { Link, useNavigate, useLocation } from "react-router-dom";

import Show from "../Registers/assets/show.png"
import Hide from "../Registers/assets/hide.png"


import './assets/login.css'

const Login = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const [errorMessage, setErrorMessage] = useState("");

    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const [mailConfirmation, setMailConfirmation] = useState({
        mail: "",
    })

    const [showPassword, setShowPassword] = useState(false);
    const [eyeIcon, setEyeIcon] = useState(Hide);

    function togglePassword() {
        setShowPassword(!showPassword);
        setEyeIcon(showPassword ? Hide : Show);
    }


    const [credentials, setCredentials] = useState({
        login: "",
        password: "",
    })


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const newPassword = (e) => {
        setMailConfirmation({ ...mailConfirmation, [e.target.name]: e.target.value });
    }

    const sendNewPassword = (e) => {
        e.preventDefault();
        axios.post("/new-password", mailConfirmation)
            .then(res => {
            })
            .catch(error => console.log(error))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/login", credentials)
            .then(res => {
                accountService.saveToken(res.data[0])
                accountService.saveEmail(credentials.login)
                accountService.saveUserType(res.data[1])
                if (res.data[1] === 'patient') {
                    navigate(location.state?.prevS + location.state?.prevA);
                    window.location.reload();
                }
                else {
                    navigate('/doctor/appointments')
                }
            })
            .catch(error => {
                console.log(error.response.data)
                setErrorMessage(error.response.data);
            })
    }

    const handleButtonChange = (e) => {
        e.preventDefault();
        if (showForgotPassword === false) {
            setShowForgotPassword(true);
        } else {
            setShowForgotPassword(false);
        }
    };


    return (
        <div className="login-wrapper">
            <p>Connectez-vous à votre compte</p>
            <form className="form-profile">
                <label>
                    <p>Email</p>
                    <span>
                        <input name="login" type="text" placeholder="Votre adresse email" onChange={onChange} />
                    </span>
                </label>
                <label>
                    <p>Mot de passe</p>
                    <span>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Votre mot de passe"
                            onChange={onChange}
                        />
                        <img src={eyeIcon} alt="eye-icon" onClick={togglePassword} />
                    </span>
                </label>
                {errorMessage && <p style={{ fontSize: "14px", color: "red", marginBottom: "20px" }}>{errorMessage}</p>}
                <div>
                    <button onClick={handleSubmit} className="btn btn-outline-primary" >Se connecter</button>
                </div>
                <div>
                    <button onClick={handleButtonChange} className="forget-password" >Mot de passe oublié ? </button>
                </div>
                {showForgotPassword ? (
                    <>
                        <label> <p style={{ marginTop: "20px" }}>Adresse du mot de passe oublié</p>
                            <span>
                                <input name="mail" type="mail" placeholder="Votre adresse email" onChange={newPassword} required />
                            </span>
                        </label>
                        <div>
                            <button onClick={sendNewPassword} className="btn modif-info" style={{ marginBottom: "20px" }}>Envoyer le nouveau mot de passe</button>
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )}
                <div className='link'>
                    <p>Nouveau sur Medicolib ? <Link to="/register">Enregistrez-vous </Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login;