package core.application.medicalpractice.infra.patient;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import core.application.medicalpractice.domain.entity.*;

@Repository
public interface PatientRepository {

    public Patient getPatientByMail(String mail) throws SQLException;

    public String getMailByName(String firstname, String lastname) throws SQLException;

    public List<List<String>> getAllAppointmentsByPatient(Patient patient) throws SQLException;

    public void addAppointment(Appointment appointment) throws SQLException;

    public void removeTimeSlot(UUID id) throws SQLException;

    public void makeAnAppointment(String id, Patient patient) throws SQLException;

    public void cancelAppointment(Appointment appointment) throws SQLException;

    public void savePatient(Patient patient) throws SQLException;

    public boolean checkPatientExist(String mail) throws SQLException;

    public List<String> getInformationsPatient(String mail) throws SQLException;

    public Address getAddress(Patient patient) throws SQLException;

    public void saveAddress(Patient patient) throws SQLException;

    public UUID getPatientIdByName(String firstname, String lastname) throws SQLException;

    public void saveDocument(String fileName, byte[] fileContent, Patient patient, Appointment appointment) throws SQLException;

    public List<List<Object>> getDocument(Patient patient) throws SQLException, IOException;

    public void deleteDocument(Appointment appointment, String docName) throws SQLException;

    public void deleteAllDocumentOfAppt(Appointment appointment) throws SQLException;

    public List<List<Object>> getPrescriptionsByPatient(Patient patient) throws SQLException, IOException;

    public Appointment getAppointmentById(String id) throws SQLException;
}
