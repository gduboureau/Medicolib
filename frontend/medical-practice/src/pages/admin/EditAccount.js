import React from "react";
import axios from 'axios';
import {useState, useEffect} from "react";

import { accountService } from "../users/Authentification/LocalStorage";

const Edit = () => {

    let mail = {mail : accountService.getEmail()};

    const [PatientInfo, setPatientInfo] = useState([]);

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
    });


    useEffect(() =>{
    axios.post("/informations-patient", mail)
      .then((response) => {
        const newData = response.data;
        setPatientInfo(newData); 
        setData({
            firstName: newData[1],
            lastName: newData[2],
            gender: newData[3],
            date: newData[4],
            weight: newData[5],
            height: newData[6],
            email: newData[7],
            address: newData[8],
            Address : newData[9],
          });
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/modify-informations", data)
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          })
      }
    

    return (
        <div className="InfoPatient">
            <form onSubmit={handleSubmit}>
                <div>
                    Prénom <input type="text" name="firstName" defaultValue={data.firstName} onChange={handleChange} required />
                </div>
                <div>
                    Nom <input type="text" name="lastName" defaultValue={data.lastName} onChange={handleChange} required />
                </div>
                <div>
                    Sexe <input type="radio" id="h" name="gender" value="M" checked={data.gender === "M"}  onChange={handleChange} /> Homme
                         <input type="radio" id="f" name="gender" value="F" checked={data.gender === "F"}  onChange={handleChange} /> Femme
                </div>
                <div>
                    Date de naissance<input type="date" name="date" defaultValue={data.date} onChange={handleChange} required />
                </div>
                <div>
                    Poids <input type="number" name="weight" defaultValue={data.weight} onChange={handleChange} required />
                </div>
                <div>
                    Taille <input type="number" name="height" defaultValue={data.height} onChange={handleChange} required />
                </div>
                <div>
                    Email <input type="email" name="mail" defaultValue={data.email} onChange={handleChange} required />
                </div>
                <div>
                    <div>
                        N°Rue <input type="number" name="NumRue" defaultValue={data.NumRue} onChange={handleChange} required />
                    </div>
                    <div>
                        Nom de la rue <input type="text" name="NomRue" defaultValue={data.NomRue} onChange={handleChange} required />
                    </div>
                    <div>
                        Code postal <input type="number" name="PostalCode" defaultValue={data.PostalCode} onChange={handleChange} required />
                    </div>
                    <div>
                        Ville <input type="text" name="City" defaultValue={data.City} onChange={handleChange} required />
                    </div>
                </div>
                <div>
                    Adresse connue <input type="text" name="addr" value={data.address} onChange={handleChange} required />
                </div>
                <div>
                    Nouveau mot de passe <input type="password" name="password" defaultValue={data.password} onChange={handleChange} />
                </div>
                <button type="submit" className="btn modif-info">
                    Enregistrer les modifications
                </button>
            </form>
        </div>
    );
};

export default Edit;