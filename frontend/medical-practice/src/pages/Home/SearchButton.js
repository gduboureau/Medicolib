import React from 'react'
import { useNavigate } from 'react-router-dom';
import './assets/searchButton.css';


function SearchButton(){

    const navigate = useNavigate();

    const searchBtn = () => {

        var select = document.querySelector(".sBtn-text");
        var speciality = select.innerText

        if (speciality !== "Que cherchez vous ?"){
            navigate(`docteurs/${speciality}`);
        }else{
            navigate(`/docteurs`);
        }
    }

    return(
        <div className='SearchButton'>
            <button className="btn-specialityList" onClick={searchBtn}>Rechercher</button>
        </div>
    );

}


export default SearchButton;