import React, { useState } from 'react';
import axios from 'axios';
import { accountService } from '../users/Authentification/Sessionstorage';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDF from './PDFPrescription';

const Consultation = () => {

  const [medicaments, setMedicaments] = useState(['']);

  const [showInputs, setShowInputs] = useState(false);

  let url = window.location.pathname

  const [infoConsultation, setInfoConsultation] = useState({
    date: '',
    motif: '',
    mail: accountService.getEmail(),
    firstname: url.split("/")[2].split("-")[0],
    lastname: url.split("/")[2].split("-")[1],
    medicList: {}
  })

  const ordonnanceName = "ordonnance-" + infoConsultation.firstname + "-" + infoConsultation.lastname + ".pdf"


  const handleAddMedicament = () => {
    setMedicaments([...medicaments, '']); // ajouter un nouveau champ vide
  };

  const handleRemoveMedicament = (index) => {
    const newMedicaments = [...medicaments];
    newMedicaments.splice(index, 1); // supprimer le champ correspondant à l'index
    setMedicaments(newMedicaments);
  };

  const handleMedicamentChange = (index, event) => {
    const newMedicaments = [...medicaments];
    newMedicaments[index] = event.target.value;
    setMedicaments(newMedicaments);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Object.keys(medicaments).map(
      (key) => medicaments[key]
    );
    infoConsultation.medicList = medicaments;
    axios.post("/prescriptions", infoConsultation).then(res => {
      const newData = res.data;
      console.log(newData);
    });

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
                <label htmlFor={`medicament-${index}`}>Préscription {index + 1} :</label>
                <input
                  id={`medicament-${index}`}
                  type="text"
                  value={medicament}
                  onChange={(event) => handleMedicamentChange(index, event)}
                  required
                />
                <button type="button" onClick={() => handleRemoveMedicament(index)}>-</button>
              </div>
            ))}
            <button type="button" onClick={handleAddMedicament}>+</button>
          </div>
        </>
      )}
      <div>
        <button onClick={handleSubmit}>Enregistrer</button>
      </div>
      <div>
        <PDFDownloadLink document={<PDF infoConsultation={infoConsultation} medicaments={medicaments} />
        } fileName={ordonnanceName}>
          {({ blob, url, loading, error }) =>
            loading ? 'Chargement...' : 'Télécharger le PDF'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default Consultation;