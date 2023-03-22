package core.application.medicalpractice.infra.doctor;

import java.util.List;

import org.springframework.stereotype.Repository;

import core.application.medicalpractice.domain.entity.Doctor;

@Repository
public interface DoctorRepository{

    public List<Doctor> getAllDoctors();
    public List<String> getAllSpecialities();
    public List<Doctor> getDoctorsBySpeciality(String speciality);
}
