import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import axios from 'axios';
import { accountService } from "../users/Authentification/LocalStorage";

const DoctorAppointments = () => {
    const [AppointmentList, setAppointments] = useState([]);
    let mail = { mail: accountService.getEmail() };

    useEffect(() => {
        axios.post("/doctors/appointments", mail).then(res => {
            const newData = res.data.map((appointment) => ({
                title: appointment[4] + ' ' + appointment[5],
                start: appointment[1] + 'T' + appointment[2],
                end: appointment[1] + 'T' + appointment[3]
            }));
            console.log(newData)
            setAppointments(newData);
        });
    }, []);

    return (
        <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            initialView="timeGridWeek"
            height="auto"
            nowIndicator={true}
            headerToolbar={{
                start: 'title',
                center: '',
                end: 'prev,next today'
            }}
            editable={false}
            selectable={false}
            eventTextColor='#ffffff'
            eventBackgroundColor='#007bff'
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
                            meridiem: false
                        }
                    ]
                }
            }}
            events={AppointmentList}
        />
    );
};

export default DoctorAppointments;
