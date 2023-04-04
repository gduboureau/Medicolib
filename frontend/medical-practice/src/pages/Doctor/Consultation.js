import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { accountService } from '../users/Authentification/Sessionstorage';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import PDF from './PDFPrescription';
import formatDate from '../../utils/DateFormat';
import { useMemo } from 'react';

const Consultation = () => {
  const [medicaments, setMedicaments] = useState(['']);
  const [showInputs, setShowInputs] = useState(false);
  const [pdfOutput, setPdfOutput] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mail = useMemo(() => ({mail: accountService.getEmail()}), []); // Crée une référence unique à mail

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
    date: '',
    motif: '',
    mail: accountService.getEmail(),
    firstname: url.split("/")[2].split("-")[0],
    lastname: url.split("/")[2].split("-")[1],
  })

  const ordonnanceName = infoConsultation.motif + "-" + formatDate(infoConsultation.date) + ".pdf"


  const handleAddMedicament = () => {
    setMedicaments([...medicaments, '']); // ajouter un nouveau champ vide
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

  const generatePdf = async () => {
    const blob = await pdf(<PDF data={data} infoConsultation={infoConsultation} medicaments={medicaments} />).toBlob();
    const file = new Blob([blob], { type: 'application/pdf' });
    setPdfOutput(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true)
    if (medicaments[0] === "") {
      const params = new URLSearchParams();
      params.append('mail', accountService.getEmail());
      params.append('firstname', infoConsultation.firstname);
      params.append('lastname', infoConsultation.lastname);
      params.append('date', infoConsultation.date);
      params.append('motif', infoConsultation.motif);
      axios.post('/prescriptions', params)
        .catch((error) => console.log(error))
    } else {
      generatePdf();
      let document = new FormData();
      if (pdfOutput !== null) {
        document.append("file", pdfOutput, ordonnanceName);
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
    <div>
      <div>
        <label htmlFor="date">Date</label>
        <input id="daterdv" type="date" name="date" onChange={onChange} />
      </div>
      <label htmlFor='motif'> Motif de la consultation</label>
      <input type="text" id="motif" name="motif" onChange={onChange}>
      </input>
      <div>
        <label htmlFor="prescription">Ajouter une ordonnance</label>
      </div>
      <label>
        <input type="radio" name="option" value="showInputs" onChange={handleRadioChange} /> Oui
      </label>
      <label>
        <input type="radio" name="option" defaultChecked onChange={handleRadioChange} /> Non
      </label>
      {showInputs && (
        <>
          <div>
            {medicaments.map((medicament, index) => (
              <div key={index}>
                <label htmlFor={`medicament-${index}`}>Prescription {index + 1} : </label>
                <input
                  id={`medicament-${index}`}
                  type="text"
                  value={medicament}
                  onChange={(event) => handleMedicamentChange(index, event)}
                  required
                />
                <button type="button" onClick={handleAddMedicament}>+</button>
                <button type="button" onClick={() => handleRemoveMedicament(index)}>-</button>
              </div>
            ))}
          </div>
        </>
      )}
      <div>
        <button onClick={handleSubmit}>Enregistrer</button>
      </div>
      <div>
        {isSubmitted && medicaments[0] !== "" && medicaments[0] !== undefined && (
          <div>
            <PDFDownloadLink document={<PDF data={data} infoConsultation={infoConsultation} medicaments={medicaments} />} fileName={ordonnanceName}>
              {({ blob, url, loading, error }) =>
                loading ? 'Chargement...' : 'Télécharger le PDF'
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Consultation;