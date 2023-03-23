import React, {useState, useEffect} from "react";
import axios from 'axios';
import { accountService } from "../users/Authentification/LocalStorage";

const Appointments = () => {

    let mail = {mail : accountService.getEmail()};

    const [AppointmentList, setAppointments] = useState([]);

    useEffect(() =>{
        axios.post("/appointments", mail).then(res => {
            const newData = res.data;
            setAppointments(newData); 
        });
    }, []);

    const onClick = (id) => {
        axios.post('/cancelappointment', { id })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })

    }

    return (
        <div>
            {AppointmentList.map((appointment,index) => (
                <h3 className="doctor-card" key={index}>
                    <p>{appointment[1]} {appointment[2]}</p>
                    <p>{appointment[3]}</p>
                    <p>{appointment[4]}</p>
                    <p>{appointment[5]}</p>
                    <button onClick={() => onClick(appointment[0])}>Annuler le rendez-vous</button>
                </h3>
            ))}
        </div>
    );
};

export default Appointments;