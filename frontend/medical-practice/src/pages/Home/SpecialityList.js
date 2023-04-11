import React, {useState, useEffect} from "react";
import axios from "axios";
import './assets/specialityList.css';

function SpecialityList(){

    const [specialityList, setSpecialityList] = useState([]);
   
    useEffect(() =>{
        axios.get(`/doctors/specialities`).then(res => {
            const newData = res.data;
            setSpecialityList(newData);
        });
    }, []);

    const toggleMenu = () => {
        let optionMenu = document.querySelector(".SpecialityList");
        optionMenu.classList.toggle("activate");
    }

    const options = document.querySelectorAll(".option");
    const sBtn_text = document.querySelector(".sBtn-text");
    
    options.forEach(option => {
        option.addEventListener("click", () => {
            let selectedOption = option.querySelector(".option-text").innerText;
            sBtn_text.innerText = selectedOption;
            document.querySelector(".SpecialityList").classList.remove("activate");
        });
    });
 

    return(
        <div className="SpecialityList">
            <div className="select-btn" onClick={toggleMenu}>
                <span className="sBtn-text">Que cherchez vous ?</span>
            </div>

            <ul className="options">
                <li className="option">
                    <span className="option-text">Que cherchez vous ?</span>
                </li>
                {specialityList.map(speciality => (
                <li className="option" key={speciality}>
                    <span className="option-text">{speciality}</span>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default SpecialityList;