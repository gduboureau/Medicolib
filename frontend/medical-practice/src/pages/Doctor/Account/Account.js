import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";

import { accountService } from "../../users/Authentification/Sessionstorage";


const Account = () => {

    const [data, setData] = useState({
        firstName:"",
        lastName: "",
        speciality:"",
        informations:""
    });

    const [hasError, setHasError] = useState(false);

    const [priceConsultations, setPriceConsultations] = useState([]);

    let mail = { mail: accountService.getEmail() };

    useEffect(() => {
        axios.post("/informations-doctor", mail)
            .then((response) => {
                const newData = response.data;
                setData({
                    firstName: newData[1],
                    lastName: newData[2],
                    speciality: newData[4],
                    informations : newData[6]
                });
                getPriceConsultations(newData[0])
                setHasError(false);
            })
            .catch((error) => {
                console.log(error);
                setHasError(true);
            });
    }, []);

    const getPriceConsultations = (id) => {
        axios.post('/getPriceConsultations', { id: id }).then((response) => {
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
    }

    return (
        <div className="DoctorAccount">
            <div className="PersonalInfos">
                <p>
                    {data.firstName}
                </p>
                <p>
                    {data.lastName}
                </p>
                <p>
                    {data.speciality}
                </p>
                <p>
                    {data.informations}
                </p>
            </div>
            <div className="PriceInfo">
            {priceConsultations.map((price,index) =>(
                    <p key={index}>
                        {price[0]} : {price[1]}
                    </p>
                ))}
            </div>
        </div>
    )

}

export default Account;