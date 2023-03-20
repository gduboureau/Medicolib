import React from 'react'
import { useNavigate } from 'react-router-dom';


function SearchButton(){

    const navigate = useNavigate();

    const searchBtn = () => {

        var select = document.getElementById('dropdown-specialityList');
        var speciality = select.options[select.selectedIndex].value;

        if (speciality !== ""){
            navigate(`/docteurs/${speciality}`);
        }else{
            navigate(`/docteurs`);
        }
    }

    return(
        <div>
            <button className="btn btn-specialityList" onClick={searchBtn}>Rechercher</button>
        </div>
    );

}


export default SearchButton;