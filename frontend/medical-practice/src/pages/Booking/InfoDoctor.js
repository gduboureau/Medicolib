import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfilPictureF from './assets/ProfilPictureF.png';
import ProfilPictureM from './assets/ProfilPictureM.png';
import Error from "../../utils/Error";
import './assets/infoDoctor.css'
import imagePrice from './assets/etiqueter.png'
import imageinformation from './assets/information.png'
import imageContact from './assets/email.png'

function InfoDoctor(selectedDoctorId) {

  const [Doctor, setDoctor] = useState();
  const [hasError, setHasError] = useState(false);
  const [priceConsultations, setPriceConsultations] = useState([]);

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
    axios.post('/getPriceConsultations', { id: selectedDoctorId['selectedDoctorId'] }).then((response) => {
      const newData = response.data;
      const tmp = []
      for (let i = 0; i < newData.length; i += 2) {
        tmp.push([newData[i], newData[i + 1]]);
      }
      setPriceConsultations(tmp)
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

  return (
<div className="infoDoctor">
      <div className="mainInformations">
        <div className="imgDoctor">
          {Doctor?.gender === 'F' ? (
            <img src={ProfilPictureF} alt="Profil Female" />
          ) : Doctor?.gender === 'M' ? (
            <img src={ProfilPictureM} alt="Profil Male" />
          ) : null}
        </div>
        <div className="informations">
          {Doctor?.gender !== undefined && Doctor?.lastName !== undefined && Doctor?.speciality !== undefined ? (
            <div className="personalInformations">
              <p>Dr. {Doctor?.firstName} {Doctor?.lastName}</p>
              <p>{Doctor?.speciality}</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="extraInformations">
        <div className="title-price">
          <img className="img-title" src={imagePrice} alt='img-png' /> {/* https://www.flaticon.com/fr/icones-gratuites/euro" */}
          <div className="title">Tarifs</div>
        </div>
        {priceConsultations.map((price, index) => (
          <div className="priceAndName" key={index}>
            <span className="name">{price[0]} : &nbsp;</span>
            <span className="price">{price[1]} €</span>
          </div>
        ))}
        <div className="title-informations">
          <img className="img-title" src={imageinformation} alt='img-png' /> {/*"https://www.flaticon.com/fr/icones-gratuites/info" */}
          <div className="title">Informations</div>
        </div>
        <p className="doctor-informations">
          {Doctor?.informations}
        </p>
        <div className="title-contact">
          <img className="img-title" src={imageContact} alt='img-png' /> {/* https://www.flaticon.com/fr/icones-gratuites/email" */}
          <div className="title">Contact</div>
        </div>
        <p className="doctor-contact">
          {Doctor?.mail}
        </p>
      </div>
    </div>
  );
}
export default InfoDoctor;