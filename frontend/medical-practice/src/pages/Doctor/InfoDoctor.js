import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilPictureF from './assets/ProfilPictureF.png';
import ProfilPictureM from './assets/ProfilPictureM.png';
import { useNavigate } from "react-router";
import Error from "../../utils/Error";


function InfoDoctor(selectedDoctorId) {

  const [Doctor, setDoctor] = useState();
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/doctors/id=${selectedDoctorId['selectedDoctorId']}`).then((response) => {
        const newData = response.data;
        setDoctor(newData);
        setHasError(false);
      })
      .catch((error) => {
        console.log(error)
        setHasError(true);
      });
  }, [selectedDoctorId]);

  if (hasError) {
    return <Error />;
  }

  const onClick = () => {
    navigate(`/${Doctor.speciality}/${Doctor.firstName}-${Doctor.lastName}/booking?id=${Doctor.id}`, { replace: true })
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