package core.application.medicalpractice.UI.controller;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

	@RequestMapping(value = "/doctors/speciality={speciality}", method = RequestMethod.GET, produces = "application/json")
	public List<Doctor> getDoctorsBySpeciality(@PathVariable("speciality") String speciality) throws SQLException {
		return this.medicalPractice.getDoctorsBySpeciality(speciality);
	}

	@PostMapping(value = "/doctors/id={doctorid}")
	public Doctor getDoctorById(@PathVariable("doctorid") UUID doctorid) throws SQLException {
		return this.medicalPractice.getDoctorById(doctorid);
	}

	@RequestMapping(value = "/{firstname}-{lastname}/booking", method = RequestMethod.GET, produces = "application/json")
	public List<List<String>> displayAppointments(@PathVariable("firstname") String firstName,
			@PathVariable("lastname") String lastName) throws SQLException {
		return this.medicalPractice.displayAppointments(firstName, lastName);
	}

	@PostMapping(value = "/doctors/appointments")
	public List<List<String>> AllAppointmentsByDoctor(@RequestBody Map<String, String> map) throws SQLException {
		return medicalPractice.getAllAppointmentsDoctor(map.get("mail"));
	}

	@PostMapping(value = "/getPatients")
	public List<List<String>> getAllPatientByDoctor(@RequestBody Map<String, String> map) throws SQLException {
		return medicalPractice.getPatientsByDoctor(map.get("mail"));
	}

	@SuppressWarnings("unchecked")
	@PostMapping(value = "/prescriptions")
	public void addConsultation(@RequestBody Map<String, Object> map) throws SQLException, ParseException {
		String date = (String) map.get("date");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date parsed = format.parse(date);
		String firstName = (String) map.get("firstname");
		String lastName = (String) map.get("lastname");
		String motif = (String) map.get("motif");
		String mail = (String) map.get("mail");
		ArrayList<String> medicList = (ArrayList<String>) map.get("medicList");
		medicalPractice.addConsultation(mail, lastName, firstName, parsed, motif, medicList);
	}

	@PostMapping(value = "/getMedicalFile")
	public List<List<String>> getMedicalFile(@RequestBody Map<String, String> map) throws SQLException, ParseException {
		String firstname = map.get("firstname");
		String lastname = map.get("lastname");
		String mail = map.get("mail");
		return medicalPractice.getMedicalFile(mail, firstname, lastname);

	}
}
