package core.application.medicalpractice.application;

import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import core.application.medicalpractice.domain.aggregate.*;
import core.application.medicalpractice.domain.entity.*;
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

    public Doctor getDoctorById(UUID doctorid) throws SQLException {
        return doctorRepository.getDoctorById(doctorid);
    }

    public List<String> getInformationsDoctorByMail(String mail) throws SQLException {
        return doctorRepository.getInformationsDoctorByMail(mail);
    }

    public List<List<String>> displayAppointments(String firstname, String lastname) throws SQLException {
        return doctorRepository.displayAppointments(firstname, lastname);
    }

    public List<List<String>> getAllAppointmentsDoctor(String mail) throws SQLException {
        return doctorRepository.getAllAppointmentsDoctor(mail);
    }

    public List<List<String>> getPatientsByDoctor(String mail) throws SQLException {
        return doctorRepository.getPatientsByDoctor(mail);
    }

    public void addConsultation(String mail, String lastname, String firstname, Date date, String motif,
            List<String> medicList) throws SQLException {
        doctorRepository.addConsultation(mail, lastname, firstname, date, motif, medicList);
    }

    public List<List<String>> getMedicalFile(String mail, String firstname, String lastname) throws SQLException {
        List<String> informations = patientRepository
                .getInformationsPatient(patientRepository.getMailByName(firstname, lastname));
        List<List<String>> consultations = doctorRepository.getConsultationsDoctor(mail, firstname, lastname);
        consultations.add(informations);
        return consultations;
    }

    // requests for patients

    public List<List<String>> getAppointmentByPatient(String mail) throws SQLException {
        return patientRepository.getAllAppointmentsByPatient(mail);
    }

    public void savePatient(Patient patient) throws SQLException {
        patientRepository.savePatient(patient);

    }

    public boolean checkPatientExist(String mail, String firstname, String lastname) throws SQLException {
        return patientRepository.checkPatientExist(mail, firstname, lastname);
    }

    public List<String> getInformationsPatient(String mail) throws SQLException {
        return patientRepository.getInformationsPatient(mail);
    }

    public Address getAddress(String mail) throws SQLException {
        return patientRepository.getAddress(mail);
    }

    public void saveAddress(Patient patient) throws SQLException {
        patientRepository.saveAddress(patient);
    }

    public void makeAnAppointment(String id, String mail) throws SQLException {
        patientRepository.makeAnAppointment(id, mail);
    }

    public void cancelAppointment(String id) throws SQLException {
        patientRepository.cancelAppointment(id);
    }

    public List<List<String>> getConsultationsPatient(String mail) throws SQLException {
        return patientRepository.getConsultationsPatient(mail);
    }

    // requests for user

    public void saveUser(String email, String password) {
        userRepository.saveUser(email, password);
    }

    public boolean checkLoginExist(String email, String password) throws SQLException {
        return userRepository.checkLoginExist(email, password);
    }

    public void resetPassword(String mail, String password) throws SQLException {
        userRepository.resetPassword(mail, password);
    }

    public boolean checkUserExist(String mail) throws SQLException {
        return userRepository.checkUserExist(mail);
    }

    public String getUserType(String mail) throws SQLException {
        return userRepository.getUserType(mail);
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
