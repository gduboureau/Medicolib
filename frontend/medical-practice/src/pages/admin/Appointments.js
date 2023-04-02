import React, { useState, useEffect } from "react";
import axios from 'axios';
import { accountService } from "../users/Authentification/Sessionstorage";

import './assets/appointments.css';

function ConfirmationModal(props) {
    const handleClose = () => {
        props.onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{props.title}</h2>
                <p>{props.message}</p>
                <div className="modal-buttons">
                    <button onClick={() => props.onConfirm()}>Oui</button>
                    <button onClick={handleClose}>Non</button>
                </div>
            </div>
        </div>
    );
}


const Appointments = () => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    let mail = { mail: accountService.getEmail() };

    const [file, setSelectedFile] = useState(null);

    const [AppointmentList, setAppointments] = useState([]);

    useEffect(() => {
        axios.post("/appointments", mail).then(res => {
            const newData = res.data;
            setAppointments(newData);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCancelAppointment = (id) => {
        setSelectedAppointment(id);
        setShowModal(true);
    };

    const handleConfirmCancelAppointment = () => {
        axios
            .post('/cancelappointment', { id: selectedAppointment })
            .then((response) => {
                console.log(response);
                handleCloseModal()
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null);
        setShowModal(false);
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (id) => {
        let document = new FormData();
        if (file !== null) {
            document.append("file", file);
            const params = new URLSearchParams();
            params.append('mail', accountService.getEmail());
            params.append('apptid', id[0]);
            axios.post('/addDocument', document, {
                params,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((response) => {
                console.log(response);
            })
                .catch((error) => {
                    console.log(error);
                }, []);
        }

    };
      

    return (
        <div>
            {AppointmentList.map((appointment, index) => (
                <div className="doctor-card" key={index}>
                    <p>
                        {appointment[1]} {appointment[2]}
                    </p>
                    <p>{appointment[3]}</p>
                    <p>{appointment[4]}</p>
                    <p>{appointment[5]}</p>
                    <p>Documents pour le rendez-vous:</p>
                    <button onClick={() => handleCancelAppointment(appointment[0])}>
                        Annuler le rendez-vous
                    </button>
                    <div>
                        <form id="download-file">
                            <input type="file" onChange={handleFileSelect} />
                            <button className="buttonFile" onClick={() => handleSubmit(appointment)}>Upload</button>
                        </form>
                    </div>
                </div>
            ))}
            {selectedAppointment !== null && (
                <ConfirmationModal
                    title="Annuler le rendez-vous"
                    message="Êtes-vous sûr de vouloir annuler ce rendez-vous ?"
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmCancelAppointment}
                />
            )}
        </div>
    );
};

export default Appointments;