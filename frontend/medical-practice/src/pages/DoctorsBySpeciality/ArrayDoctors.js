import axios from "axios";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import '../../assets/DrSpecialityPage.css';
import { useNavigate } from 'react-router-dom';

function ArrayDoctors(){

    const { speciality } = useParams();
    const [DoctorList, setDoctorList] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get(`/doctors/${speciality}`).then(res => {
            const newData = res.data;
            setDoctorList(newData);
        });
    }, [speciality]);

    const SelectedDoctor = (firstName, lastName, speciality) => {
        navigate(`/doctors/${firstName}-${lastName}-${speciality}`);
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