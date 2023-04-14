package core.application.medicalpractice.UI.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import core.application.medicalpractice.application.MedicalPractice;
import core.application.medicalpractice.domain.entity.Address;
import core.application.medicalpractice.domain.entity.Patient;

@RestController
public class PatientController {

	@Autowired
	private MedicalPractice medicalPractice;

	@Autowired
	public JavaMailSender javaMailSender;

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
		if (medicalPractice.checkPatientExist(mail)) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN)
					.body("Vous avez déjà un compte, veuillez vous connecter.");
		}
		if (!medicalPractice.checkPatientExist(mail)) {
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
	public ResponseEntity<List<String>> getInformationsPatient(@RequestBody Map<String, String> map)
			throws SQLException {
		if (map.get("mail") == null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
		try {
			return ResponseEntity.ok(medicalPractice.getInformationsPatient(map.get("mail")));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

	@PostMapping(value = "/modify-informations")
	public ResponseEntity<String> modifyInformationPatient(@RequestBody Map<String, String> map)
			throws SQLException, ParseException {
		try {
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
			return ResponseEntity.ok("Informations modified");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

	@PostMapping(value = "/appointments")
	public ResponseEntity<List<List<String>>> AllAppointmentByPatient(@RequestBody Map<String, String> map)
			throws SQLException, ParseException {
		try {
			return ResponseEntity.ok(medicalPractice.getAppointmentByPatient(map.get("mail")));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping(value = "/makeappointment")
	public ResponseEntity<String> makeAnAppointment(@RequestBody HashMap<String, String> map) throws SQLException {
		try {
			String id = map.get("id");
			String mail = map.get("mail");
			medicalPractice.makeAnAppointment(id, mail);
			if (mail == null || id == null) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
			}

			List<Object> timeDate = medicalPractice.getDateAndTimeAppt(id);

			if (!timeDate.isEmpty()) {
				SimpleMailMessage message = new SimpleMailMessage();
				message.setTo(mail);

				LocalDate date = (LocalDate) timeDate.get(0);

				int day = date.getDayOfMonth();
				String month = date.getMonth().getDisplayName(TextStyle.FULL, Locale.FRENCH);
				int year = date.getYear();

				String subject = "Confirmation de prise de rendez-vous du " + day + " " + month + " " + year;
				message.setSubject(subject);

				String body = "Nous vous confirmons le rendez-vous du " + day + " " + month + " " + year + " à "
						+ timeDate.get(1).toString() +
						". Nous vous remercions de bien vouloir annuler votre rendez-vous si vous ne pouvez pas l'assurer."
						+
						" Si vous avez des documents à transmettre à votre docteur, n'hésitez pas à les lui faire suivre depuis votre compte, dans la section mes rendez-vous. "
						+
						" A très bientôt, votre cabinet médical Medicolib.";
				message.setText(body);
				javaMailSender.send(message);
			}

			return ResponseEntity.ok("Appointment added");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping(value = "/cancelappointment")
	public ResponseEntity<String> cancelAppointment(@RequestBody HashMap<String, String> map) throws SQLException {
		try {
			String id = map.get("id");
			String mail = map.get("mail");
			if (id == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			} else {
				List<Object> timeDate = medicalPractice.getDateAndTimeAppt(id);

				if (!timeDate.isEmpty()) {

					LocalDate date = (LocalDate) timeDate.get(0);

					int day = date.getDayOfMonth();
					String month = date.getMonth().getDisplayName(TextStyle.FULL, Locale.FRENCH);
					int year = date.getYear();

					SimpleMailMessage message = new SimpleMailMessage();
					message.setTo(mail);

					String subject = "Annulation de votre rendez-vous du " + day + " " + month + " " + year;
					message.setSubject(subject);

					String body = "Votre rendez-vous du " + day + " " + month + " " + year + " à "
							+ timeDate.get(1).toString() +
							" a dû être annulé. Si vous n'êtes pas à l'origine de cette demande, cela vient alors de votre docteur. Dans ce cas, n'hésitez pas à nous contacter"
							+ " pour plus d'informations. Vous pouvez également reprendre un rendez-vous directement sur le site."
							+ " A très bientôt, votre cabinet médical Medicolib.";
					message.setText(body);
					javaMailSender.send(message);
				}
				medicalPractice.cancelAppointment(id);
				return ResponseEntity.ok("Appointment cancelled");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

	@PostMapping("/addDocument")
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
			@RequestParam("mail") String mail, @RequestParam("apptid") String id) throws SQLException {
		try {
			String fileName = file.getOriginalFilename();
			byte[] fileContent = file.getBytes();
			medicalPractice.saveDocument(fileName, fileContent, mail, id);
			return ResponseEntity.ok("File uploaded successfully");
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
		}
	}

	@PostMapping("/getDocuments")
	public ResponseEntity<List<List<Object>>> getDocument(@RequestBody HashMap<String, String> map)
			throws SQLException, IOException {
		try {
			String mail = map.get("mail");
			if (mail == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			List<List<Object>> documents = medicalPractice.getDocument(mail);
			return ResponseEntity.ok(documents);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

	}

	@PostMapping("/getTimeAppt")
	public ResponseEntity<Date> getAppointmentDateById(@RequestBody HashMap<String, String> map) throws SQLException {
		try {
			String idAppt = map.get("id");
			if (idAppt == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			Date date = medicalPractice.getAppointmentDateById(idAppt);
			return ResponseEntity.ok().body(date);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/deleteDocuments")
	public ResponseEntity<String> deleteDocument(@RequestBody HashMap<String, String> map)
			throws SQLException, IOException {
		try {
			String idAppt = map.get("id");
			String docName = map.get("name");
			if (docName == null || idAppt == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			medicalPractice.deleteDocument(idAppt, docName);
			return ResponseEntity.ok("File deleted successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

	@PostMapping("/getPrescriptions")
	public ResponseEntity<List<List<Object>>> getPrescriptionsByPatient(@RequestBody HashMap<String, String> map)
			throws SQLException, IOException {
		try {
			String mail = map.get("mail");
			List<List<Object>> documents = medicalPractice.getPrescriptionsByPatient(mail);
			return ResponseEntity.ok(documents);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

	}

}
