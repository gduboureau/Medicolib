import React from "react";
import axios from 'axios';
import {useState, useEffect} from "react";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    useEffect(() =>{
    axios.post("/informations-patient", mail)
      .then((response) => {
        const newData = response.data;
        const city = newData.adress.city;
        const number = newData.adress.number;
        const postalCode = newData.adress.postalCode;
        const street = newData.adress.street;
        const adress = number + street + postalCode + city
        if (newData[8] === adress){
            newData[8] = "";
        }
        setData({
            firstName: newData.firstName,
            lastName: newData.lastName,
            gender: newData.gender,
            date: newData.birthday,
            weight: newData.weight,
            height: newData.height,
            email: newData.mail,
            address: adress,
            numSocial: newData.numSocial
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
            document.querySelector(".info-nouvelle-adress").classList.add("active");
            document.querySelector(".personalInformation").classList.add("active");
            document.querySelector(".info-adress-connue").classList.add("hide");
        } else {
            document.querySelector(".info-nouvelle-adress").classList.remove("active");
            document.querySelector(".personalInformation").classList.remove("active");
            document.querySelector(".info-adress-connue").classList.remove("hide");
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/modify-informations", data)
          .then((response) => {
            console.log(data)
            toast.success('Vos informations ont été mise à jour !');
          })
          .catch((error) => {
            console.log(error);
          })
      }
    

    return (
        <div className="InfoPatient">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="form-editAccount">
                <div className="top-wrap">
                    <div className="personalInformation">
                        <h3>Mes informations personnelles</h3>
                        <div className="info-lastName-firstName">
                            <div>
                                <label>
                                    <p>Prénom</p>
                                    <input type="text" name="firstName" placeholder="Votre prénom" defaultValue={data.firstName} onChange={handleChange} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <p>Nom</p>
                                    <input type="text" name="lastName" placeholder="Votre nom" defaultValue={data.lastName} onChange={handleChange} />
                                </label>
                            </div>
                        </div>
                        <div className="secu-adress">
                            <div className="info-secu">
                                <label>
                                    <p>Numéro de sécurité sociale</p>
                                    <input type="text" name="numSocial" placeholder="Votre numéro de sécurité sociale" defaultValue={data.numSocial} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="infoPatient-adress">
                                <div className="adress-connue-inconnue">
                                    <input type="radio" name="option" value="noInputs" defaultChecked onChange={handleRadioChange} />
                                    <p>Adresse actuelle</p>
                                    <input type="radio" name="option" value="showInputs" onChange={handleRadioChange} />
                                    <p>Nouvelle adresse</p>
                                </div>
                                {/* {showInputs ?(
                                <> */}
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
                                {/* </>
                                ) : (
                                <> */}
                                <div className="info-adress-connue">
                                    <input type="text" name="addr" placeholder="Adresse non renseigné" value={data.address} onChange={handleChange} />
                                </div>
                                {/* </>
                                )} */}
                            </div>
                        </div>
                    </div>

                    <div className="medicalInformation">
                        <h3>Mes informations médicale</h3>
                        <div className="info-medic-sexe-dateNaissance">
                                <label className="infoPatient-medi-sexe">
                                    <p>Homme
                                        <input type="radio" id="h" name="gender" value="M" checked={data.gender === "M"}  onChange={handleChange} />
                                    </p>
                                    <p>Femme
                                        <input type="radio" id="f" name="gender" value="F" checked={data.gender === "F"}  onChange={handleChange} />
                                    </p>
                                </label>
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

                <div className="bottom-wrap">
                    <div className="myAccount">
                        <h3>Mes informations de connexion</h3>
                            <div className="login">
                                <div className="patientmail">
                                    <p>Mail</p>
                                    <input type="email" name="mail" placeholder="Votre adresse email" defaultValue={data.email} onChange={handleChange} />
                                </div>
                                <div className="patientpassword">
                                    <p>Mot de passe</p>
                                    <input type="password" name="password" placeholder="Votre nouveau mot de passe" defaultValue={data.password} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    <div className="button-div">
                        <div className="save-modification">
                            <button type="submit" className="btn modif-info">
                                Enregistrer les modifications
                            </button>
                        </div>
                        <div className="deleteAccount">
                            <button type="submit" className="btn supprimer-compte">
                                Supprimer le compte
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default Edit;