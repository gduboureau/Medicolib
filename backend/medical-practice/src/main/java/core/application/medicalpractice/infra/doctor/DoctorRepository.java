package core.application.medicalpractice.infra.doctor;

import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import core.application.medicalpractice.domain.entity.Doctor;

@Repository
public interface DoctorRepository {

        public List<Doctor> getAllDoctors() throws SQLException;

        public List<String> getAllSpecialities() throws SQLException;

        public Doctor getDoctorById(UUID doctorid) throws SQLException;

        public List<Doctor> getDoctorsBySpeciality(String speciality) throws SQLException;

        public List<String> getInformationsDoctorByMail(String mail) throws SQLException;

        public List<List<String>> displayAppointments(UUID doctorid) throws SQLException;

        public List<List<String>> getAllAppointmentsDoctor(String mail) throws SQLException;

        public List<HashMap<String, String>> getPatientsByDoctor(String mail) throws SQLException;

        public UUID getDoctorIdByMail(String mail) throws SQLException;

        public void addConsultation(String mail, String lastname, String firstname, Date date, String motif,
                        String fileName, byte[] fileContent) throws SQLException;

        public UUID addPrescription(String fileName, byte[] fileContent) throws SQLException;

        public List<List<Object>> getConsultationsDoctor(String mail, String firstname, String lastname)
                        throws SQLException;

        public List<List<Object>> getDocumentPatient(String idAppt) throws SQLException;

        public List<Object> getPriceConsultations(String idDoctor) throws SQLException;

        public void modifyInfoPersoDoctor(String idDoctor, String firstName, String lastName, String gender) throws SQLException;

        public void modifyCredentialsDoctor(String idDoctor, String prevMail, String newMail, String password) throws SQLException;

        public void modifyProInfoDoctor(String idDoctor, String infos, List<List<String>> priceList, List<List<String>> prevPriceList, List<String> deletedPrice) throws SQLException;
}
