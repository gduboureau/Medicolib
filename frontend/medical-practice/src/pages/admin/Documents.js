import React, { useState, useEffect } from 'react';
import axios from "axios";
import { accountService } from "../users/Authentification/Sessionstorage";
import moment from 'moment';
import Image from './assets/image.png'
import Document from './assets/document.png'

import './assets/documents.css'

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
        documentList.forEach(doc => getTimeAppointment(doc[3]));
    }, [documentList]);

    const getTimeAppointment = (id) => {
        axios.post("/getTimeAppt", { id: id }).then(res => {
            const newData = res.data;
            setDate(date => ({ ...date, [id]: newData }));
        });
    }

    const downloadDocument = (doc) => {
        var data = Uint8Array.from(atob(doc[1]), c => c.charCodeAt(0));
        //const linkSource = `data:application/pdf;base64,${doc[1]}`;
        var blob = new Blob([data], { type: "octet/stream" });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = doc[0];
        link.click();
    }

    const removeDocument = (document) => {
        const updatedDocs = documentList.filter(doc => doc[0] !== document[0]);
        setDocumentList(updatedDocs);
        const updatedDates = { ...date };
        delete updatedDates[document[3]];
        setDate(updatedDates);
        axios.post("/deleteDocuments", {
            id: document[3],
            name: document[1]
        }).then(res => {
            console.log(res.data);
        });
    }

    const prescriptionDate = (prescription) => {
        const str = prescription.split("-");
        const date = moment(str[1].split(".")[0], 'DD/MM/YYYY');
        const dateFormatted = date.format('D MMMM YYYY');
        return dateFormatted
    }

    const documentDate = (documentDate) => {
        const date = moment(documentDate, 'YYYY-MM-DD');
        const dateFormatted = date.format('D MMMM YYYY');
        return dateFormatted
    }

    const combinedList = [...PrescriptionsList, ...documentList];

    const sortedList = combinedList.sort((a, b) => {
        const dateA = a[2] ? moment(date[a[2]], 'YYYY-MM-DD') : moment(prescriptionDate(a[0]), 'D MMMM YYYY');
        const dateB = b[2] ? moment(date[b[2]], 'YYYY-MM-DD') : moment(prescriptionDate(b[0]), 'D MMMM YYYY');
        return dateA - dateB;
    });

    return (
        <div className='documents'>
            <h2>Mes documents</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Date de consultation</th>
                            <th>Documents</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedList.map((item, index) => (
                            <tr key={`${item[0]}_${index}`}>
                                <td className='document-cell'>{item[2] ? documentDate(date[item[3]]) : prescriptionDate(item[0])}</td>
                                <td>
                                    <span>
                                        {item[2] ?
                                            <div>
                                                {item[1].split(".")[1] === "png" || item[1].split(".")[1] === "jpeg" || item[1].split(".")[1] === "jpeg" ?
                                                    <img src={Image} alt='img-png' />
                                                    : <img src={Document} alt='img-doc' />
                                                }
                                                {item[1]}
                                            </div>
                                            : <div>
                                                <img src={Document} alt='img-doc' />{"Ordonnance"}
                                            </div>
                                        }
                                    </span>
                                </td>
                                <td><button onClick={() => downloadDocument(item)}>Télécharger</button>
                                    {documentList.includes(item) && (
                                        <button onClick={() => removeDocument(item)}>Retirer</button>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Documents; 