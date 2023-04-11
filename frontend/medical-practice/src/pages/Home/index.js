import React from 'react';
import './assets/index.css';
import SearchButton from './SearchButton';
import {useState, useEffect} from "react";
import SpecialityList from "./SpecialityList";
import Doctors from './assets/doctors.png';
import Calendar from './assets/calendar.png';
import Documents from './assets/folders.png';

function HomePage() {

  const [currentSpecialityShow, setCurrentSpecialityShow] = useState(0);
  const [specialityList, setSpecialityList] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpecialityShow(
        (currentSpecialityShow) => (currentSpecialityShow + 1) % specialityList.length
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [specialityList.length]);

  useEffect(() => {
    const swipeTimeout = setTimeout(() => {
      const element = document.querySelector(".swipe-up");
      element.classList.add("swipe-down");
      setTimeout(() => {
        element.classList.remove("swipe-down");
      }, 1200);
    }, 3000);
  
    return () => clearTimeout(swipeTimeout);
  }, [currentSpecialityShow]);

  return (
<div className="HomePage">
  <div className="search-container">
    <h1>Trouvez le rendez-vous qu'il vous faut, 
    <p className='swipe-up'>{specialityList[currentSpecialityShow]}</p>
    </h1>
    <div className='navbar-wrap'>
      <div className='dropdown-container'>
        <SpecialityList setSpecialityList={setSpecialityList} />
      </div>
      <div className="separator"></div>
      <div className='button-container'>
        <SearchButton />
      </div>
    </div>
  </div>
  <h2>Ne laissez plus la prise de rendez-vous médicaux être une source de stress, prenez soin de votre santé en toute simplicité</h2>
  <div id="informations">
    <div className='information'>
      <p>Des professionnels de santé à votre disposition</p>
      <img src={Doctors} alt="Doctors" className="doctors-icon"/>
      <span>Des professionnels de la santé sont à votre disposition pour répondre à vos besoins médicaux. Chaque practicien est hautement qualifié, expérimenté et dévoué à fournir des soins personnalisés de qualité pour répondre aux besoins individuels de chaque patient. </span>
    </div>
    <div className='information'>
      <p>De nombreux créneaux de rendez-vous disponible</p>
      <img src={Calendar} alt="Calendar" className="calendar-icon"/>
      <span> Nous comprenons que la flexibilité est importante pour nos patients, c'est pourquoi nous proposons des horaires de rendez-vous pratiques et adaptables. Nous sommes là pour vous aider à trouver un créneau qui convient à votre emploi du temps. </span>
    </div>
    <div className='information'>
      <p>Organisez l'ensemble de vos documents médicaux</p>
      <img src={Documents} alt="Documents" className="documents-icon"/>
      <span>Medicolib offre un service de gestion de documents médicaux complet. Notre service de gestion de documents médicaux vous permet de consulter et de partager facilement vos documents avec des professionnel de santé, où que vous soyez.</span>
    </div>
  </div>
  <hr/>
</div>
  );
}

export default HomePage;