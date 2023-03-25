import React, { useState, useEffect } from "react";
import axios from 'axios';
import { accountService } from "../users/Authentification/LocalStorage";


const DoctorAppointments = () => {
    let mail = { mail: accountService.getEmail() };

    const [AppointmentList, setAppointments] = useState([]);

    useEffect(() => {
        axios.post("/doctors/appointments", mail).then(res => {
            const newData = res.data;
            console.log(newData)
            setAppointments(newData);
        });
    }, []);




    return (
        <div>
            {AppointmentList.map((appointment, index) => (
                <div className="doctor-card" key={index}>
                    <p>{appointment[1]} </p>
                    <p>{appointment[2]} - {appointment[3]}</p>
                    <p>{appointment[4]} {appointment[5]}</p>
                    <p></p>
                </div>
            ))}
        </div>
    )
}


export default DoctorAppointments;