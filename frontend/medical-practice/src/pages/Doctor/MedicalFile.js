import React, { useEffect, useState } from "react";
import axios from "axios";
import { accountService } from "../users/Authentification/Sessionstorage";

const MedicalFile = () => {
    let url = window.location.pathname

    let mail = accountService.getEmail()

    let firstname = url.split("/")[2].split("-")[0];
    let lastname = url.split("/")[2].split("-")[1];

    const [data, setData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        gender: "",
        date: "",
        weight: "",
        height: "",
        mail: "",
        address: "",
        numSS: "",
        dateConsult: "",
        prescription: "",
    });

    useEffect(() => {
        axios.post("/getMedicalFile", { mail, firstname, lastname }).then(res => {
            const newData = res.data;
            setData({
                id: newData[0],
                firstName: newData[1],
                lastName: newData[2],
                gender: newData[3],
                date: newData[4],
                weight: newData[5],
                height: newData[6],
                mail: newData[7],
                address: newData[8],
                numSS: newData[9],
                dateConsult: newData[10],
                prescription: newData[11]
            });
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>

        </div>
    )
}

export default MedicalFile;