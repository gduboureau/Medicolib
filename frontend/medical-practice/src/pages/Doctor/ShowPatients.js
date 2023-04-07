import axios from 'axios';
import { accountService } from "../users/Authentification/Sessionstorage";
import React, { useEffect, useState } from 'react';
import './assets/patient.css';
import { useNavigate } from "react-router-dom";

const ShowPatients = () => {

    const navigate = useNavigate();

    const [patientsList, setPatientsList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(2);

    const formatDate = (dateString) => {
        const dateParts = dateString.split('-');
        const day = dateParts[2];
        const month = dateParts[1];
        const year = dateParts[0];
        return `${day}/${month}/${year}`;
    };

    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patientsList.slice(indexOfFirstPatient, indexOfLastPatient);

    let mail = { mail: accountService.getEmail() };

    useEffect(() => {
        axios.post("/getPatients", mail).then(res => {
            const newData = res.data;
            setPatientsList(newData)
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(patientsList.length / patientsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const handleConsultation = (id, firstname, lastname) => {
        let name = firstname + "-" + lastname
        navigate(`/doctor/${name}/consultation?id=${id}`);
    }

    const handleMedicalFile = (id, firstname, lastname) => {
        let name = firstname + "-" + lastname
        navigate(`/doctor/${name}/dossier-medical?id=${id}`);
    }


    return (
        <div className="container">
            <h1>Liste des patients</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Date de naissance</th>
                        <th>Sexe</th>
                        <th>Mail</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPatients.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient["lastName"]}</td>
                            <td>{patient["firstName"]}</td>
                            <td>{formatDate(patient["birthday"])}</td>
                            <td>{patient["gender"]}</td>
                            <td>{patient["mail"]}</td>
                            <td>
                                <button className="btn edit-btn" onClick={() => handleConsultation(patient["id"], patient["firstName"], patient["lastName"])}>Consultation</button>
                                <button className="btn delete-btn" onClick={() => handleMedicalFile(patient["id"], patient["firstName"], patient["lastName"])}>Dossier médical</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul id="page-numbers">
                {pageNumbers.map((number) => {
                    return (
                        <li key={number} id={number} onClick={handleClick}>
                            {number}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}


export default ShowPatients;