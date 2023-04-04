import axios from "axios";


async function PatientExist(name, patientId, doctorMail){
    const firstName = name.split("-")[0];
    const lastName = name.split("-")[1];

    try {
        const res = await axios.post(`/getPatients`, {mail: doctorMail});
        const patientList = res.data;
        const exists = patientList.some(
          (patient) => patient["firstName"] === firstName && patient["lastName"] === lastName && patient["id"] === patientId
        );
        return exists;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    
    export default PatientExist;