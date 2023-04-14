import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './assets/DoctorList.css';
import { useNavigate } from 'react-router-dom';
import ProfilPictureF from '../Booking/assets/ProfilPictureF.png';
import ProfilPictureM from '../Booking/assets/ProfilPictureM.png';
import DoctorCardBooking from "./DoctorCardBooking";


function ArrayDoctors() {

    const { speciality } = useParams();
    const [DoctorList, setDoctorList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (speciality !== null && speciality !== undefined) {
            axios.get(`/doctors/speciality=${speciality}`).then(res => {
                const newData = res.data;
                setDoctorList(newData);
            })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            axios.get(`/doctors`).then(res => {
                const newData = res.data;
                setDoctorList(newData);
            })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [speciality]);

    const SelectedDoctor = (id, firstName, lastName, speciality) => {
        const name = firstName + "-" + lastName;
        navigate(`/${speciality}/${name}?id=${id}`);
    }

    return (
        <div className="doctorlist">
            {DoctorList.map((doctor, index) => (
                <div className="doctor-card" key={index}>
                    <div className="doctor-card-infos">
                        <div>
                            {doctor?.gender === 'F' ? (
                                <img src={ProfilPictureF} alt="Profil Female" />
                            ) : doctor?.gender === 'M' ? (
                                <img src={ProfilPictureM} alt="Profil Male" />
                            ) : null}
                        </div>
                        <div className="doctor-card-details">
                            <p className="name">Dr {doctor.firstName} {doctor.lastName}</p>
                            <p className="speciality">{doctor.speciality}</p>
                            <button onClick={() => SelectedDoctor(doctor.id, doctor.firstName, doctor.lastName, doctor.speciality)}>Prendre rendez-vous</button>
                        </div>
                    </div>
                    <div className="doctor-card-planning">
                        <DoctorCardBooking doctorid={doctor.id}/>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ArrayDoctors;