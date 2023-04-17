package core.application.medicalpractice.application;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

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

    public MedicalPractice() throws SQLException {
        this.medicalDatas = new MedicalRepository();
        this.doctorRepository = new JdbcDoctorRepository();
        this.patientRepository = new JdbcPatientRepository();
        this.userRepository = new JdbcUserRepository();
    }

    // requests for doctors

    public Patient getPatientByMail(String mail) throws SQLException {
        return patientRepository.getPatientByMail(mail);
    }

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

    public Doctor getInformationsDoctorByMail(String mail) throws SQLException {
        return doctorRepository.getInformationsDoctorByMail(mail);
    }

    public List<List<String>> displayAppointments(UUID doctorid) throws SQLException {
        return doctorRepository.displayAppointments(doctorid);
    }

    public List<List<String>> getAllAppointmentsDoctor(Doctor doctor) throws SQLException {
        return doctorRepository.getAllAppointmentsDoctor(doctor);
    }

    public List<Patient> getPatientsByDoctor(Doctor doctor) throws SQLException {
        return doctorRepository.getPatientsByDoctor(doctor);
    }

    public void addConsultation(String mail, String lastname, String firstname, Date date, String motif,
            String fileName, byte[] fileContent) throws SQLException {
        doctorRepository.addConsultation(mail, lastname, firstname, date, motif, fileName, fileContent);
    }

    public List<List<Object>> getMedicalFile(String mail, String firstname, String lastname) throws SQLException {
        List<String> informations = patientRepository
                .getInformationsPatient(patientRepository.getMailByName(firstname, lastname));
        List<Object> objectList = new ArrayList<Object>(informations);
        List<List<Object>> consultations = doctorRepository.getConsultationsDoctor(mail, firstname, lastname);
        consultations.add(objectList);
        return consultations;
    }

    public List<List<Object>> getDocumentPatient(Appointment appointment) throws SQLException {
        return doctorRepository.getDocumentPatient(appointment);
    }

    public List<Object> getPriceConsultations(Doctor doctor) throws SQLException {
        return doctorRepository.getPriceConsultations(doctor);
    }

    public void modifyInfoPersoDoctor(Doctor doctor, String firstName, String lastName, String gender) throws SQLException{
        doctorRepository.modifyInfoPersoDoctor(doctor, firstName, lastName, gender);
    }

    public void modifyCredentialsDoctor(Doctor doctor, String prevMail, String newMail, String password) throws SQLException {
        doctorRepository.modifyCredentialsDoctor(doctor, prevMail, newMail, password);
    }

    public void modifyProInfoDoctor(Doctor doctor, String infos, List<List<String>> priceList) throws SQLException{
        doctorRepository.modifyProInfoDoctor(doctor, infos, priceList);
    }

    public Boolean checkIsDoctorExist(String mail) throws SQLException  {
        return doctorRepository.checkIsDoctorExist(mail);
    }

    // requests for patients

    public List<List<String>> getAppointmentByPatient(Patient patient) throws SQLException {
        return patientRepository.getAllAppointmentsByPatient(patient);
    }

    public void savePatient(Patient patient) throws SQLException {
        patientRepository.savePatient(patient);

    }

    public boolean checkPatientExist(String mail) throws SQLException {
        return patientRepository.checkPatientExist(mail);
    }

    public List<String> getInformationsPatient(String mail) throws SQLException {
        return patientRepository.getInformationsPatient(mail);
    }

    public Address getAddress(Patient patient) throws SQLException {
        return patientRepository.getAddress(patient);
    }

    public void saveAddress(Patient patient) throws SQLException {
        patientRepository.saveAddress(patient);
    }

    public void makeAnAppointment(String id, Patient patient) throws SQLException {
        patientRepository.makeAnAppointment(id, patient);
    }

    public void cancelAppointment(Appointment appointment) throws SQLException {
        patientRepository.cancelAppointment(appointment);
    }

    public void saveDocument(String fileName, byte[] fileContent, Patient patient, Appointment appointment) throws SQLException {
        patientRepository.saveDocument(fileName, fileContent, patient, appointment);
    }

    public List<List<Object>> getDocument(Patient patient) throws SQLException, IOException {
        return patientRepository.getDocument(patient);
    }

    public void deleteDocument(Appointment appointment, String docName) throws SQLException {
        patientRepository.deleteDocument(appointment, docName);
    }

    public List<List<Object>> getPrescriptionsByPatient(Patient patient) throws SQLException, IOException {
        return patientRepository.getPrescriptionsByPatient(patient);
    }

    public List<Object> getDateAndTimeAppt(Appointment appointment) throws SQLException {
        return patientRepository.getDateAndTimeAppt(appointment);
    }

    public Appointment getAppointmentById(String id) throws SQLException{
        return patientRepository.getAppointmentById(id);
    }

    public void deleteAccount(Patient patient) throws SQLException {
        patientRepository.deleteAccount(patient);
    }

    // requests for user

    public void saveUser(User user) {
        userRepository.saveUser(user);
    }

    public boolean checkLoginExist(User user) throws SQLException {
        return userRepository.checkLoginExist(user);
    }

    public void resetPassword(User user) throws SQLException {
        userRepository.resetPassword(user);
    }

    public boolean checkUserExist(String mail) throws SQLException {
        return userRepository.checkUserExist(mail);
    }

    public String getUserType(User user) throws SQLException {
        return userRepository.getUserType(user);
    }

    // requests for medical files

    public Date getAppointmentDateById(Appointment appointment) throws SQLException {
        return medicalDatas.getAppointmentDateById(appointment);
    }

}
