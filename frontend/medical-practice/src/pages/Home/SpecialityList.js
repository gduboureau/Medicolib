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

    const searchBtn = (e) => {
        e.preventDefault();
        console.log(speciality);
    }


    return(
        <div>
        <select className="dropdown-specialityList" value={speciality} onChange={handleChange}>
            <option value="">Que cherchez vous ?</option>
            {specialityList.map(speciality => (
                <option key={speciality}>{speciality}</option>
            ))
            }
        </select>

    <button className="btn btn-specialityList" onClick={searchBtn}>Rechercher</button>

    </div>
    );
}

export default SpecialityList;