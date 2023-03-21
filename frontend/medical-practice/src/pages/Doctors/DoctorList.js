import axios from "axios";
import React, {useState, useEffect} from "react";
import '../../assets/DrSpecialityPage.css';
import { useNavigate } from 'react-router-dom';

function ArrayDoctors(){

    const [DoctorList, setDoctorList] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get(`/doctors`).then(res => {
            const newData = res.data;
            setDoctorList(newData); 
        });
    }, []);

    const SelectedDoctor = (firstName, lastName, speciality) => {
        navigate(`/docteurs/${firstName}-${lastName}-${speciality}`);
    }

    return(
        <div>
            {DoctorList.map((doctor,index) => (
                <button className="doctor-card" key={index} onClick={() => SelectedDoctor(doctor.firstName, doctor.lastName, doctor.speciality)}>
                    <p>{doctor.firstName}</p>
                    <p>{doctor.lastName}</p>
                    <p>{doctor.speciality}</p>
                </button>
            ))}
            
        </div>
    );
}

export default ArrayDoctors;