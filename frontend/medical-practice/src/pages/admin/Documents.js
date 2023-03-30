import React, { useState, useEffect } from "react";
import axios from "axios";
import { accountService } from "../users/Authentification/Sessionstorage";

const Documents = () => {
    let mail = { mail: accountService.getEmail() };

    const [ConsultationsList, setConsultations] = useState([]);

    useEffect(() => {
        axios.post("/getconsultations", mail).then(res => {
            const newData = res.data;
            setConsultations(newData);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div>
            
            <div className="doctor-card">
            <h3>Mes ordonnances : </h3>
            {ConsultationsList.map((consultation, index) => (
                <div className="doctor-card" key={index}>
                    <p>Date : {consultation[0]}</p>
                    <p>Prescription(s) : {consultation[1]}</p>
                </div>
            ))}
            </div>
            <div className="doctor-card">
            <h3>Mes documents : </h3>
            </div>
        </div>
    )
}

export default Documents; 