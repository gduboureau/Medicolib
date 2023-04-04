import React, { useState, useEffect } from 'react';
import axios from "axios";
import { accountService } from "../users/Authentification/Sessionstorage";

const Documents = () => {
    let mail = { mail: accountService.getEmail() };

    const [PrescriptionsList, setPrescriptions] = useState([]);
    const [documentList, setDocumentList] = useState([]);
    const [date, setDate] = useState([]);

    useEffect(() => {
        axios.post("/getDocuments", mail).then(res => {
            const newData = res.data;
            setDocumentList(newData);
        });
        axios.post("/getPrescriptions", mail).then(res => {
            const newData = res.data;
            setPrescriptions(newData);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        documentList.forEach(doc => getTimeAppointment(doc[2]));
    }, [documentList]);

    const getTimeAppointment = (id) => {
        axios.post("/getTimeAppt", {id : id}).then(res => {
            const newData = res.data;
            setDate(date => ({...date, [id]: newData}));
        });
    }

    const downloadDocument = (doc) => {
        var data = Uint8Array.from(atob(doc[1]), c => c.charCodeAt(0));
        //const linkSource = `data:application/pdf;base64,${doc[1]}`;
        var blob = new Blob([data], {type: "octet/stream"});
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = doc[0];
        link.click();
    }

    const removeDocument = (document) => {
        const updatedDocs = documentList.filter(doc => doc[2] !== document[2] && doc[0] !== document[0]);
        setDocumentList(updatedDocs);
        const updatedDates = {...date};
        delete updatedDates[document[2]];
        setDate(updatedDates);
        axios.post("/deleteDocuments",{
            id : document[2],
            name: document[0]
        }).then(res => {
            console.log(res.data);
        });
    }

    return (
        <div>
            <div className="doctor-card">
            <h3>Mes ordonnances : </h3>
            {PrescriptionsList.map((consultation, index) => (
                <div className="patient-consultation" key={index}>
                    <span onClick={() => downloadDocument(consultation)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{consultation[0]}</span> {/*style a mettre dans CSS par la suite*/}
                </div>
            ))}
            </div>
            <div className="doctor-card">
            <h3>Mes documents : </h3>
                {documentList.map((document, index) => (
                    <div className="patient-document" key={index}>
                        <p>Date de consultation : {date[document[2]]}</p>
                        <p>Titre : <span onClick={() => downloadDocument(document)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{document[0]}</span></p> {/*style a mettre dans CSS par la suite*/}
                        <button onClick={() => removeDocument(document)}>Retirer</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Documents; 