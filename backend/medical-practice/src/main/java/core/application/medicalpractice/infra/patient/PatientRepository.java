package core.application.medicalpractice.infra.patient;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import core.application.medicalpractice.domain.entity.*;

@Repository
public interface PatientRepository {
    public UUID getPatientIdByMail(String mail) throws SQLException;

    public String getMailByName(String firstname, String lastname) throws SQLException;

    public List<List<String>> getAllAppointmentsByPatient(String mail) throws SQLException;

    public void addAppointment(Appointment appointment) throws SQLException;

    public void removeTimeSlot(UUID id) throws SQLException;

    public void makeAnAppointment(String id, String mail) throws SQLException;

    public void cancelAppointment(String id) throws SQLException;

    public void savePatient(Patient patient) throws SQLException;

    public boolean checkPatientExist(String mail, String firstname, String lastname) throws SQLException;

    public List<String> getInformationsPatient(String mail) throws SQLException;

    public Address getAddress(String mail) throws SQLException;

    public void saveAddress(Patient patient) throws SQLException;

    public UUID getPatientIdByName(String firstname, String lastname) throws SQLException;

    public List<List<String>> getConsultationsPatient(String mail) throws SQLException;

    public void saveDocument(String fileName, byte[] fileContent, String mail,String apptId) throws SQLException;

    public List<List<Object>> getDocument(String mail) throws SQLException, IOException;

    public void deleteDocument(String idAppt, String docName) throws SQLException;

}
