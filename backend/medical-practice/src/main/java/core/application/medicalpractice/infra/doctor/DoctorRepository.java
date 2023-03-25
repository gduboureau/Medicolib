package core.application.medicalpractice.infra.doctor;

import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import core.application.medicalpractice.domain.entity.Doctor;

@Repository
public interface DoctorRepository{

    public List<Doctor> getAllDoctors();
    public List<String> getAllSpecialities();
    public Doctor getDoctorById(UUID doctorid);
    public List<Doctor> getDoctorsBySpeciality(String speciality);
    public List<List<String>>  displayAppointments(String firstName, String lastName) throws SQLException;
    public List<List<String>> getAllAppointmentsDoctor(String mail) throws SQLException;
}
