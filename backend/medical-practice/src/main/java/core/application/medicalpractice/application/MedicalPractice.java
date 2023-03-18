package core.application.medicalpractice.application;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import core.application.medicalpractice.domain.aggregate.*;
import core.application.medicalpractice.domain.entity.*;
import core.application.medicalpractice.domain.valueObjects.Appointment;
import core.application.medicalpractice.infra.doctor.JdbcDoctorRepository;
import core.application.medicalpractice.infra.medical.MedicalRepository;
import core.application.medicalpractice.infra.patient.JdbcPatientRepository;
import core.application.medicalpractice.infra.user.JdbcUserRepository;

@Service
public class MedicalPractice {

    private MedicalRepository medicalDatas;
    private JdbcDoctorRepository doctorRepository;
    private JdbcPatientRepository patientRepository;
    private JdbcUserRepository userRepository;
    private HashMap<Integer, MedicalFile> medicalFiles;

    public MedicalPractice() throws SQLException {
        this.medicalDatas = new MedicalRepository();
        this.doctorRepository = new JdbcDoctorRepository();
        this.patientRepository = new JdbcPatientRepository();
        this.userRepository = new JdbcUserRepository();
        this.medicalFiles = new HashMap<>();
    }

    // requests for doctors

    public List<Doctor> getAllDoctors() throws SQLException {
        return doctorRepository.getAllDoctors();
    }

    public List<String> getAllSpecialities() throws SQLException {
        return doctorRepository.getAllSpecialities();
    }

    public List<Doctor> getDoctorsBySpeciality(String speciality) throws SQLException {
        return doctorRepository.getDoctorsBySpeciality(speciality);
    }

    public List<Appointment> getAppointmentByDoctor(Doctor doctor) throws SQLException {
        return doctorRepository.getAppointmentsByDoctors(doctor);
    }

    // requests for patients

    public List<Appointment> getAppointmentByPatient(Patient patient) throws SQLException {
        return patientRepository.getAppointmentsByPatient(patient);
    }

    public void savePatient(Patient patient) throws SQLException {
        patientRepository.savePatient(patient);

    }

    public boolean checkPatientExist(String mail) throws SQLException {
        return patientRepository.checkPatientExist(mail);
    }

    // requests for user

    public void saveUser(String email, String password) {
        userRepository.saveUser(email, password);
    }

    public boolean checkLoginExist(String email, String password) throws SQLException {
        return userRepository.checkLoginExist(email, password);
    }

    // requests for medical files

    public int createMedicalFile() {
        // Patient patient = new Patient();
        MedicalFile medicalFile = new MedicalFile(null);
        return 1;
    }

    public void saveMedicalFile(MedicalFile file) {

    }

    public MedicalFile getMedicalFile(UUID medicalId) {
        return null;
    }

}
