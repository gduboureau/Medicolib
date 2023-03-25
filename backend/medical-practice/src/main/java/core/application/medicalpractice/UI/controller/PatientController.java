package core.application.medicalpractice.UI.controller;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import core.application.medicalpractice.application.MedicalPractice;
import core.application.medicalpractice.domain.entity.Address;
import core.application.medicalpractice.domain.entity.Patient;

@RestController
public class PatientController {

	@Autowired
	private MedicalPractice medicalPractice;

	@PostMapping(value = "/register")
	public ResponseEntity<?> savePatient(@RequestBody Map<String, String> map) throws SQLException, ParseException {
		String firstName = map.get("firstName");
		String lastName = map.get("lastName");
		String gender = map.get("gender");
		String date = map.get("date");
		String mail = map.get("mail");
		String password = map.get("password");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date parsed = format.parse(date);
		if (medicalPractice.checkPatientExist(mail, firstName, lastName)) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Vous avez déjà un compte, veuillez vous connecter.");
		}
		if (!medicalPractice.checkPatientExist(mail, firstName, lastName)) {
			Patient patient = new Patient(firstName, lastName, gender, parsed, "", mail, new Address(1, " ", " ", 1), 0,
					0);
			medicalPractice.saveAddress(patient);
			medicalPractice.savePatient(patient);
		}
		if (!medicalPractice.checkLoginExist(mail, password)) {
			medicalPractice.saveUser(mail, password);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping(value = "/informations-patient")
	public List<String> getInformationsPatient(@RequestBody Map<String, String> map) throws SQLException {
		return medicalPractice.getInformationsPatient(map.get("mail"));
	}

	@PostMapping(value = "/modify-informations")
	public void modifyInformationPatient(@RequestBody Map<String, String> map) throws SQLException, ParseException {
		String mail = map.get("email");
		String firstName = map.get("firstName");
		String lastName = map.get("lastName");
		String gender = map.get("gender");
		String date = map.get("date");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date parsed = format.parse(date);
		String newPassword = map.get("password");
		float height = Float.parseFloat(map.get("height"));
		float weight = Float.parseFloat(map.get("weight"));
		String NumSocial = map.get("numSocial");
		Address addr = null;
		try {
			int NumRue = Integer.parseInt(map.get("NumRue"));
			int postalCode = Integer.parseInt(map.get("PostalCode"));
			String NomRue = map.get("NomRue");
			String city = map.get("City");
			addr = new Address(NumRue, NomRue, city, postalCode);
		} catch (Exception e) {
			addr = medicalPractice.getAddress(mail);
		}

		UUID idPatient = UUID.fromString(medicalPractice.getInformationsPatient(mail).get(0));

		Patient patient = new Patient(idPatient, firstName, lastName, gender, parsed, NumSocial, mail, addr, weight,
				height);
		medicalPractice.saveAddress(patient);
		medicalPractice.savePatient(patient);
		if (newPassword != null) {
			medicalPractice.resetPassword(mail, newPassword);
		}
	}

	@PostMapping(value = "/appointments")
	public List<List<String>> AllAppointmentByPatient(@RequestBody Map<String, String> map)
			throws SQLException, ParseException {
		return medicalPractice.getAppointmentByPatient(map.get("mail"));
	}

	@PostMapping(value = "/makeappointment")
	public void makeAnAppointment(@RequestBody HashMap<String, String> map) throws SQLException {
		String id = map.get("id");
		String mail = map.get("mail");
		medicalPractice.makeAnAppointment(id, mail);
	}

	@PostMapping(value = "/cancelappointment")
	public void cancelAppointment(@RequestBody HashMap<String, String> map) throws SQLException {
		String id = map.get("id");
		medicalPractice.cancelAppointment(id);
	}

}
