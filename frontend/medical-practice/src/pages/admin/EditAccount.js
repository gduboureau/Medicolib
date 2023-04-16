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
                <div className="infoPatient-mere1">
                    <div className="personalInformation">
                        <h3>Mes informations personnelles</h3>
                        <div className="info-lastName-firstName">
                            <div>
                                <label>
                                    <input type="text" name="lastName" placeholder="Votre nom" defaultValue={data.lastName} onChange={handleChange} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="text" name="firstName" placeholder="Votre prénom" defaultValue={data.firstName} onChange={handleChange} />
                                </label>
                            </div>
                        </div>
                        <div className="secu-adress">
                            <div className="info-secu">
                                <label>
                                    <input type="text" name="numSocial" placeholder="Votre numéro de sécurité sociale" defaultValue={data.numSocial} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="infoPatient-adress">
                                <div className="adress-connue-inconnue">
                                    <input type="radio" name="option" value="noInputs" defaultChecked onChange={handleRadioChange} />
                                    Adresse connue  
                                    <input type="radio" name="option" value="showInputs" onChange={handleRadioChange} />
                                    Nouvelle adresse 
                                </div>
                                {showInputs ?(
                                <>
                                <div className="info-nouvelle-adress">
                                    <div>
                                        <input type="number" name="NumRue" placeholder="N°Rue" defaultValue={data.NumRue} onChange={handleChange} required/>
                                    </div>
                                    <div>
                                        <input type="text" name="NomRue" placeholder="Nom de la rue" defaultValue={data.NomRue} onChange={handleChange} required/>
                                    </div>
                                    <div>
                                        <input type="number" name="PostalCode" placeholder="Code postal" defaultValue={data.PostalCode} onChange={handleChange} required/>
                                    </div>
                                    <div>
                                        <input type="text" name="City" placeholder="Ville" defaultValue={data.City} onChange={handleChange} required/>
                                    </div>
                                </div>
                                </>
                                ) : (
                                <>
                                <div className="info-adress-connue">
                                    <input type="text" name="addr" placeholder="Votre adresse" value={data.address} onChange={handleChange} />
                                </div>
                                </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="medicalInformation">
                        <h3>Mes informations médicale</h3>
                        <div className="info-medic-sexe-dateNaissance">
                            <div className="infoPatient-medi-sexe">
                                <label >
                                <p>Sexe</p>
                                    <input type="radio" id="h" name="gender" value="M" checked={data.gender === "M"}  onChange={handleChange} /> Homme
                                    <input type="radio" id="f" name="gender" value="F" checked={data.gender === "F"}  onChange={handleChange} /> Femme
                                </label>
                            </div>
                            <div className="info-medic-date">
                                <label>
                                    <p>Date de naissance</p>
                                    <input type="date" name="date" defaultValue={data.date} onChange={handleChange} />
                                </label>
                            </div>
                        </div>
                        <div className="info-medic-poids-taille">
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
                        </div>
                    </div>

                </div>

                <div className="infoPatient-mere2">
                    <div className="myAccount">
                        <h3>Mon compte</h3>
                        <div>
                            <input type="email" name="mail" placeholder="Votre adresse email" defaultValue={data.email} onChange={handleChange} />
                        </div>
                        <div>
                            <input type="password" name="password" placeholder="Votre nouveau mot de passe" defaultValue={data.password} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="deleteAccount">
                        <h3>Supprimer le compte</h3>
                        <button type="submit" className="btn supprimer-compte">
                            Supprimer
                        </button>
                    </div>
                </div>
                <div className="info-registration">
                    <button type="submit" className="btn modif-info">
                            Enregistrer les modifications
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Edit;