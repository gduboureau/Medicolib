package core.application.medicalpractice.application;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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

    public List<HashMap<String, String>> getPatientsByDoctor(String mail) throws SQLException {
        return doctorRepository.getPatientsByDoctor(mail);
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

    public List<List<Object>> getDocumentPatient(String idAppt) throws SQLException {
        return doctorRepository.getDocumentPatient(idAppt);
    }

    public List<Object> getPriceConsultations(String idDoctor) throws SQLException {
        return doctorRepository.getPriceConsultations(idDoctor);
    }

    public void modifyInfoPersoDoctor(String idDoctor, String firstName, String lastName, String gender) throws SQLException{
        doctorRepository.modifyInfoPersoDoctor(idDoctor, firstName, lastName, gender);
    }

    public void modifyCredentialsDoctor(String idDoctor, String prevMail, String newMail, String password) throws SQLException {
        doctorRepository.modifyCredentialsDoctor(idDoctor, prevMail, newMail, password);
    }

    public void modifyProInfoDoctor(String idDoctor, String infos, List<List<String>> priceList, List<List<String>> prevPriceList, List<String> deletedPrice) throws SQLException{
        doctorRepository.modifyProInfoDoctor(idDoctor, infos, priceList,prevPriceList, deletedPrice);
    }

    // requests for patients

    public List<List<String>> getAppointmentByPatient(String mail) throws SQLException {
        return patientRepository.getAllAppointmentsByPatient(mail);
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

    public void saveDocument(String fileName, byte[] fileContent, String mail, String apptId) throws SQLException {
        patientRepository.saveDocument(fileName, fileContent, mail, apptId);
    }

    public List<List<Object>> getDocument(String mail) throws SQLException, IOException {
        return patientRepository.getDocument(mail);
    }

    public void deleteDocument(String idAppt, String docName) throws SQLException {
        patientRepository.deleteDocument(idAppt, docName);
    }

    public List<List<Object>> getPrescriptionsByPatient(String mail) throws SQLException, IOException {
        return patientRepository.getPrescriptionsByPatient(mail);
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

    public Date getAppointmentDateById(String apptId) throws SQLException {
        return medicalDatas.getAppointmentDateById(apptId);
    }

}
