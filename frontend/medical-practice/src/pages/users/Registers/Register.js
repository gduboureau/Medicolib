import React, { useState } from "react";
//import SubmitFormButton from "./SubmitFormButton";
import axios from 'axios';

const Register = () => {

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/register", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gender">Sexe :</label>
          <input type="radio" id="h" name="gender" value="h" onChange={handleChange} /> Homme
          <input type="radio" id="f" name="gender" value="f" onChange={handleChange} /> Femme
        </div>
        <div>
          <label htmlFor="lastname">Nom :</label>
          <input type="text" name="lastName" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="firstname">Prenom :</label>
          <input type="text" name="firstName" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input type="email" name="mail" placeholder="mail@mail.fr" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirmation :</label>
          <input type="password" name="passwordconfirm" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Register;
