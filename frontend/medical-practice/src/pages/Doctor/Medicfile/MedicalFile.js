import React, { useEffect, useState } from "react";
import axios from "axios";
import { accountService } from "../../users/Authentification/Sessionstorage";
import Error from "../../../utils/Error";
import { format } from "../../../utils/DateFormat";
import IdCard from "./assets/id-card.png"
import Consultation from "./assets/consultation.png"

import './assets/medicalFile.css'

const MedicalFile = () => {
    let url = window.location.pathname

    let mail = accountService.getEmail()

    let firstname = url.split("/")[2].split("-")[0];
    let lastname = url.split("/")[2].split("-")[1];

    const [hasError, setHasError] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [consultationsPerPage] = useState(8);

    const [data, setData] = useState([]);

    const indexOfLastConsultation = currentPage * consultationsPerPage;
    const indexOfFirstConsultation = indexOfLastConsultation - consultationsPerPage;
    const currentConsultation = data.slice(indexOfFirstConsultation, indexOfLastConsultation);

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
                date: format.formatDate(lastElement[4]),
                weight: lastElement[5] === "0" ? "Non renseigné" : lastElement[5],
                height: lastElement[6] === "0" ? "Non renseigné" : lastElement[6],
                mail: lastElement[7],
                address: lastElement[8] === "1   1  " ? "Non renseigné" : lastElement[8],
                numSS: lastElement[9] || "Non renseigné"
            });
        })
            .catch((error) => {
                console.log(error)
                setHasError(true);
            });

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (hasError) {
        return <Error />;
    }

    const downloadDocument = (name, content) => {
        var data = Uint8Array.from(atob(content), c => c.charCodeAt(0));
        //const linkSource = `data:application/pdf;base64,${doc[1]}`;
        var blob = new Blob([data], { type: "octet/stream" });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = name;
        link.click();
    }

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    let pageNumbers = [];

    for (let i = 1; i <= Math.ceil(data.length / consultationsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (currentPage > 11) {
        pageNumbers.splice(0, 1, '...');
    }

    if (currentPage < pageNumbers.length - 10) {
        pageNumbers.splice(pageNumbers.length - 1, 1, '...');
    }

    return (
        <div className="medical-file">
            <h2>Dossier médical : {informations.id}</h2>
            <div className="card-container">
                <div className="med-file-card">
                    <div className="med-file-card-header">
                        <img src={IdCard} alt="id-card" />
                        <h3>Informations personnelles</h3>
                    </div>
                    <div className="med-file-card-content">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Prénom</td>
                                    <td>{informations.firstName}</td>
                                </tr>
                                <tr>
                                    <td>Nom</td>
                                    <td>{informations.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Sexe</td>
                                    <td>{informations.gender}</td>
                                </tr>
                                <tr>
                                    <td>Date de naissance</td>
                                    <td>{informations.date}</td>
                                </tr>
                                <tr>
                                    <td>Taille (en cm)</td>
                                    <td>{informations.height}</td>
                                </tr>
                                <tr>
                                    <td>Poids (en kg)</td>
                                    <td>{informations.weight}</td>
                                </tr>
                                <tr>
                                    <td>Numéro de sécurité sociale</td>
                                    <td>{informations.numSS}</td>
                                </tr>
                                <tr>
                                    <td>Adresse</td>
                                    <td>{informations.address}</td>
                                </tr>
                                <tr>
                                    <td>Mail</td>
                                    <td>{informations.mail}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {data.length === 0 ? <p></p>:

                    <div className="med-file-card">
                        <div className="med-file-card-header">
                            <img src={Consultation} alt="consultation-icon" />
                            <h3>Consultations</h3>
                        </div>
                        <div className="consultations-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date de consultation</th>
                                        <th>Motif</th>
                                        <th>Ordonnance(s)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentConsultation.reduce((acc, row) => {
                                        const existingRow = acc.find((accRow) => accRow.date === row[0] && accRow.motif === row[1]);
                                        if (existingRow) {
                                            existingRow.ordonnances.push({ nom: row[2], contenu: row[3] });
                                        } else {
                                            acc.push({
                                                date: row[0],
                                                motif: row[1],
                                                ordonnances: row[2] && row[3] ? [{ nom: row[2], contenu: row[3] }] : [],
                                            });
                                        }
                                        return acc;
                                    }, []).map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.date}</td>
                                            <td>{row.motif}</td>
                                            <td>

                                                {row.ordonnances.map((ordo, index) => (
                                                    <span key={index} onClick={() => downloadDocument(ordo.nom, ordo.contenu)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{ordo.nom}<br></br></span>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="medical-file-footer">
                            <ul id="page-numbers" className="pagination">
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

                    </div>
                }
            </div>
        </div >
    )
}

export default MedicalFile;