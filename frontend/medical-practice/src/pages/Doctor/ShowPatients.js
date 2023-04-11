import axios from 'axios';
import { accountService } from "../users/Authentification/Sessionstorage";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import './assets/showPatients.css'

const ShowPatients = () => {

    const navigate = useNavigate();

    const [patientsList, setPatientsList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(10);

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

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const handleMedicalFile = (id, firstname, lastname) => {
        let name = firstname + "-" + lastname
        navigate(`/doctor/${name}/dossier-medical?id=${id}`);
    }

    let pageNumbers = [];

    for (let i = 1; i <= Math.ceil(patientsList.length / patientsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (currentPage > 11) {
        pageNumbers.splice(0, 1, '...');
    }

    if (currentPage < pageNumbers.length - 10) {
        pageNumbers.splice(pageNumbers.length - 1, 1, '...');
    }

    if (patientsList.length === 0) {
        return (
            <div></div>
        )
    }
    else {
        return (
            <div className="showPatients">
                <h2>Liste des patients</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Date de naissance</th>
                            <th>Sexe</th>
                            <th>Mail</th>
                            <th>Action</th>
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
                                    <button onClick={() => handleMedicalFile(patient["id"], patient["firstName"], patient["lastName"])}>Accéder au dossier médical</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ul id="page-numbers">
                    {pageNumbers.map((number, index) => {
                        if (number === '...' && index === 0) {
                            return (
                                <li key={number} id={number} onClick={() => setCurrentPage(index + 1)}>
                                    {number}
                                </li>
                            );
                        }
                        else if (number === '...' && index === pageNumbers.length - 1) {
                            return (
                                <li key={number} id={number} onClick={() => setCurrentPage(index + 1)}>
                                    {number}
                                </li>
                            );
                        }
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
}


export default ShowPatients;