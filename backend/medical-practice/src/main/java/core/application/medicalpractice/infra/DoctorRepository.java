package core.application.medicalpractice.infra;

import java.util.List;

import org.springframework.stereotype.Repository;

import core.application.medicalpractice.domain.entity.Doctor;

@Repository
public interface DoctorRepository{

    public List<Doctor> getAllDoctors();
    public List<String> getAllSpecialities();
}
