import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PatientExist from './PatientExists';
import Error from "../Error";


const PatientGuard = ({children, name, patientId, doctorMail}) => {
    const [patientExists, setPatientExists] = useState(null);

    useEffect(() => {
        async function checkPatientExist() {
          const exists = await PatientExist(name, patientId, doctorMail);
          setPatientExists(exists);
        }
        checkPatientExist();
      }, [name, patientId, doctorMail]);

      if (patientExists === null) {
        // En attente de la vérification de l'existence de la spécialité
        return null;
      } else if (patientExists) {
        // La spécialité existe, retourner les enfants
        return children;
      } else {
        // La spécialité n'existe pas, retourner une redirection vers Error
        return <Error />;
      }
}

export default PatientGuard;