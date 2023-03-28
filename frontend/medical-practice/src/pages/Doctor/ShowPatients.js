import axios from 'axios';
import { accountService } from "../users/Authentification/LocalStorage";
import { useEffect, useState } from 'react';
import './patient.css';
const ShowPatients = () => {

    const [patientsList, setPatientsList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(2);

    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patientsList.slice(indexOfFirstPatient, indexOfLastPatient);

    let mail = { mail: accountService.getEmail() };

    useEffect(() => {
        axios.post("/getPatients", mail).then(res => {
            const newData = res.data;
            console.log(newData);
            setPatientsList(newData)
        });
    }, []);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(patientsList.length / patientsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

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
                            <td>{patient[0]}</td>
                            <td>{patient[1]}</td>
                            <td>{patient[3]}</td>
                            <td>{patient[2]}</td>
                            <td>{patient[4]}</td>
                            <td>
                                <button className="btn edit-btn">Consulter</button>
                                <button className="btn delete-btn">Modifier</button>
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