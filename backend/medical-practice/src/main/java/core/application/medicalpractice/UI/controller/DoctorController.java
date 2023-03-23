package core.application.medicalpractice.UI.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import core.application.medicalpractice.application.MedicalPractice;
import core.application.medicalpractice.domain.entity.*;

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

}
