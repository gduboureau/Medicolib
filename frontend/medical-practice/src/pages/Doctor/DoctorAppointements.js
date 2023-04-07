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
import {useNavigate} from "react-router";


function ConfirmationModal(props) {
    const navigate = useNavigate();
    const handleClose = () => {
        props.onClose();
    };
    return (
        <div className="showInfoAppt">
            <div className="modalAppt">
                <Modal.Header>
                            <Modal.Title>Rendez-vous avec {props.appointment}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>- Date : {props.date}</p>
                    <p>- Heure de début : {props.start}</p>
                    <p>- Heure de fin : {props.end}</p>
                    <div>
                        <a className="addedDocument">Document(s) ajouté(s) : </a>
                        {props.documents}
                    </div>
                    <a className="goToMedicalFile" onClick={() => {navigate(props.medicalFile)}}>Accéder à son dossier médical</a>
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
    let mail = { mail: accountService.getEmail() };

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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                    eventBackgroundColor='#dd8b5580'
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
                            )):
                            <p>Aucun document ajouté.</p>
                        }
                        medicalFile={`/doctor/${selectedAppointment.extendedProps.name}/dossier-medical?id=${selectedAppointment.extendedProps.idPatient}`}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
};

export default DoctorAppointments;
