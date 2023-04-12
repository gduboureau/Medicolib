import React from "react";
import axios from 'axios';
import {useState, useEffect} from "react";

import { accountService } from "../users/Authentification/Sessionstorage";
import {  } from "./assets/editAccount.css";

const Edit = () => {

    let mail = {mail : accountService.getEmail()};

    const [data, setData] = useState({
        firstName:"",
        lastName: "",
        gender: "",
        date: "",
        weight: "",
        height: "",
        email: "",
        address: "",
        password: '',
        NumRue: '',
        NomRue: '',
        PostalCode: '',
        City: '',
        numSocial: '',
    });

    const [showInputs, setShowInputs] = useState(false);

    useEffect(() =>{
    axios.post("/informations-patient", mail)
      .then((response) => {
        const newData = response.data;
        if (newData[8] === "1   1  "){
            newData[8] = "";
          }
        setData({
            firstName: newData[1],
            lastName: newData[2],
            gender: newData[3],
            date: newData[4],
            weight: newData[5],
            height: newData[6],
            email: newData[7],
            address: newData[8],
            numSocial: newData[9]
          });
      })
      .catch((error) => {
        console.log(error);
      });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleRadioChange = (e) => {
        if (window.event.target.value === "showInputs") {
            setShowInputs(true);
        } else {
            setShowInputs(false);
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/modify-informations", data)
          .then((response) => {
            console.log(data)
          })
          .catch((error) => {
            console.log(error);
          })
      }
    

    return (
        <div className="InfoPatient">
            <p>Mes Coordonnées</p>
            <form onSubmit={handleSubmit} className="form-editAccount">
                <div>
                    <p>Sexe</p>
                    <label className="InfoPatient-sexe">
                        <input type="radio" id="h" name="gender" value="M" checked={data.gender === "M"}  onChange={handleChange} /> Homme
                        <input type="radio" id="f" name="gender" value="F" checked={data.gender === "F"}  onChange={handleChange} /> Femme
                    </label>
                </div>
                <div>
                    <label>
                        <p>Prénom</p>
                        <input type="text" name="firstName" defaultValue={data.firstName} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        <p>Nom</p>
                        <input type="text" name="lastName" defaultValue={data.lastName} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        <p>Date de naissance</p>
                        <input type="date" name="date" defaultValue={data.date} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        <p>Email</p>
                        <input type="email" name="mail" defaultValue={data.email} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        <p>Numéro de sécurité sociale</p>
                        <input type="text" name="numSocial" defaultValue={data.numSocial} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        <p>Poids (en kg)</p>
                        <input type="number" name="weight" defaultValue={data.weight} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        <p>Taille (en cm)</p>
                        <input type="number" name="height" defaultValue={data.height} onChange={handleChange} />
                    </label>
                </div>
                <div className="InfoPatient-adress">
                    <label className="adress-connue">
                        <input type="radio" name="option" value="noInputs" defaultChecked onChange={handleRadioChange} />
                        Adresse connue  
                    </label>
                    <label className="nouvelle-adress">
                        <input type="radio" name="option" value="showInputs" onChange={handleRadioChange} />
                        Nouvelle adresse 
                    </label>
                    {showInputs ?(
                    <>
                    <div>
                        N°Rue
                        <input type="number" name="NumRue" defaultValue={data.NumRue} onChange={handleChange} required/>
                    </div>
                    <div>
                        Nom de la rue
                        <input type="text" name="NomRue" defaultValue={data.NomRue} onChange={handleChange} required/>
                    </div>
                    <div>
                        Code postal
                        <input type="number" name="PostalCode" defaultValue={data.PostalCode} onChange={handleChange} required/>
                    </div>
                    <div>
                        Ville
                        <input type="text" name="City" defaultValue={data.City} onChange={handleChange} required/>
                    </div>
                    </>
                    ) : (
                    <>
                    <div>
                        <input type="text" name="addr" value={data.address} onChange={handleChange} />
                    </div>
                    </>
                    )}
                </div>
                <div>
                    <label>
                        <p>Nouveau mot de passe</p>
                        <input type="password" name="password" defaultValue={data.password} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit" className="btn modif-info">
                    Enregistrer les modifications
                </button>
            </form>
        </div>
    );
};

export default Edit;