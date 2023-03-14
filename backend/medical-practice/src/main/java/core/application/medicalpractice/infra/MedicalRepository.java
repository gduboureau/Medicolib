package core.application.medicalpractice.infra;

import java.sql.*;

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
  

  public void saveUser(String mail, String password) throws SQLException {
    Connection conn = connection();
    Statement stmt = conn.createStatement();
    String request = "INSERT INTO Users(mail, password) VALUES (" + mail + "," + password + ")";
    stmt.executeUpdate(request);
    closeConnection(conn);
  }

  public void saveConsultation(Consultation consultation) throws SQLException {
    Connection conn = connection();
    Statement stmt = conn.createStatement();
    String request = "INSERT INTO Consultations(consultationid, patientid, date, beginconsultation, endconsultation, doctorid) VALUES ("
        + consultation.getId().toString() + "," + consultation.getPatient().getId().toString() + ","
        + new java.sql.Date(consultation.getAppointment().getDate().getBeginDate().getTime()) + ","
        + new java.sql.Timestamp(consultation.getAppointment().getDate().getBeginDate().getTime()) + ","
        + new java.sql.Timestamp(consultation.getAppointment().getDate().getEndDate().getTime()) + ","
        + consultation.getDoctor().getId().toString() + ")";
    stmt.executeUpdate(request);
    closeConnection(conn);
  }

}