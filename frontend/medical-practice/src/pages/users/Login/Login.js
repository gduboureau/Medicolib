import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { accountService } from '../Authentification/LocalStorage';
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        login: "",
        password: "",
    })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
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


return (
    <div className="login-wrapper">
        <p>Connecter-vous à votre compte</p>
        <form className='form-profile' onSubmit={handleSubmit}>
            <label>
                <p>Email</p>
                <input name="login" type="text" placeholder="Email" onChange={onChange} />
            </label>
            <label>
                <p>Mot de passe</p>
                <input name="password" type="password" placeholder="Password" onChange={onChange} />
            </label>
            <div>
                <button type="submit" className="btn btn-outline-primary" >Se connecter</button>
            </div>
            <div>
                <Link to="/register">Enregistrez-vous</Link>
            </div>
        </form>
    </div>
)
}

export default Login;