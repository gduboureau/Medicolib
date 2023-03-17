import React from "react";
import SubmitFormButton from "./SubmitFormButton";

const Register = (props) => {
  return (
    <div>
      <form className="form-register" method="post">
          <legend>Créer votre compte</legend>
          <div className="form-group">
            <label htmlFor="gender">Sexe :</label>
            <input type="radio" id="h" name="gender" value="h"/> Homme
            <input type="radio" id="f" name="gender" value="f"/> Femme
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Nom :</label>
            <input type="text" id="lastname" name="lastname"/>
          </div>
          <div className="form-group">
            <label htmlFor="firstname">Prenom :</label>
            <input type="text" id="firstname" name="firstname"/>
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Date de naissance :</label>
            <input type="date" id="birthday" name="birthday"/>
          </div>
          <div className="form-group">
            <label htmlFor="NumSocial">NumSocial : </label>
            <input type="text" id="NumSocialId" name="NumSocial"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input type="email" id="emailId" placeholder="mail@mail.fr"/>
          </div>
          <div className="form-group">
            <label htmlFor="street">Rue :</label>
            <input type="text" id="streetId" placeholder="rue des cerisiers"/>
          </div>
          <div className="form-group">
            <label htmlFor="NumStreet">N° Rue :</label>
            <input type="number" id="numStreetId" placeholder="1"/>
          </div>
          <div className="form-group">
            <label htmlFor="PostalCode">Code postal : </label>
            <input type="number" id="PostalCodeId" placeholder="33000"/>
          </div>
          <div className="form-group">
            <label htmlFor="City">Ville : </label>
            <input type="text" id="CityId" placeholder="Bordeaux"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" id="password" placeholder="Password"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirmation :</label>
            <input type="password" id="passwordConfirm" placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-outline-primary" onClick={SubmitFormButton}>
            Se connecter
          </button>
      </form>
    </div>
  );
};

export default Register;
