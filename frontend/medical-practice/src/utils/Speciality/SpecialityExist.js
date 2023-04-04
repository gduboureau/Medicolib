import axios from "axios";

async function SpecialityExist(speciality) {
  if (speciality === undefined) {
    return true;
  }

  try {
    const res = await axios.get(`/doctors/specialities`);
    const specialityList = res.data;
    const exists = specialityList.includes(speciality);
    return exists;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default SpecialityExist;