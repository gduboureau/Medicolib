import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilPictureF from './assets/ProfilPictureF.png';
import ProfilPictureM from './assets/ProfilPictureM.png';
import { useNavigate, useParams } from "react-router";


function Header(props) {

  const { selectedDoctorId } = props;
  const [Doctor, setDoctor] = useState("");
  const { speciality } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`/doctors/id=${selectedDoctorId}`).then(res => {
      const newData = res.data;
      setDoctor(newData);
    });
  }, [selectedDoctorId]);

  const onClick = () => {
    navigate(`/${Doctor.speciality}/${Doctor.firstName}-${Doctor.lastName}/booking`, { replace: true })
  }

  return (
    <div>
      {Doctor.gender === 'F' ? (
        <img src={ProfilPictureF} alt="Profil Female" />  /*"https://www.freepik.com/free-vector/profile-icons-pack-hand-drawn-style_18156023.htm#query=profile%20avatar&position=5&from_view=keyword&track=ais">Image by pikisuperstar on Freepik*/
      ) : Doctor.gender === 'M' ? (
        <img src={ProfilPictureM} alt="Profil Male" />
      ) : null}
      {Doctor.gender !== undefined && Doctor.lastName !== undefined && Doctor.speciality !== undefined ? (
        <div>
          <p>Dr. {Doctor.firstName} {Doctor.lastName}, {Doctor.speciality}.</p>
          <button onClick={onClick} className="go-to-booking" >Prendre un RDV</button>
        </div>
      ) : null}
    </div>
  );
}
export default Header;