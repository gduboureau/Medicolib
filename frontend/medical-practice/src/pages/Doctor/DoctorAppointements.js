import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import axios from 'axios';
import { accountService } from "../users/Authentification/Sessionstorage";
import { Modal, Button } from 'react-bootstrap';
import './assets/fullcalendar.css'
import './assets/doctorAppointments.css';
import { useNavigate } from "react-router";
import { useMemo } from "react";


function ConfirmationModal(props) {
    const navigate = useNavigate();
    const handleClose = () => {
        props.onClose();
    };
    return (
        <div className="showInfoAppt">
            <div className="modalAppt">
                <Modal.Header>
                    <Modal.Title style={{ marginBottom: "10px", marginTop: "10px" }}>Rendez-vous avec {props.appointment}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>- Date : {props.date}</p>
                    <p>- Heure de début : {props.start}</p>
                    <p>- Heure de fin : {props.end}</p>
                    <div style={{ marginTop: "10px" }}>
                        <span className="addedDocument" >Document(s) ajouté(s) : </span>
                        {props.documents}
                    </div>
                    <div className="redirect-buttons">
                        <span className="goToMedicalFile" onClick={() => { navigate(props.medicalFile) }}>Accéder à son dossier médical</span>
                        <span className="goToConsultation" onClick={() => { navigate(props.consultation) }}>Ajouter une consultation</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="closeInfoPatient" onClick={handleClose}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </div>
        </div>
    );
}

const DoctorAppointments = () => {
    const [AppointmentList, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [documentList, setDocumentList] = useState([]);
    const mail = useMemo(() => ({mail: accountService.getEmail()}), []); // Crée une référence unique à mail

    useEffect(() => {
        axios.post("/doctors/appointments", mail).then(res => {
            const newData = res.data.map((appointment) => ({
                title: appointment[4] + ' ' + appointment[5],
                name: appointment[4] + '-' + appointment[5],
                start: appointment[1] + 'T' + appointment[2],
                end: appointment[1] + 'T' + appointment[3],
                id: appointment[0],
                idPatient: appointment[6]
            }));
            setAppointments(newData);
        });
    }, [mail]);

    const handleEventClick = (info) => {
        setSelectedAppointment(info.event);
        axios.post("/getDocumentPatient", { id: info.event.id }).then(res => {
            const newData = res.data;
            setDocumentList(newData);
        });
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null);
    };

    const downloadDocument = (doc) => {
        var data = Uint8Array.from(atob(doc[1]), c => c.charCodeAt(0));
        //const linkSource = `data:application/pdf;base64,${doc[1]}`;
        var blob = new Blob([data], { type: "octet/stream" });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = doc[0];
        link.click();
    }

    return (
        <div className="CalendarPatient">
            <div className="Calendar">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    height="auto"
                    allDaySlot={false}
                    nowIndicator={true}
                    slotEventOverlap={false}
                    headerToolbar={{
                        start: '',
                        center: 'prev title next today',
                        end: '',
                    }}
                    eventTextColor='black'
                    eventClassNames="fc-pointer-cursor"
                    eventBackgroundColor='#bcbcbc'
                    locale={frLocale}
                    slotMinTime="08:00:00"
                    slotMaxTime="18:00:00"
                    views={{
                        timeGrid: {
                            slotLabelFormat: [
                                {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    omitZeroMinute: false,
                                    meridiem: false,
                                }
                            ]
                        }
                    }}
                    events={AppointmentList}
                    eventClick={handleEventClick}
                />
            </div>
            <div className="InfoAppt">
                {selectedAppointment && (
                    <ConfirmationModal
                        appointment={selectedAppointment['title']}
                        date={new Date(selectedAppointment.start).toLocaleString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}
                        start={new Date(selectedAppointment.start).toLocaleString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                        end={new Date(selectedAppointment.end).toLocaleString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                        documents={documentList.length > 0 ?
                            documentList.map((document, index) => (
                                <div className="patient-document" key={index}>
                                    <p><span className="downloadDoc" onClick={() => downloadDocument(document)}>- {document[0]}</span></p>
                                </div>
                            )) :
                            <p>Aucun document ajouté.</p>
                        }
                        medicalFile={`/doctor/${selectedAppointment.extendedProps.name}/dossier-medical?id=${selectedAppointment.extendedProps.idPatient}`}
                        consultation={`/doctor/${selectedAppointment.extendedProps.name}/consultation?id=${selectedAppointment.extendedProps.idPatient}`}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
};

export default DoctorAppointments;
