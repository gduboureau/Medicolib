import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router";
import { accountService } from "../users/Authentification/LocalStorage";

let mail = accountService.getEmail();

const Booking = () => {

    const { name } = useParams();

    const [AppointmentList, setAppointmentList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/${name}/booking`).then(res => {
            const newData = res.data;
            setAppointmentList(newData);
        });
    }, [name]);

    const onClick = (id) => {
        axios.post('/makeappointment', { id, mail })
        .then((response) => {
            console.log(response);
            navigate("/admin/appointments")
        })
        .catch((error) => {
            console.log(error);
        })

    }


    return (
        <div>
            <p>Choisissez la date de la consultation</p>
            {AppointmentList.map((appointment, index) => (
                <button className="doctor-card" key={index} onClick={() => onClick(appointment[0])} >
                    <p>{appointment[2]}</p>
                    <p>{appointment[3]}</p>
                </button>
            ))}
        </div>
    );
}

export default Booking;