package core.application.medicalpractice.infra.doctor;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import core.application.medicalpractice.domain.entity.Appointment;
import core.application.medicalpractice.domain.entity.Doctor;
import core.application.medicalpractice.domain.entity.Patient;

@Repository
public interface DoctorRepository {

        public List<Doctor> getAllDoctors() throws SQLException;

        public List<String> getAllSpecialities() throws SQLException;

        public Doctor getDoctorById(UUID doctorid) throws SQLException;

        public List<Doctor> getDoctorsBySpeciality(String speciality) throws SQLException;

        public Doctor getInformationsDoctorByMail(String mail) throws SQLException;

        public List<List<String>> displayAppointments(UUID doctorid) throws SQLException;

        public List<List<String>> getAllAppointmentsDoctor(Doctor doctor) throws SQLException;

        public List<Patient> getPatientsByDoctor(Doctor doctor) throws SQLException;

        public UUID getDoctorIdByMail(String mail) throws SQLException;

        public void addConsultation(String mail, String lastname, String firstname, Date date, String motif,
                        String fileName, byte[] fileContent) throws SQLException;

        public UUID addPrescription(String fileName, byte[] fileContent) throws SQLException;

        public List<List<Object>> getConsultationsDoctor(String mail, String firstname, String lastname)
                        throws SQLException;

        public List<List<Object>> getDocumentPatient(Appointment appointment) throws SQLException;

        public List<Object> getPriceConsultations(Doctor doctor) throws SQLException;

        public void modifyInfoPersoDoctor(Doctor doctor, String firstName, String lastName, String gender) throws SQLException;

        public void modifyCredentialsDoctor(Doctor doctor, String prevMail, String newMail, String password) throws SQLException;

        public void modifyProInfoDoctor(Doctor doctor, String infos, List<List<String>> priceList, List<List<String>> prevPriceList, List<String> deletedPrice) throws SQLException;

        public Boolean checkIsDoctorExist(String mail) throws SQLException;

}
