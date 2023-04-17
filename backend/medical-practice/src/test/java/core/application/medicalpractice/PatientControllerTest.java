package core.application.medicalpractice;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

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

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import core.application.medicalpractice.UI.controller.PatientController;
import core.application.medicalpractice.application.MedicalPractice;
import core.application.medicalpractice.domain.entity.Address;
import core.application.medicalpractice.domain.entity.Patient;

public class PatientControllerTest {

    @Mock
    private MedicalPractice medicalPractice;

    @InjectMocks
    private PatientController patientController;

    private MockMvc mockMvc;
    
    @BeforeEach
    void initializeValue() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(patientController).build();
    }

    @Test
    void testAllAppointmentByPatient() throws SQLException, ParseException {
        Map<String, String> map = new HashMap<>();
		map.put("mail", "patient@test.com");
        List<List<String>> appointments = new ArrayList<>();
        List<String> appt1 = new ArrayList<>();
        appt1.add("94b9b73a-f561-4ca9-a6c3-6ae7e0361773");
        appt1.add("John");
        appt1.add("Doe");
        appt1.add("2023-03-31 09:00:00");
        appt1.add("2023-03-31 09:15:00");
        appointments.add(appt1);
        when(medicalPractice.getAppointmentByPatient(medicalPractice.getPatientByMail("patient@test.com"))).thenReturn(appointments);
        ResponseEntity<List<List<String>>> response = patientController.AllAppointmentByPatient(map);

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(appointments, response.getBody());
    }

    @Test
	public void testAllAppointmentByPatientInternalServerError() throws SQLException, ParseException {
		Map<String, String> map = new HashMap<>();
		map.put("mail", "test@test.com");
		when(medicalPractice.getAppointmentByPatient(medicalPractice.getPatientByMail("patient@test.com"))).thenThrow(SQLException.class);

		ResponseEntity<List<List<String>>> response = patientController.AllAppointmentByPatient(map);

		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
	}

    @Test
    void testCancelAppointment() throws ParseException, SQLException {
        HashMap<String, String> map = new HashMap<>();
        map.put("id", "41e61a68-77e2-4f70-b37b-ca097d70ad29");
        String mail = "johndoe@gmail.com";
        medicalPractice.makeAnAppointment(map.get("id"), medicalPractice.getPatientByMail(mail));
        ResponseEntity<String> response = patientController.cancelAppointment(map);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Appointment cancelled", response.getBody());
    }

    @Test
    void testDeleteDocument() throws SQLException, IOException {
        HashMap<String, String> mockMap = new HashMap<>();
        mockMap.put("apptid", "94b9b73a-f561-4ca9-a6c3-6ae7e0361773");
        mockMap.put("mail", "johndoe@gmail.com");
        MockMultipartFile file = new MockMultipartFile("test", "test.txt", "text/plain", "file content".getBytes());
        patientController.uploadFile(file, mockMap.get("mail"), mockMap.get("apptid"));
        HashMap<String, String> map = new HashMap<>();
        map.put("id", "94b9b73a-f561-4ca9-a6c3-6ae7e0361773");
        map.put("name", file.getName());
        ResponseEntity<String> response = patientController.deleteDocument(map);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("File deleted successfully", response.getBody());
    }

    @Test
    void testGetAppointmentDateById() throws SQLException {
        HashMap<String, String> map = new HashMap<>();
        map.put("id", "94b9b73a-f561-4ca9-a6c3-6ae7e0361773");
        String mail = "johndoe@gmail.com";
        medicalPractice.makeAnAppointment(map.get("id"), medicalPractice.getPatientByMail(mail));
        ResponseEntity<Date> response = patientController.getAppointmentDateById(map);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testGetDocument() throws SQLException, IOException {
        List<List<Object>> documents = new ArrayList<>();
        List<Object> doc1 = new ArrayList<>();
        MockMultipartFile file1 = new MockMultipartFile("test1", "test1.txt", "text/plain", "file content".getBytes());
        doc1.add("94b9b73a-f561-4ca9-a6c3-6ae7e0361773");
        doc1.add(file1);
        documents.add(doc1);
        when(medicalPractice.getDocument(medicalPractice.getPatientByMail("johndoe@gmail.com"))).thenReturn(documents);
        HashMap<String, String> map = new HashMap<>();
        map.put("mail", "johndoe@gmail.com");
        ResponseEntity<List<List<Object>>> response = patientController.getDocument(map);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(documents, response.getBody());
    }

    @Test
    void testGetInformationsPatient() throws ParseException, SQLException {
        String mail = "johndoe@example.com";
        Map<String, String> map = new HashMap<>();
        map.put("mail", mail);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = format.parse("2023-04-03");
        Patient patient = new Patient(UUID.fromString("dccf9cfd-f2cc-4e44-8357-dd4140e17b73"),
        "John" , "Doe", "M", date, "54165", "johndoe@gmail.com", null, 0, 0);
        when(medicalPractice.getPatientByMail(mail)).thenReturn(patient);
        ResponseEntity<Patient> response = patientController.getInformationsPatient(map);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(patient, response.getBody());
    }

    @Test
    void testGetPrescriptionsByPatient() {
    }

    @Test
    void testMakeAnAppointment() throws SQLException {
        HashMap<String, String> requestBody = new HashMap<>();
        requestBody.put("id", "94b9b73a-f561-4ca9-a6c3-6ae7e0361773");
        requestBody.put("mail", "johndoe@example.com");
        ResponseEntity<String> response = patientController.makeAnAppointment(requestBody);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Appointment added", response.getBody());
    }

    @Test
    void testMakeAnAppointmentWithBadArg() throws SQLException {
        HashMap<String, String> requestBody = new HashMap<>();
        requestBody.put("id", null);
        requestBody.put("mail", "johndoe@example.com");
        ResponseEntity<String> response = patientController.makeAnAppointment(requestBody);
        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    void testModifyInformationPatient() throws SQLException, ParseException {
		Map<String, String> inputMap = new HashMap<String, String>();
		inputMap.put("email", "johndoe@example.com");
		inputMap.put("firstName", "John");
		inputMap.put("lastName", "Doe");
		inputMap.put("gender", "M");
		inputMap.put("date", "1990-01-01");
		inputMap.put("password", "mdp");
		inputMap.put("height", "180");
		inputMap.put("weight", "80");
		inputMap.put("numSocial", "123456789");
		inputMap.put("NumRue", "10");
		inputMap.put("NomRue", "Main Street");
		inputMap.put("PostalCode", "12345");
		inputMap.put("City", "New York");
        List<String> infoPatient = new ArrayList<>();
        infoPatient.add("94b9b73a-f561-4ca9-a6c3-6ae7e0361773");
        infoPatient.add("John");
        infoPatient.add("Doe");
        infoPatient.add("M");
        infoPatient.add("1990-01-01");
        infoPatient.add("170");
        infoPatient.add("70");
        infoPatient.add("johndoe@example.com");
		infoPatient.add("10");
		infoPatient.add("Main Street");
		infoPatient.add("12345");
		infoPatient.add("New York");
        when(medicalPractice.getAddress(medicalPractice.getPatientByMail("johndoe@example.com"))).thenReturn(new Address(20, "Park Avenue", "New York", 54321));
		when(medicalPractice.getInformationsPatient("johndoe@example.com")).thenReturn(infoPatient);
		ResponseEntity<String> response = patientController.modifyInformationPatient(inputMap);
		verify(medicalPractice).getInformationsPatient("johndoe@example.com");
		verify(medicalPractice).saveAddress(any(Patient.class));
		verify(medicalPractice).savePatient(any(Patient.class));
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals("Informations modified", response.getBody());
    }

    @Test
public void testModifyInformationPatient_InternalServerError() throws Exception {
    Map<String, String> inputMap = new HashMap<String, String>();
    inputMap.put("email", "johndoe@example.com");
    inputMap.put("firstName", "John");
    inputMap.put("lastName", "Doe");
    inputMap.put("gender", "M");
    inputMap.put("date", "1990-01-01");
    inputMap.put("password", "mdp");
    inputMap.put("height", "180");
    inputMap.put("weight", "80");
    inputMap.put("numSocial", "123456789");
    inputMap.put("NumRue", "10");
    inputMap.put("NomRue", "Main Street");
    inputMap.put("PostalCode", "12345");
    inputMap.put("City", "New York");

    // Mock the medicalPractice object to throw an exception
    when(medicalPractice.getInformationsPatient(anyString())).thenThrow(new SQLException());

    // Execution
    ResponseEntity<String> response = patientController.modifyInformationPatient(inputMap);

    // Verification
    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
}

    @Test
    void testSavePatient() throws SQLException, ParseException {
    }

    @Test
    void testUploadFile() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain","test content".getBytes());
        mockMvc.perform(MockMvcRequestBuilders.multipart("/addDocument")
                .file(file)
                .param("mail", "johndoe@example.com")
                .param("apptid", "123"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("File uploaded successfully"));
    }

}
