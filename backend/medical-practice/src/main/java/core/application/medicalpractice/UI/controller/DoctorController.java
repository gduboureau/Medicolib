package core.application.medicalpractice.UI.controller;

import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.application.medicalpractice.application.MedicalPractice;
import core.application.medicalpractice.domain.entity.Doctor;
import core.application.medicalpractice.domain.entity.Patient;
import core.application.medicalpractice.domain.entity.User;
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

	@PostMapping(value = "/register")
	public ResponseEntity<User> savePatient(@RequestBody User user) throws SQLException {
		System.out.println(user.toString());
		User userSaved = new User(user.getFirstName(), user.getLastName(), user.getGender(), user.getMail(), user.getPassword());
		medicalPractice.saveUser(user.getMail(), user.getPassword());
		// Patient patient = new Patient(user.getFirstName(), user.getLastName(), user.getGender(), null, null, user.getMail(), null, 0, 0);
		//medicalPractice.savePatient(patient);
		return new ResponseEntity<User>(userSaved, HttpStatus.CREATED);
	}
	

}