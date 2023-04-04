import axios from "axios";


async function DoctorExist(speciality, name, id){
    const firstName = name.split("-")[0];
    const lastName = name.split("-")[1];

    try {
        const res = await axios.get(`/doctors/speciality=${speciality}`);
        const doctorList = res.data;
        const exists = doctorList.some(
          (doctor) => doctor.lastName === lastName && doctor.firstName === firstName && doctor.id === id
        );
        return exists;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    
    export default DoctorExist;