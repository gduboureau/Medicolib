import React from "react";

const Register = (props) => {
  return (
    <div className="tab-content">
      <form className="form-profile">
        <h1>BIENVENUE</h1>
        <fieldset>
          <legend>Créer votre compte</legend>
          <div className="form-group">
            <label for="sexe">Sexe :</label>
            <input type="radio" className="form-control" id="f" name="sexe" value="h" checked/> Homme
            <input type="radio" className="form-control" id="f" name="sexe" value="f"/> Femme
          </div>
          <div className="form-group">
            <label for="name">Nom :</label>
            <input type="text" className="form-control" id="lastname" name="lastname"/>
          </div>
          <div className="form-group">
            <label for="firstname">Prenom :</label>
            <input type="text" className="form-control" id="firstname" name="firstname"/>
          </div>
          <div className="form-group">
            <label for="phone">Téléphone :</label>
            <input type="text" className="form-control" id="phone" name="phone"/>
          </div>
          <div className="form-group">
            <label for="birthdate">Date de naissance :</label>
            <input type="date" className="form-control" id="birthdate" name="birthdate"/>
          </div>
          <div className="form-group">
            <label for="email">Email :</label>
            <input type="email" className="form-control" id="emailId" placeholder="mail@mail.fr"/>
          </div>
          <div className="form-group">
            <label for="password">Mot de passe :</label>
            <input type="password" className="form-control" id="password" placeholder="Password"/>
          </div>
          <div className="form-group">
            <label for="password">Confirmation :</label>
            <input type="password" className="form-control" id="passwordConfirm" placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Se connecter
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
