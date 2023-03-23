import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { accountService } from '../Authentification/LocalStorage';
import { Link } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

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
        console.log(mailConfirmation.mail)
        e.preventDefault();
        axios.post("/new-password", mailConfirmation)
          .then(res => {
            console.log(res)
          })
        .catch(error => console.log(error))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/login", credentials)
          .then(res => {
            accountService.saveToken(res.data)
            accountService.saveEmail(credentials.login)
            navigate('/admin/appointments')
        })
        .catch(error => console.log(error))
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
        <form className='form-profile'>
            <label>
                <p>Email</p>
                <input name="login" type="text" placeholder="Email" onChange={onChange}/>
            </label>
            <label>
                <p>Mot de passe</p>
                <input name="password" type="password" placeholder="Password" onChange={onChange}/>
            </label>
            <div>
                <button onClick={handleSubmit} className="btn btn-outline-primary" >Se connecter</button>
            </div>
            <div>
                <button onClick={handleButtonChange} className="forget-password" >Mot de passe oublié ? </button>
            </div>
            {showForgotPassword ?(
                <>
                <div>
                    Adresse du mot de passe oublié<input name ="mail" type="text" onChange={newPassword} required/>
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
                <Link to="/register">Enregistrez-vous</Link>
            </div>
        </form>
    </div>
)
}

export default Login;