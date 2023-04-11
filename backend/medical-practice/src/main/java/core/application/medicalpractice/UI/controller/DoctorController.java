package core.application.medicalpractice.UI.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

	@RequestMapping(value = "/doctors", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Doctor>> getAllDoctors() throws SQLException {
		try {
			List<Doctor> doctors = medicalPractice.getAllDoctors();
			return ResponseEntity.ok(doctors);
		} catch (SQLException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@RequestMapping(value = "/doctors/specialities", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> getAllSpecialities() throws SQLException {
		try {
			List<String> specialities = medicalPractice.getAllSpecialities();
			return ResponseEntity.ok(specialities);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@RequestMapping(value = "/doctors/speciality={speciality}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Doctor>> getDoctorsBySpeciality(@PathVariable("speciality") String speciality) throws SQLException {
		try {
			List<Doctor> doctorBySpeciality = medicalPractice.getDoctorsBySpeciality(speciality);
			if (doctorBySpeciality == null){
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return ResponseEntity.ok(doctorBySpeciality);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@RequestMapping(value = "/doctors/id={doctorid}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Doctor> getDoctorById(@PathVariable("doctorid") UUID doctorid) throws SQLException {
		try {
			Doctor doctor = medicalPractice.getDoctorById(doctorid);
			if (doctor == null){
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return ResponseEntity.ok(doctor);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping(value = "/informations-doctor")
	public ResponseEntity<List<String>> getInformationsDoctorByMail(@RequestBody Map<String, String> map) throws SQLException {
		try {
			List<String> informationsDoctor = medicalPractice.getInformationsDoctorByMail(map.get("mail"));
			if (informationsDoctor == null){
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return ResponseEntity.ok(informationsDoctor);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@RequestMapping(value = "/{firstname}-{lastname}/booking", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<List<String>>> displayAppointments(@PathVariable("firstname") String firstName,
			@PathVariable("lastname") String lastName) throws SQLException {
		
		try {
			List<List<String>> appointments = medicalPractice.displayAppointments(firstName, lastName);
			return ResponseEntity.ok(appointments);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping(value = "/doctors/appointments")
	public ResponseEntity<List<List<String>>> AllAppointmentsByDoctor(@RequestBody Map<String, String> map) throws SQLException {
		try {
			List<List<String>> appointmentsByDoctor = medicalPractice.getAllAppointmentsDoctor(map.get("mail"));
			return ResponseEntity.ok(appointmentsByDoctor);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping(value = "/getPatients")
	public ResponseEntity<List<HashMap<String, String>>> getAllPatientByDoctor(@RequestBody Map<String, String> map) throws SQLException {
		try {
			List<HashMap<String, String>> patientByDoctor = medicalPractice.getPatientsByDoctor(map.get("mail"));
			return ResponseEntity.ok(patientByDoctor);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
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
	public ResponseEntity<List<List<Object>>> getMedicalFile(@RequestBody Map<String, String> map) throws SQLException, ParseException {
		try {
			String firstname = map.get("firstname");
			String lastname = map.get("lastname");
			String mail = map.get("mail");
			List<List<Object>> medicalFile = medicalPractice.getMedicalFile(mail, firstname, lastname);
			return ResponseEntity.ok(medicalFile);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping(value = "/getDocumentPatient")
	public ResponseEntity<List<List<Object>>> getDocumentPatient(@RequestBody Map<String, String> map) throws SQLException, ParseException {
		try {
			String idAppt = map.get("id");
			List<List<Object>> medicalFile = medicalPractice.getDocumentPatient(idAppt);
			return ResponseEntity.ok(medicalFile);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping(value = "/getPriceConsultations")
	public ResponseEntity<List<Object>> getPriceConsultations(@RequestBody Map<String, String> map) throws SQLException, ParseException {
		try {
			String idDoctor = map.get("id");
			List<Object> price = medicalPractice.getPriceConsultations(idDoctor);
			return ResponseEntity.ok(price);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
