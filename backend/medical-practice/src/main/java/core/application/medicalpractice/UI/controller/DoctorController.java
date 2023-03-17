package core.application.medicalpractice.UI.controller;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import core.application.medicalpractice.application.MedicalPractice;
import core.application.medicalpractice.domain.entity.Doctor;
import core.application.medicalpractice.domain.entity.Patient;
import core.application.medicalpractice.domain.valueObjects.Address;

@RestController
public class DoctorController {

	@Autowired
	private MedicalPractice medicalPractice;

	@RequestMapping(value = "/doctors", method = RequestMethod.GET, produces = "application/json")
	public List<Doctor> getAllDoctors() throws SQLException {
		return this.medicalPractice.getAllDoctors();
	}

	@RequestMapping(value = "/doctors/specialities", method = RequestMethod.GET, produces = "application/json")
	public List<String> getAllSpecialities() throws SQLException {
		return this.medicalPractice.getAllSpecialities();
	}

	@RequestMapping(value = "/doctors/{speciality}", method = RequestMethod.GET, produces = "application/json")
	public List<Doctor> getDoctorsBySpeciality(@PathVariable("speciality") String speciality) throws SQLException {
		return this.medicalPractice.getDoctorsBySpeciality(speciality);
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public void savePatient(
		@RequestParam(value = "firstname") String firstname, 
		@RequestParam(value ="lastname") String lastname, 
		@RequestParam(value ="gender") String gender,
		@RequestParam(value ="birthday") String birthday,
		@RequestParam(value ="numsocial") String numSocial,
		@RequestParam(value ="email") String email,
		@RequestParam(value ="street") String street,
		@RequestParam(value ="numstreet") int numStreet,
		@RequestParam(value ="postalcode") int postalCode,
		@RequestParam(value ="city") String city,
		@RequestParam(value ="password") String password) throws SQLException, ParseException{
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Date birthDay = format.parse(birthday);
			Address address = new Address(numStreet, street, city, postalCode);
			Patient patient = new Patient(firstname, lastname, gender, birthDay, numSocial, email, address, 0, 0);
			medicalPractice.savePatient(patient);
			medicalPractice.saveUser(email, password);
		}

}