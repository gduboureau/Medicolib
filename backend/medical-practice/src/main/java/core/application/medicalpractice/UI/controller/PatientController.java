package core.application.medicalpractice.UI.controller;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import core.application.medicalpractice.application.MedicalPractice;
import core.application.medicalpractice.domain.entity.Address;
import core.application.medicalpractice.domain.entity.Patient;

@RestController
public class PatientController {

    @Autowired
	private MedicalPractice medicalPractice;

    @PostMapping(value = "/register")
	public void savePatient(@RequestBody Map<String, String> map) throws SQLException, ParseException {
		String firstName = map.get("firstName");
		String lastName = map.get("lastName");
		String gender = map.get("gender");
		String date = map.get("date");
		String mail = map.get("mail");
		String password = map.get("password");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date parsed = format.parse(date);
		if (!medicalPractice.checkPatientExist(mail)) {
			Patient patient = new Patient(firstName, lastName, gender, parsed, password, mail, null, 0, 0);
			medicalPractice.savePatient(patient);
		}
		if (!medicalPractice.checkLoginExist(mail, password)) {
			medicalPractice.saveUser(mail, password);
		}
	}

	@PostMapping(value = "/informations-patient")
	public List<String> getInformationsPatient(@RequestBody Map<String, String> map) throws SQLException {
		return medicalPractice.getInformationsPatient(map.get("mail"));
	}

	@PostMapping(value = "/modify-informations")
	public void modifyInformationPatient(@RequestBody Map<String, String> map) throws SQLException, ParseException{
		String firstName = map.get("firstName");
		String lastName = map.get("lastName");
		String gender = map.get("gender");
		String date = map.get("date");
		String mail = map.get("email");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date parsed = format.parse(date);
		String newPassword = map.get("password");
		float height = Float.parseFloat(map.get("height"));
		float weight = Float.parseFloat(map.get("weight"));

		int NumRue = Integer.parseInt(map.get("NumRue"));
		String NomRue = map.get("NomRue");
		int postalCode = Integer.parseInt(map.get("PostalCode"));
		String city = map.get("City");

		Address addr = new Address(NumRue, NomRue, city, postalCode);
		Patient patient = new Patient(firstName, lastName, gender, parsed, "",mail, addr, weight, height);
		
		medicalPractice.savePatient(patient);
		medicalPractice.resetPassword(mail, newPassword);
	}
}
