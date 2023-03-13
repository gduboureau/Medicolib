import React, {useState, useEffect} from "react";
import axios from "axios";

function SpecialityList(){

    const [speciality, setSpeciality] = useState("");
    const [specialityList, setSpecialityList] = useState([]);
   
    useEffect(() =>{
        axios.get(`/doctors/specialities`).then(res => {
            const newData = res.data;
            setSpecialityList(newData);
        });
    }, []);

    const handleChange = (event) => {
        setSpeciality(event.target.value);
    }

    return(
        <div>
        <select id="dropdown-specialityList" value={speciality} onChange={handleChange}>
            <option value="">Que cherchez vous ?</option>
            {specialityList.map(speciality => (
                <option id="spe" key={speciality}>{speciality}</option>
            ))
            }
        </select>

    </div>
    );
}

export default SpecialityList;