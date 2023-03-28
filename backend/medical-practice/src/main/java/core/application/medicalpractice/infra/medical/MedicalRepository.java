package core.application.medicalpractice.infra.medical;

import core.application.medicalpractice.infra.patient.*;
import java.sql.*;
import java.util.UUID;

import core.application.medicalpractice.domain.entity.*;

public class MedicalRepository {
  public Connection connection() throws SQLException {
    try {
      Class.forName("org.postgresql.Driver");
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
    }
    String host = "postgresql-medical-practice.alwaysdata.net";
    String port = "5432";
    String data_base = "medical-practice_folders";
    String user = "medical-practice";
    String password = "8kPmx2.!XnW97pF";
    Connection conn = DriverManager.getConnection(
        "jdbc:postgresql://" + host + ":" + port + "/" + data_base, user, password);
    return conn;
  }

  public void closeConnection(Connection conn) {
    try {
      conn.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  public void saveConsultation(Consultation consultation) throws SQLException {
    Connection conn = connection();
    Statement stmt = conn.createStatement();
    String request = "INSERT INTO Consultations(consultationid, patientid, date, beginconsultation, endconsultation, doctorid) VALUES ("
        + "'" + consultation.getId() + "'" + "," + "'" + consultation.getPatient().getId() + "'" + ","
        + new java.sql.Date(consultation.getAppointment().getTimeSlot().getBeginDate().getTime()) + ","
        + new java.sql.Timestamp(consultation.getAppointment().getTimeSlot().getBeginDate().getTime()) + ","
        + new java.sql.Timestamp(consultation.getAppointment().getTimeSlot().getEndDate().getTime()) + "," + "'"
        + consultation.getDoctor().getId() + "'" + ")";
    stmt.executeUpdate(request);
    closeConnection(conn);
  }

  public Boolean checkMedicalFileExist(String mail, UUID doctorId) throws SQLException{
    JdbcPatientRepository patientRep = new JdbcPatientRepository();
    Connection conn = connection();
    Statement stmt = conn.createStatement();
    String request = "SELECT * FROM medicalfile where patientid = '" + patientRep.getPatientIdByMail(mail) + "' and doctorid = '" + doctorId + "'";
    ResultSet rs = stmt.executeQuery(request);
    return rs.next();
  }

  public void createMedicalFile(UUID patientId, UUID doctorId) throws SQLException{
    Connection conn = connection();
    Statement stmt = conn.createStatement();
    String request = "INSERT INTO MedicalFile(doctorId, patientId,consultationId) VALUES ('"
        + doctorId + "','" + patientId + "', '{}')";
    stmt.executeUpdate(request);
  }

  public void addConsultationToMedicalFile(UUID patientId, UUID doctorId, UUID consultationId) throws SQLException{
    Connection conn = connection();
    Statement stmt = conn.createStatement();
    String request = "UPDATE MedicalFile SET consultationid = array_append(consultationid,'" + consultationId +
        "') where patientid = '" + patientId + "' and doctorid = '" + doctorId + "'";
    stmt.executeUpdate(request);
  }

}