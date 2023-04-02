import React, { useState } from 'react';
import axios from 'axios';
import { accountService } from '../Authentification/Sessionstorage';
import { Link, useNavigate, useLocation } from "react-router-dom";

import './assets/login.css'

const Login = () => {
    const navigate = useNavigate();

    const { state } = useLocation();

    const [errorMessage, setErrorMessage] = useState("");

    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const [mailConfirmation, setMailConfirmation] = useState({
        mail: "",
    })


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
                    navigate(state?.prev);
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
            <p>Connecter-vous à votre compte</p>
            <form className='form-profile login-form'>
                <label>
                    <p>Email</p>
                    <input name="login" type="text" placeholder="Email" onChange={onChange} />
                </label>
                <label>
                    <p>Mot de passe</p>
                    <input name="password" type="password" placeholder="Password" onChange={onChange} />
                </label>
                {errorMessage && <p>{errorMessage}</p>}
                <div>
                    <button onClick={handleSubmit} className="btn btn-outline-primary" >Se connecter</button>
                </div>
                <div>
                    <button onClick={handleButtonChange} className="forget-password" >Mot de passe oublié ? </button>
                </div>
                {showForgotPassword ? (
                    <>
                        <div>
                            Adresse du mot de passe oublié<input name="mail" type="text" onChange={newPassword} required />
                        </div>
                        <div>
                            <button onClick={sendNewPassword} className="btn modif-info">Envoyer le nouveau mot de passe</button>
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )}
                <div>
                </div>
            </form>
        </div>
    )
}

export default Login;