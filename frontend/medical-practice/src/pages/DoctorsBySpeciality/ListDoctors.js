import axios from "axios";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import '../../assets/DrSpecialityPage.css';

function ArrayDoctors(){

    const { speciality } = useParams();
    const [DoctorList, setDoctorList] = useState([]);

    useEffect(() =>{
        axios.get(`/doctors/${speciality}`).then(res => {
            const newData = res.data;
            setDoctorList(newData);
        });
    });


    return(
        <div>
            {DoctorList.map((doctor, index) => (
                <div className="doctor-card" key={index} >
                    <p>{doctor.firstName}</p>
                    <p>{doctor.lastName}</p>
                    <p>{doctor.speciality}</p>
                </div>
            ))}
        </div>
    );
}

export default ArrayDoctors;