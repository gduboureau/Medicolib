import React, { useState } from "react";
//import SubmitFormButton from "./SubmitFormButton";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const Register = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    gender:"",
    date: "",
    mail: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password === confirmPassword){
      axios.post("/register", data)
      .then((response) => {
        console.log(response);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      })
    }else{
      const errorMessage = document.createElement("p");
      errorMessage.innerHTML = "Les deux mots de passe ne correspondent pas";
      document.getElementById("error-message").appendChild(errorMessage);
    }

  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gender">Sexe :</label>
          <input type="radio" id="h" name="gender" value="M" onChange={handleChange} required/> Homme
          <input type="radio" id="f" name="gender" value="F" onChange={handleChange} /> Femme
        </div>
        <div>
          <label htmlFor="lastname">Nom :</label>
          <input type="text" name="lastName" onChange={handleChange} required/>
        </div>
        <div>
          <label htmlFor="firstname">Prenom :</label>
          <input type="text" name="firstName" onChange={handleChange} required/>
        </div>
        <div>
          <label htmlFor="date">Date de naissance</label>
          <input type="date" name="date" onChange={handleChange} required/>
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input type="email" name="mail" placeholder="mail@mail.fr" onChange={handleChange} required/>
        </div>
        <div id="error-message">
          <div>
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirmation :</label>
            <input type="password" value={confirmPassword} name="confirmPassword" placeholder="Password" onChange={(event) => setConfirmPassword(event.target.value)} required/>
          </div>
        </div>
        <div>
          <input type="radio" id="cond" name="cond" required/>
          <label htmlFor="cond">J'accepte les conditions générales d'utilisation</label>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Register;
