import axios from "axios";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import './assets/DoctorList.css';
import { useNavigate } from 'react-router-dom';


function ArrayDoctors(){

    const { speciality } = useParams();
    const [DoctorList, setDoctorList] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        if (speciality!==null && speciality!==undefined){
            axios.get(`/doctors/speciality=${speciality}`).then(res => {
                const newData = res.data;
                setDoctorList(newData);
            })
            .catch((error) => {
                console.log(error)
            })
        }else{
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
        const name = firstName+"-"+lastName;
        sessionStorage.setItem('selectedDoctorId', id);
        navigate(`/${speciality}/${name}`);
    }

    return(
        <div>
            {DoctorList.map((doctor, index) => (
                <button className="doctor-card" key={index} onClick={() => SelectedDoctor(doctor.id, doctor.firstName, doctor.lastName, doctor.speciality)}>
                    <p>{doctor.firstName}</p>
                    <p>{doctor.lastName}</p>
                    <p>{doctor.speciality}</p>
                </button>
            ))}
        </div>
    );
}

export default ArrayDoctors;