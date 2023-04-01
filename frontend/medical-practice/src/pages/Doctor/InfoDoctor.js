import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilPictureF from './assets/ProfilPictureF.png';
import ProfilPictureM from './assets/ProfilPictureM.png';
import { useNavigate, useParams } from "react-router";


function InfoDoctor() {

  const selectedDoctorId = sessionStorage.getItem('selectedDoctorId');
  const [Doctor, setDoctor] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/doctors/id=${selectedDoctorId}`).then((response) => {
      const newData = response.data;
      setDoctor(newData);
    });
  }, [selectedDoctorId]);

  const onClick = () => {
    navigate(`/${Doctor.speciality}/${Doctor.firstName}-${Doctor.lastName}/booking`, { replace: true })
  }

  return (
    <div>
      {Doctor?.gender === 'F' ? (
        <img src={ProfilPictureF} alt="Profil Female" />  
      ) : Doctor?.gender === 'M' ? (
        <img src={ProfilPictureM} alt="Profil Male" />
      ) : null}
      {Doctor?.gender !== undefined && Doctor?.lastName !== undefined && Doctor?.speciality !== undefined ? (
        <div>
          <p>Dr. {Doctor?.firstName} {Doctor?.lastName}, {Doctor?.speciality}.</p>
          <button onClick={onClick} className="go-to-booking" >Prendre un RDV</button>
        </div>
      ) : null}
    </div>
  );
}
export default InfoDoctor;