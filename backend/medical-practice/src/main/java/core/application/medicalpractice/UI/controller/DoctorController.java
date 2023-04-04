package core.application.medicalpractice.UI.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

	@RequestMapping(value = "/doctors/id={doctorid}", method = RequestMethod.GET, produces = "application/json")
	public Doctor getDoctorById(@PathVariable("doctorid") UUID doctorid) throws SQLException {
		return this.medicalPractice.getDoctorById(doctorid);
	}

	@PostMapping(value = "/informations-doctor")
	public List<String> getInformationsDoctorByMail(@RequestBody Map<String, String> map) throws SQLException {
		return this.medicalPractice.getInformationsDoctorByMail(map.get("mail"));
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
	public List<HashMap<String, String>> getAllPatientByDoctor(@RequestBody Map<String, String> map) throws SQLException {
		return medicalPractice.getPatientsByDoctor(map.get("mail"));
	}

	//@SuppressWarnings("unchecked")
	@PostMapping(value = "/prescriptions")
	public ResponseEntity<String> addConsultation(@RequestParam(name = "file", required = false)  MultipartFile file, @RequestParam("mail") String mail, @RequestParam("firstname") String firstname, @RequestParam("lastname") String lastname, @RequestParam("date") String date, @RequestParam("motif") String motif) throws SQLException, ParseException {
		Date d = new SimpleDateFormat("yyyy-MM-dd").parse(date);
		if(file != null){
			try {
				String fileName = file.getOriginalFilename();
				byte[] fileContent = file.getBytes();
				medicalPractice.addConsultation(mail, lastname, firstname, d, motif, fileName, fileContent);
				return ResponseEntity.ok("Consultation added successfully");
			} catch (IOException e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add consultation");
			}
		}
		else {
			medicalPractice.addConsultation(mail, lastname, firstname, d, motif, null, null);
			return ResponseEntity.ok("Consultation added successfully");
		}

	}

	@PostMapping(value = "/getMedicalFile")
	public List<List<Object>> getMedicalFile(@RequestBody Map<String, String> map) throws SQLException, ParseException {
		String firstname = map.get("firstname");
		String lastname = map.get("lastname");
		String mail = map.get("mail");
		return medicalPractice.getMedicalFile(mail, firstname, lastname);

	}
}
