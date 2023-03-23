package core.application.medicalpractice.infra.patient;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import core.application.medicalpractice.domain.entity.*;

@Repository
public interface PatientRepository {
    public UUID getPatientIdByMail(String mail) throws SQLException;

    public List<List<String>> getAllAppointmentsByPatient(String mail) throws SQLException;

    public void addAppointment(Appointment appointment) throws SQLException;

    public void removeTimeSlot(UUID id) throws SQLException;

    public void makeAnAppointment(String id, String mail) throws SQLException;

    public void savePatient(Patient patient) throws SQLException;

    public boolean checkPatientExist(String mail) throws SQLException;

    public List<String> getInformationsPatient(String mail) throws SQLException;

    public Address getAddress(String mail) throws SQLException;

    public void saveAddress(Patient patient) throws SQLException;

}
