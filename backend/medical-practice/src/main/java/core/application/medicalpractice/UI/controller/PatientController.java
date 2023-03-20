package core.application.medicalpractice.UI.controller;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import core.application.medicalpractice.application.MedicalPractice;
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
}
