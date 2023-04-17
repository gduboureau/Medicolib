import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DoctorExist from './DoctorExists';
import Error from "../Error";


const DoctorGuard = ({children, speciality, name, id}) => {
    const [doctorExists, setDoctorExists] = useState(null);

    useEffect(() => {
        async function checkDoctorExist() {
          const exists = await DoctorExist(speciality, name, id);
          setDoctorExists(exists);
        }
        checkDoctorExist();
      }, [speciality, name, id]);

      if (doctorExists === null) {
        // En attente de la vérification de l'existence de la spécialité
        return null;
      } else if (doctorExists) {
        // La spécialité existe, retourner les enfants
        return children;
      } else {
        // La spécialité n'existe pas, retourner une redirection vers Error
        return <Error />;
      }
}

export default DoctorGuard;