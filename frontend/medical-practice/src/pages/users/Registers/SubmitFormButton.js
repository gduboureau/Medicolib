import axios from "axios";

async function SubmitFormButton(){
 /* const gender = document.querySelector('input[name="gender"]:checked').value;
  const lastname = document.getElementById('lastname').value;
  const firstname = document.getElementById('firstname').value;
  const birthday = document.getElementById('birthday').value;
  const NumSocial = document.getElementById('NumSocialId').value;
  const email = document.getElementById('emailId').value;
  const street = document.getElementById('streetId').value;
  const numStreet = document.getElementById('numStreetId').value;
  const PostalCode = document.getElementById('PostalCodeId').value;
  const City = document.getElementById('CityId').value;
  const password = document.getElementById('password').value;
*/
  const infoJson = {    
    gender: document.querySelector('input[name="gender"]:checked').value,
    lastname: document.getElementById('lastname').value,
    firstname: document.getElementById('firstname').value,
    birthday: document.getElementById('birthday').value,
    numsocial: document.getElementById('NumSocialId').value,
    email: document.getElementById('emailId').value,
    street: document.getElementById('streetId').value,
    numstreet: document.getElementById('numStreetId').value,
    postalcode: document.getElementById('PostalCodeId').value,
    city: document.getElementById('CityId').value,
    password: document.getElementById('password').value
  }

  console.log(infoJson.birthday)

  axios.post('/register',{
    "data":infoJson
  }).then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default SubmitFormButton;