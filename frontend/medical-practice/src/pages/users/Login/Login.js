import React, { useContext, useState } from 'react';
import Auth from '../Authentification/Auth';
import { login } from '../Authentification/AuthApi';
/*//import './Login.css';*/



const Login = ({history}) => {
    const {isAuthenticated, setIsAuthenticated } = useContext(Auth);

    const[user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleChange = ({currentTarget}) => {
        const { name, value } = currentTarget;

        setUser({...user, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await login(user);
            setIsAuthenticated(response);
            history.replace('/login');
        } catch ({response}) {
            console.log(response);
            
        }
    }

    const useInsertionEffect = (() => {
        if(isAuthenticated){
            history.replace('/login');
        }
    }, [history, isAuthenticated]);

    return(
        <div className="login-wrapper">
        <h1>BIENVENUE</h1>
        <p>Connecter-vous à votre compte</p>
        <form className='form-profile' onSubmit={handleSubmit}>
            <label>
                <p>Email</p>
                <input type="text" placeholder="Email" required onChange={handleChange}/>
            </label>
            <label>
                <p>Mot de passe</p>
                <input type="password" placeholder="Password" required onChange={handleChange}/>
            </label>
                <div>
                    <button type="submit" className="btn btn-outline-primary" >Se connecter</button>
                </div>
        </form>
        </div>
    )
}

export default Login;
