import React, { useState, useEffect } from "react";
import axios from 'axios';
import { accountService } from "../users/Authentification/Sessionstorage";
import { format } from "../../utils/DateFormat";
import { useNavigate } from "react-router";
import AddDocument from './assets/addDocument.png';
import Rdv from './assets/rdv.png';
import Time from './assets/time.png';
import SupprRdv from './assets/suppr-rdv.png'

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

function AddDocumentModal(props) {
    const [file, setFile] = useState(null);
    const handleClose = () => {
        props.onClose();
    };

    const handleFileSelect = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('file', file);
        formData.append('mail', accountService.getEmail());
        formData.append('apptid', props.appointment);

        axios.post('/addDocument', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response);
            handleClose()
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{props.title}</h2>
                <div className="modal-document-buttons">
                    <form onSubmit={handleSubmit}>
                        <input type="file" onChange={handleFileSelect} />
                        <button type="submit">Télécharger</button>
                    </form>
                    <button className="cancel-button" onClick={handleClose}>Annuler</button>
                </div>
            </div>
        </div>
    );
}

const Appointments = () => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);

    let mail = { mail: accountService.getEmail() };

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    const [showButton, setShowButton] = useState(true);

    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    };

    useEffect(() => {
        axios.post("/appointments", mail).then(res => {
            const newData = res.data;
            const now = new Date().getTime();
            const upcoming = newData.filter(
                (appointment) => new Date(appointment[5] + ' ' + appointment[6]).getTime() > now
            );
            const past = newData.filter(
                (appointment) => new Date(appointment[5] + ' ' + appointment[6]).getTime() <= now
            );
            setUpcomingAppointments(upcoming);
            setPastAppointments(past);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCancelAppointment = (id) => {
        setSelectedAppointment(id);
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
    };

    const handleCloseDocumentModal = () => {
        setSelectedDocument(null);
    }

    function toggle() {
        setShowButton((prevShowButton) => !prevShowButton);
    }

    return (
        <div className="appointments">
            <h2 style={{ marginTop: "20px" }}>Rendez-vous à venir</h2>
            <div className="upcoming-appointments">
                {upcomingAppointments.map((appointment, index) => (
                    <div className="appointment-card" key={index}>
                        <div className="app-card-header">
                            <div className="date">
                                <img src={Rdv} alt='rdv' className="img-white" />
                                <p>{formatDate(appointment[5])}</p>
                            </div>
                            <div className="time">
                                <img src={Time} alt='time' className="img-white" />
                                <p>{format.formatTime(appointment[6])}</p>
                            </div>
                        </div>
                        <div className="app-card-content" onClick={() => navigate(`/${appointment[4]}/${appointment[2]}-${appointment[3]}?id=${appointment[1]}`)}>
                            <p className="doctor-name">
                                Dr {appointment[2]} {appointment[3]}
                            </p>
                            <p className="doctor-speciality">{appointment[4]}</p>
                        </div>
                        <div className="document-list">
                            <button onClick={() => setSelectedDocument(appointment[0])} style={{
                                marginBottom: "5px"
                            }}>
                                <img src={AddDocument} alt='document' style={{ marginBottom: "10px", marginTop: "10px" }} />
                                Ajouter des documents</button>
                        </div>
                        <div className="remove-rdv">
                            <button onClick={() => handleCancelAppointment(appointment[0])}>
                                <img src={SupprRdv} alt='remove-rdv' />
                                Annuler le rendez-vous
                            </button>
                        </div>
                    </div>
                ))}
                {upcomingAppointments.length % 2 !== 0 && <div className="appointment-card empty-card"></div>}
            </div>
            {selectedAppointment !== null && (
                <ConfirmationModal
                    title="Annuler le rendez-vous"
                    message="Êtes-vous sûr de vouloir annuler ce rendez-vous ?"
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmCancelAppointment}
                />
            )}
            {selectedDocument !== null && (
                <AddDocumentModal
                    title="Ajouter un document"
                    appointment={selectedDocument}
                    onClose={handleCloseDocumentModal}
                />
            )}
            {showButton && <button className="hidden-appointments-button" onClick={toggle}>Voir mes rendez-vous passés</button>}
            {!showButton && (
                <div id="hidden-appointments">
                    <h2>Rendez-vous passés</h2>
                    <div className="upcoming-appointments">
                        {pastAppointments.map((appointment, index) => (
                            <div className="appointment-card" key={index}>
                                <div className="app-card-header">
                                    <div className="date">
                                        <img src={Rdv} alt='rdv' className="img-white" />
                                        <p>{formatDate(appointment[5])}</p>
                                    </div>
                                    <div className="time">
                                        <img src={Time} alt='time' className="img-white" />
                                        <p>{format.formatTime(appointment[6])}</p>
                                    </div>
                                </div>
                                <div className="app-card-content" onClick={() => navigate(`/${appointment[4]}/${appointment[2]}-${appointment[3]}?id=${appointment[1]}`)}>
                                    <p className="doctor-name">
                                        Dr {appointment[2]} {appointment[3]}
                                    </p>
                                    <p className="doctor-speciality">{appointment[4]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
};

export default Appointments;