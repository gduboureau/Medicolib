import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { accountService } from '../../users/Authentification/Sessionstorage';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import PDF from './PDFPrescription';
import { format } from '../../../utils/DateFormat';
import { useMemo } from 'react';
import moment from 'moment';

import Validation from './assets/validation.png'

import "./assets/consultation.css"

const Consultation = () => {

  const today = moment().format('YYYY-MM-DD');

  const message = document.querySelector('#message');

  const [medicaments, setMedicaments] = useState(['']);
  const [showInputs, setShowInputs] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mail = useMemo(() => ({ mail: accountService.getEmail() }), []); // Crée une référence unique à mail

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    speciality: "",
    mail: ""
  });

  useEffect(() => {
    axios.post("/informations-doctor", mail)
      .then((response) => {
        const newData = response.data;
        setData({
          firstName: newData[1],
          lastName: newData[2],
          speciality: newData[4],
          mail: mail.mail
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mail]);

  let url = window.location.pathname

  const [infoConsultation, setInfoConsultation] = useState({
    date: today,
    motif: '',
    mail: accountService.getEmail(),
    firstname: url.split("/")[2].split("-")[0],
    lastname: url.split("/")[2].split("-")[1],
  })

  const handleAddMedicament = () => {
    setMedicaments([...medicaments, '']);
  };

  const handleRemoveMedicament = (index) => {
    const newMedicaments = [...medicaments];
    newMedicaments.splice(index, 1);
    setMedicaments(newMedicaments);
  };

  const handleMedicamentChange = (index, event) => {
    const newMedicaments = [...medicaments];
    newMedicaments[index] = event.target.value;
    setMedicaments(newMedicaments);
  };

  const ordonnanceName = infoConsultation.motif + "-" + format.formatDate(infoConsultation.date) + ".pdf"

  const generatePdf = async () => {
    const blob = await pdf(<PDF data={data} infoConsultation={infoConsultation} medicaments={medicaments} />).toBlob();
    const file = new Blob([blob], { type: 'application/pdf' });
    return file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true)

    if (medicaments[0] === "") {
      const params = new URLSearchParams();
      params.append('mail', accountService.getEmail());
      params.append('firstname', infoConsultation.firstname);
      params.append('lastname', infoConsultation.lastname);
      params.append('date', infoConsultation.date);
      params.append('motif', infoConsultation.motif);
      try {
        await axios.post('/prescriptions', params);
        console.log('Prescription submitted');
      } catch (error) {
        console.log(error);
      }
    } else {
      let pdf = await generatePdf();
      let document = new FormData();
      if (pdf !== null) {
        document.append("file", pdf, ordonnanceName);
        const params = new URLSearchParams();
        params.append('mail', accountService.getEmail());
        params.append('firstname', infoConsultation.firstname);
        params.append('lastname', infoConsultation.lastname);
        params.append('date', infoConsultation.date);
        params.append('motif', infoConsultation.motif);
        axios.post('/prescriptions', document, {
          params,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((response) => {
          console.log(response);
        })
          .catch((error) => {
            console.log(error);
          }, []);
      }
    }
    message.style.display = 'block';
    setTimeout(() => {
      message.style.display = 'none';
    }, 5000);
  };

  const handleRadioChange = (e) => {
    if (window.event.target.value === "showInputs") {
      setShowInputs(true);
    } else {
      setShowInputs(false);
    }
  };

  const onChange = (e) => {
    setInfoConsultation({ ...infoConsultation, [e.target.name]: e.target.value });
  }

  return (
    <div className='consultation'>
      <p>Ajouter une consultation</p>
      <div className='sub-consultation'>
        <form className='consultation-form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='date'>
              <p>Date</p>
              <input type="date" id="date" name="date"  defaultValue={today} onChange={onChange} required></input>
            </label>
          </div>
          <div>
            <label htmlFor='motif'>
              <p>Motif de la consultation</p>
              <input type="text" id="motif" name="motif" onChange={onChange} required></input>
            </label>
          </div>
          <div>
            <label htmlFor="prescription">
              <p>Ajouter une ordonnance</p>
            </label>
            <label className='prescription'>
              <input type="radio" name="option" value="showInputs" onChange={handleRadioChange} required /> Oui
              <input type="radio" name="option" defaultChecked onChange={handleRadioChange} /> Non
            </label>
          </div>
          {showInputs && (
            <>
              <div className='prescription-text'>
                {medicaments.map((medicament, index) => (
                  <div key={index}>
                    <label htmlFor={`medicament-${index}`}>Prescription {index + 1} : </label>
                    <textarea
                      id={`medicament-${index}`}
                      rows="2"
                      value={medicament}
                      onChange={(event) => handleMedicamentChange(index, event)}
                      required
                    />
                    <div className='prescription-buttons'>
                      <button type="button" onClick={handleAddMedicament}>+</button>
                      <button type="button" onClick={() => handleRemoveMedicament(index)}>-</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div>
            <button type='submit'>Enregistrer</button>
            <label id="message" style={{ display: "none", marginTop: "30px", color: "green" }}>
              <img src={Validation} alt='validation' />
              Consultation ajoutée
            </label>
          </div>
        </form>
        <div>
          {showInputs && isSubmitted && medicaments[0] !== "" && medicaments[0] !== undefined && (
            <div className='download-pdf'>
              <PDFDownloadLink document={<PDF data={data} infoConsultation={infoConsultation} medicaments={medicaments} />} fileName={ordonnanceName} className="link-pdf">
                {({ blob, url, loading, error }) =>
                  loading ? 'Chargement...' : 'Télécharger le PDF'
                }
              </PDFDownloadLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Consultation;