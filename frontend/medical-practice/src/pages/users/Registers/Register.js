import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { accountService } from "../Authentification/Sessionstorage";

import ShowPassword from "./assets/show.png"
import HidePassword from "./assets/hide.png"

import ShowConfirmPassword from "./assets/show.png"
import HideConfirmPassword from "./assets/hide.png"

import './assets/register.css'

const Register = () => {

  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [eyeIcon1, setEyeIcon1] = useState(HidePassword);
  const [eyeIcon2, setEyeIcon2] = useState(HideConfirmPassword);

  function togglePassword() {
    setShowPassword(!showPassword);
    setEyeIcon1(showPassword ? HidePassword : ShowPassword);
  }

  function togglePasswordConfirm() {
    setShowPasswordConfirm(!showPasswordConfirm);
    setEyeIcon2(showPasswordConfirm ? HideConfirmPassword : ShowConfirmPassword);
  }

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    date: "",
    mail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "lastName" || name === "firstName") {
      setData((prevState) => ({
        ...prevState,
        [name]: value.toLowerCase().charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      }));
    } else if (name === "mail"){
      setData((prevState) => ({
        ...prevState,
        [name]: value.toLowerCase(),
      }));
    }else{
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password === confirmPassword) {
      axios.post("/register", data)
        .then((response) => {
          console.log(response.data);
          axios.post("/login", { login: data.mail, password: data.password })
            .then(res => {
              accountService.saveToken(res.data)
              accountService.saveEmail(data.mail)
              navigate('/')
            })
            .catch(error => console.log(error))

        })
        .catch((error) => {
          console.log(error.response.data)
          setErrorMail(error.response.data);
        })
    } else {
      setErrorPassword("Les deux mots de passe ne correspondent pas");
    }

  }

  return (
      <div className="register">
        <p>Enregistrez-vous</p>
        <form onSubmit={handleSubmit} className="form-register">
          <div>
            <label className="register-sexe">
              <input type="radio" id="h" name="gender" value="M" onChange={handleChange} required /> Homme
              <input type="radio" id="f" name="gender" value="F" onChange={handleChange} /> Femme
            </label>
          </div>
          <div>
            <label>

              <span>
                <input type="text" name="lastName" placeholder="Votre nom" onChange={handleChange} required />
              </span>
            </label>
          </div>
          <div>
            <label>

              <span>
                <input type="text" name="firstName" placeholder="Votre prénom" onChange={handleChange} required />
              </span>
            </label>
          </div>
          <div>
            <label>

              <span>
                <input type="date" name="date" max={new Date().toISOString().split("T")[0]} onChange={handleChange} required />
              </span>
            </label>
          </div>
          <div>
            <label>

              <span>
                <input type="email" name="mail" placeholder="Votre adresse email" onChange={handleChange} required />
              </span>
            </label>
          </div>
          {errorMail && <p style={{ fontSize: "14px", color: "red" }}>{errorMail}</p>}
          <div>
            <label>

              <span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Entrez votre mot de passe"
                  onChange={handleChange}
                  required
                />
                <img src={eyeIcon1} alt="eye-icon" onClick={togglePassword} />

              </span>
            </label>
          </div>
          <div className="form-group">
            <label>

              <span>
                <input type={showPasswordConfirm ? "text" : "password"} value={confirmPassword} name="confirmPassword" placeholder="Confirmez votre mot de passe" onChange={(event) => setConfirmPassword(event.target.value)} required />
                <img src={eyeIcon2} alt="eye-icon" onClick={togglePasswordConfirm} />
              </span>
            </label>
          </div>
          <div>
            {errorPassword && <p style={{ fontSize: "14px", color: "red" }}>{errorPassword}</p>}
          </div>
          <div className="conditions">

            <label htmlFor="cond"><input type="checkbox" id="cond" name="cond" required />J'accepte les conditions générales d'utilisation</label>
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Se connecter
          </button>
        </form >
        <div className="link">
          <p>Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link></p>
        </div>
      </div >
  );
};

export default Register;
