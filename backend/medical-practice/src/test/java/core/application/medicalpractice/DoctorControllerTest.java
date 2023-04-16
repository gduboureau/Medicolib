package core.application.medicalpractice;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import core.application.medicalpractice.UI.controller.DoctorController;
import core.application.medicalpractice.application.MedicalPractice;
import core.application.medicalpractice.domain.entity.Doctor;
import core.application.medicalpractice.domain.entity.Patient;

public class DoctorControllerTest {

    @Mock
    private MedicalPractice medicalPractice;

    @InjectMocks
    private DoctorController doctorController;

    private MockMvc mockMvc;

    @BeforeEach
    void initializeValue() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(doctorController).build();
    }
    
    @Test
    void testAllAppointmentsByDoctor() throws SQLException {
		Map<String, String> map = new HashMap<>();
		map.put("mail", "test@gmail.com");
        
        List<List<String>> appointments = new ArrayList<>();
        List<String> appt1 = new ArrayList<>();
        appt1.add("94b9b73a-f561-4ca9-a6c3-6ae7e0361773");
        appt1.add("John");
        appt1.add("Doe");
        appt1.add("2023-03-31 09:00:00");
        appt1.add("2023-03-31 09:15:00");
        appointments.add(appt1);
        when(medicalPractice.getAllAppointmentsDoctor(medicalPractice.getInformationsDoctorByMail("test@gmail.com"))).thenReturn(appointments);
        ResponseEntity<List<List<String>>> response = doctorController.AllAppointmentsByDoctor(map);
        assertEquals(response.getStatusCode(), HttpStatus.OK);
        assertEquals(response.getBody(), appointments);
    }

    @Test
    void testAddConsultation() throws SQLException, ParseException {
        String mail = "johndoe@gmail.com";
        String firstname = "John";
        String lastName = "Doe";
        String date = "2023-04-03";
        String motif = "Maladie";
        MockMultipartFile file = new MockMultipartFile("test", "test.txt", "text/plain", "file content".getBytes());

        ResponseEntity<String> response = doctorController.addConsultation(file, mail, firstname, lastName, date, motif);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Consultation added successfully", response.getBody());

    }

    @Test
    void testAddConsultationWithoutFile() throws SQLException, ParseException {
        String mail = "johndoe@gmail.com";
        String firstname = "John";
        String lastName = "Doe";
        String date = "2023-04-03";
        String motif = "Maladie";

        ResponseEntity<String> response = doctorController.addConsultation(null, mail, firstname, lastName, date, motif);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Consultation added successfully", response.getBody());

    }

    @Test
    void testDisplayAppointments() throws SQLException {
        UUID doctorid = UUID.randomUUID();
        List<List<String>> appointments = new ArrayList<>();
        List<String> appt1 = new ArrayList<>();
        appt1.add("41e61a68-77e2-4f70-b37b-ca097d70ad29");
        appt1.add("985dc899-4046-44b9-832f-3be49b4ac48a");
        appt1.add("2023-03-29 15:30:00");
        appt1.add("2023-03-29 16:00:00");
        when(medicalPractice.displayAppointments(doctorid)).thenReturn(appointments);
        ResponseEntity<List<List<String>>> response = doctorController.displayAppointments(doctorid);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(appointments, response.getBody());
    }

    @Test
    void testGetAllDoctors() throws Exception {
        List<Doctor> doctors = new ArrayList<>();
        doctors.add(new Doctor(UUID.randomUUID(), "John", "Doe", "M", "Neurologue", "johndoe@gmail.com",null));
        when(medicalPractice.getAllDoctors()).thenReturn(doctors);
        mockMvc.perform(get("/doctors")
        .contentType(MediaType.APPLICATION_JSON_VALUE))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].firstName", is("John")))
        .andExpect(jsonPath("$[0].lastName", is("Doe")))
        .andExpect(jsonPath("$[0].mail", is("johndoe@gmail.com")))
        .andExpect(jsonPath("$[0].gender", is("M")))
        .andExpect(jsonPath("$[0].speciality", is("Neurologue")));

    }

    @Test
    void testGetAllPatientByDoctor() throws ParseException, SQLException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = format.parse("2023-04-03");
        List<Patient> expectedPatients = new ArrayList<>();
        Patient patient = new Patient(UUID.fromString("dccf9cfd-f2cc-4e44-8357-dd4140e17b73"),
        "John" , "Doe", "M", date, "54165", "johndoe@gmail.com", null, 0, 0);
        expectedPatients.add(patient);
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("mail", "doctor@gmail.com");
        when(medicalPractice.getPatientsByDoctor(medicalPractice.getInformationsDoctorByMail("doctor@gmail.com"))).thenReturn(expectedPatients);
        ResponseEntity<List<Patient>> response = doctorController.getAllPatientByDoctor(requestBody);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedPatients, response.getBody());
    }

    @Test
    void testGetAllSpecialities() throws SQLException {
        List<String> specialities = new ArrayList<>();
        specialities.add("Dermatologue");
        specialities.add("Neurologue");
        specialities.add("Ophtalmologue");
        specialities.add("Pediatre");
        specialities.add("Generaliste");
        specialities.add("Dentiste");
        when(medicalPractice.getAllSpecialities()).thenReturn(specialities);
        ResponseEntity<List<String>> response = doctorController.getAllSpecialities();
        assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(specialities, response.getBody());
    }

    @Test
    void testGetDoctorById() throws SQLException {
        UUID doctorid = UUID.randomUUID();
        Doctor doctor = new Doctor(doctorid, "John", "Doe", "M", "Neurologue", "johndoe@gmail.com",null);
        when(medicalPractice.getDoctorById(doctorid)).thenReturn(doctor);
        ResponseEntity<Doctor> response = doctorController.getDoctorById(doctorid);
        assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(doctor, response.getBody());
    }

    @Test
    void testGetDoctorByWrongId() throws SQLException {
        UUID doctorid = UUID.randomUUID();
        when(medicalPractice.getDoctorById(doctorid)).thenReturn(null);
        ResponseEntity<Doctor> response = doctorController.getDoctorById(doctorid);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
		assertNull(response.getBody());
    }

    @Test
    void testGetDoctorsBySpeciality() throws SQLException {
		List<Doctor> doctors = new ArrayList<>();
        doctors.add(new Doctor(UUID.randomUUID(), "John", "Doe", "M", "Neurologue", "johndoe@gmail.com",null));
        when(medicalPractice.getDoctorsBySpeciality("Neurologue")).thenReturn(doctors);
        ResponseEntity<List<Doctor>> response = doctorController.getDoctorsBySpeciality("Neurologue");
        assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(doctors, response.getBody());
    }

    @Test
    void testGetDoctorsByWrongSpeciality() throws SQLException {
        String speciality = "Dermatologue";
        when(medicalPractice.getDoctorsBySpeciality(speciality)).thenReturn(null);
        ResponseEntity<List<Doctor>> response = doctorController.getDoctorsBySpeciality(speciality);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testGetInformationsDoctorByMail() throws SQLException {
        Doctor doctor = new Doctor(UUID.fromString("dccf9cfd-f2cc-4e44-8357-dd4140e17b73"), "John", "Doe", "M", "Neurologue", "johndoe@gmail.com", null);
        when(medicalPractice.getInformationsDoctorByMail("johndoe@gmail.com")).thenReturn(doctor);

        Map<String, String> requestMap = new HashMap<>();
        requestMap.put("mail", "johndoe@gmail.com");
        ResponseEntity<Doctor> response = doctorController.getDoctorByMail(requestMap);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(doctor, response.getBody());
    }

    @Test
    void testGetInformationsDoctorByWrongMail() throws SQLException {
        when(medicalPractice.getInformationsDoctorByMail("johndeo@gmail.com")).thenReturn(null);

        Map<String, String> requestMap = new HashMap<>();
        requestMap.put("mail", "johndeo@gmail.com");
        ResponseEntity<Doctor> response = doctorController.getDoctorByMail(requestMap);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
