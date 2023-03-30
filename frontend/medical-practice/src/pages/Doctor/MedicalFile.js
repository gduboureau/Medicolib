import React, { useEffect, useState } from "react";
import axios from "axios";
import { accountService } from "../users/Authentification/Sessionstorage";

import './assets/medicalFile.css'

const MedicalFile = () => {
    let url = window.location.pathname

    let mail = accountService.getEmail()

    let firstname = url.split("/")[2].split("-")[0];
    let lastname = url.split("/")[2].split("-")[1];

    const [informations, setInformations] = useState({
        id: "",
        firstName: "",
        lastName: "",
        gender: "",
        date: "",
        weight: "",
        height: "",
        mail: "",
        address: "",
        numSS: "",
    });

    const [data, setData] = useState([]);


    useEffect(() => {
        axios.post("/getMedicalFile", { mail, firstname, lastname }).then(res => {
            const newData = res.data;
            const slicedData = newData.slice(0, -1);
            setData(slicedData);
            const lastElement = newData[newData.length - 1];
            setInformations({
                id: lastElement[0],
                firstName: lastElement[1],
                lastName: lastElement[2],
                gender: lastElement[3] === 'F' ? "Femme" : "Homme",
                date: formatDate(lastElement[4]),
                weight: lastElement[5] === "0" ? "Non renseigné" : lastElement[5],
                height: lastElement[6] === "0" ? "Non renseigné" : lastElement[6],
                mail: lastElement[7],
                address: lastElement[8] === "1   1  " ? "Non renseigné" : lastElement[8],
                numSS: lastElement[9] || "Non renseigné"
            });
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatDate = (dateString) => {
        const dateParts = dateString.split('-');
        const day = dateParts[2];
        const month = dateParts[1];
        const year = dateParts[0];
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <h2>Dossier médical n<sup>o</sup> {informations.id}</h2>
            <div className="doctor-card">
                <h3>Informations</h3>
                <p>Prénom : {informations.firstName}</p>
                <p>Nom : {informations.lastName}</p>
                <p>Sexe : {informations.gender}</p>
                <p>Date de naissance : {informations.date}</p>
                <p>Taille (en cm) : {informations.height}</p>
                <p>Poids (en kg) : {informations.weight}</p>
                <p>Numéro de sécurité sociale : {informations.numSS}</p>
                <p>Adresse : {informations.address}</p>
                <p>Mail : {informations.mail}</p>
            </div>

            <div className="doctor-card">
                <h3>Consultations</h3>
                {data.map((data, index) => (
                    <div className="doctor-card" key={index}>
                        <p>Date : {data[0]}</p>
                        <p>Prescription(s) : {data[1]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MedicalFile;