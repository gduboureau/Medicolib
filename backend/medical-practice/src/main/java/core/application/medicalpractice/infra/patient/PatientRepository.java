package core.application.medicalpractice.infra.patient;

import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Repository;

import core.application.medicalpractice.domain.entity.*;
import core.application.medicalpractice.domain.valueObjects.Appointment;

@Repository
public interface PatientRepository {

    public List<Appointment> getAppointmentsByPatient(Patient patient);

    public void savePatient(Patient patient) throws SQLException;

    public boolean checkPatientExist(String mail) throws SQLException;

    public List<String> getInformationsPatient(String mail) throws SQLException;

    public Address getAddress(String mail) throws SQLException;

    public void saveAddress(Patient patient) throws SQLException;

}
