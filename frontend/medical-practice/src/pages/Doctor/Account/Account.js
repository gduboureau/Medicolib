import React from "react";
import axios from 'axios';
import { useState, useEffect, useMemo } from "react";
import Error from "../../../utils/Error";
import './assets/account.css'
import { accountService } from "../../users/Authentification/Sessionstorage";


const Account = () => {

    const [data, setData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        speciality: "",
        gender: "",
    });

    const [informationDoctor, setInformationDoctor] = useState({
        informations: ""
    })

    const [credentials, setCredentials] = useState({
        mail: "",
        password: ""
    })

    const [hasError, setHasError] = useState(false);

    const [priceConsultations, setPriceConsultations] = useState([]);
    const [prevPriceConsultations, setprevPriceConsultations] = useState([]);
    const [deletedPrice, setDeletedPrice] = useState([]);

    const mail = useMemo(() => ({ mail: accountService.getEmail() }), []); // Crée une référence unique à mail

    useEffect(() => {
        axios.post("/informations-doctor", mail)
            .then((response) => {
                const newData = response.data;
                setData({
                    id: newData[0],
                    firstName: newData[1],
                    lastName: newData[2],
                    gender: newData[3],
                    speciality: newData[4],
                });
                setInformationDoctor({
                    informations: newData[6]
                })
                setCredentials({
                    mail: newData[5],
                    password: ""
                })
                getPriceConsultations(newData[0])
                setHasError(false);
            })
            .catch((error) => {
                console.log(error);
                setHasError(true);
            });
    }, [mail]);

    const getPriceConsultations = (id) => {
        axios.post('/getPriceConsultations',{id:id}).then((response) => {
            const newData = response.data;
            const tmp = []
            for (let i = 0; i < newData.length; i += 2) {
                tmp.push([newData[i], newData[i + 1]]);
            }
            setprevPriceConsultations(tmp);
            setPriceConsultations(tmp);
            setHasError(false);
        })
            .catch((error) => {
                console.log(error)
                setHasError(true);
            });
    }

    const handleChangePersoInfo = (e) => {
        const { name, value } = e.target;
        if (name === "lastName" || name === "firstName") {
          setData((prevState) => ({
            ...prevState,
            [name]: value.toLowerCase().charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
          }));
        }else{
          setData((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
      }

    const handleChangeCredentials = (e) => {
        const { name, value } = e.target;
        if (name === "mail"){
            setCredentials((prevState) => ({
              ...prevState,
              [name]: value.toLowerCase(),
            }));
        }else{
            setCredentials((prevState) => ({
              ...prevState,
              [name]: value,
            }));
        }
    }

    const modifyPersonalInformations = (e) => {
        e.preventDefault();
        axios.post('/modifyInfoPersoDoctor', data).then((response) => {
        })
        .catch((error) => {
            console.log(error);
            setHasError(true);
        });
    }

    const modifyConnexionInformations = (e) => {
        e.preventDefault();
        accountService.saveEmail(credentials.mail)
        axios.post('/modifyCredentialsDoctor', {
            id : data.id,
            password : credentials.password,
            mail: credentials.mail,
            prevMail : mail.mail
        }).then((response) => {
            const newData = response.data;
            console.log(newData);
        })
        .catch((error) => {
            console.log(error);
            setHasError(true);
        });
    }

    const modifyProfessionalInformations = (e) => {
        const donnee = {
            id : data.id,
            informations : informationDoctor.informations,
            price : priceConsultations,
            prevPrice: prevPriceConsultations,
            deletedPrice: deletedPrice
        }
        e.preventDefault();
        axios.post('/modifyProInfoDoctor', donnee).then((response) => {
            const newData = response.data;
            console.log(newData);
            setPriceConsultations(donnee.price)
            setprevPriceConsultations(donnee.price)
        })
        .catch((error) => {
            console.log(error);
            setHasError(true);
        });
    }

    const addRow = () => {
        setPriceConsultations([...priceConsultations, ['', '']]);
    }

    const deleteRow = (index) => {
        const updatedPriceConsultations = [...priceConsultations];
        const deletedPriceConsultation = updatedPriceConsultations.splice(index, 1)[0];
        setPriceConsultations(updatedPriceConsultations);
        setDeletedPrice(prevDeletedPrice => prevDeletedPrice.concat(deletedPriceConsultation));
    }

    const handleValueChange = (e, index) => {
        const { name, value } = e.target;
        const updatedPriceConsultations = [...priceConsultations];
        updatedPriceConsultations[index] = [name, value];
        setPriceConsultations(updatedPriceConsultations);
    };

    const handleNameChange = (e, index) => {
        const { value } = e.target;
        const updatedPriceConsultations = [...priceConsultations];
        updatedPriceConsultations[index] = [value, updatedPriceConsultations[index][1]];
        setPriceConsultations(updatedPriceConsultations);
    };

    const handleInfoChange = (e) => {
        const { name, value } = e.target;
        setInformationDoctor(prevState => ({ ...prevState, [name]: value }));
    }

    if (hasError) {
        return <Error />;
    }

    return (
        <div className="DoctorAccount">
            <div>
                <div className="PersonalInfos">
                    <form onSubmit={modifyPersonalInformations} className="form-editDoctorAccount">
                        <div className="title">
                            Mes informations personnelles
                        </div>
                        <div className="name">
                            <label className="doctorFirstname">
                                <p>Prénom</p>
                                <input type="text" name="firstName" defaultValue={data.firstName} onChange={handleChangePersoInfo} />
                            </label>
                            <label className="doctorLastname">
                                <p>Nom</p>
                                <input type="text" name="lastName" defaultValue={data.lastName} onChange={handleChangePersoInfo} />
                            </label>
                        </div>
                        <div className="gender-speciality">
                            <label className="doctorSpeciality"> 
                                <p >Spécialité</p>
                                <input type="text" title="Veuillez voir avec l'administrateur pour changer la spécialité" name="speciality"  defaultValue={data.speciality} readOnly/>
                            </label>
                            <label className="doctorGender">
                                <p>Homme
                                    <input type="radio" id="h" name="gender" value="M" checked={data.gender === "M"} onChange={handleChangePersoInfo} />
                                </p>
                                <p>Femme
                                    <input type="radio" id="f" name="gender" value="F" checked={data.gender === "F"} onChange={handleChangePersoInfo} />
                                </p>
                            </label>
                        </div>
                        <div className="div-modif-info-doctor">
                            <button type="submit" className="btn modif-info-doctor">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
                <div className="userInformation">
                    <form onSubmit={modifyConnexionInformations} className="form-editDoctorConnexion">
                        <div className="title-info-perso">
                            Mes informations de connexion
                        </div>
                        <div className="login">
                            <label className="doctorMail">
                                <p>Mail</p>
                                <input type="mail" name="mail" defaultValue={credentials.mail} onChange={handleChangeCredentials} />
                            </label>
                            <label className="doctorpassword">
                                <p>Mot de passe</p>
                                <input type="password" name="password" onChange={handleChangeCredentials} placeholder="Nouveau mot de passe"/>
                            </label>
                        </div>
                        <div className="div-modif-cred-doctor">
                            <button type="submit" className="btn modif-cred-doctor">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="PriceInfo">
                <form onSubmit={modifyProfessionalInformations} className="form-editDoctorPro">
                    <div className="title-info-pro">
                        Mes informations professionnelles
                    </div>
                    <div className="priceConsultations">
                        <div className="title-tarif">
                            Vos tarifs appliqués :
                        </div>
                        <div className="tableau-tarif">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nom de la consulation</th>
                                        <th>Tarifs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {priceConsultations.map((price, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    name={price[0]}
                                                    value={price[0]}
                                                    onChange={(e) => handleNameChange(e, index)} required/>
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name={price[0]}
                                                    value={price[1]}
                                                    onChange={(e) => handleValueChange(e, index)} required/> €
                                                <button onClick={() => deleteRow(index)}>-</button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="2">
                                            <button onClick={addRow}>+</button>
                                            Ajouter un nouveau tarif
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="informations">
                        <div className="title-tarif">
                            Informations affichées aux patients lors de la réservation :
                        </div>
                        <div>
                            <textarea id="message" name="informations" rows="5" cols="50" defaultValue={informationDoctor.informations} onChange={(e) => handleInfoChange(e)}></textarea>
                        </div>
                    </div>
                    <div className="div-modif-pro-doctor">
                        <button type="submit" className="btn modif-pro-doctor">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Account;