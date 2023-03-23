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

    console.log();
    
    return (
        <div>
            {AppointmentList.map((appointment,index) => (
                <button className="doctor-card" key={index}>
                    <p>{appointment[1]} {appointment[2]}</p>
                    <p>{appointment[3]}</p>
                    <p>{appointment[4]}</p>
                    <p>{appointment[5]}</p>
                    <button>Annulez le rendez-vous</button>
                </button>
            ))}
        </div>
    );
};

export default Appointments;