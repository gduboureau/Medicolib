import axios from "axios";
import React, {useState, useEffect} from "react";


function SearchButton(){

    const searchBtn = (e) => {

        e.preventDefault();
        var select = document.getElementById('dropdown-specialityList');
        var speciality = select.options[select.selectedIndex].value;

        document.location.href="/doctors/"+speciality;
    }

    return(
        <div>
            <button className="btn btn-specialityList" onClick={searchBtn}>Rechercher</button>
        </div>
    );

}


export default SearchButton;