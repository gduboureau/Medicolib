import SpecialityExist from "./SpecialityExist";
import Error from "../Error";
import { useEffect, useState } from "react";

const SpecialityGuard = ({ children, speciality }) => {
    const [specialityExists, setSpecialityExists] = useState(null);

    useEffect(() => {
      async function checkSpecialityExist() {
        const exists = await SpecialityExist(speciality);
        setSpecialityExists(exists);
      }
      checkSpecialityExist();
    }, [speciality]);
  
    if (specialityExists === null) {
      // En attente de la vérification de l'existence de la spécialité
      return null;
    } else if (specialityExists) {
      // La spécialité existe, retourner les enfants
      return children;
    } else {
      // La spécialité n'existe pas, retourner une redirection vers /404
      return <Error />;
    }
  };

export default SpecialityGuard; 