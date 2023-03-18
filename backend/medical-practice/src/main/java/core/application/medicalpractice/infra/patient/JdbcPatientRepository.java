package core.application.medicalpractice.infra.patient;

import java.sql.*;
import java.util.*;

import org.springframework.stereotype.Service;

import core.application.DButils.DBUtil;
import core.application.medicalpractice.domain.entity.*;
import core.application.medicalpractice.domain.valueObjects.*;

@Service
public class JdbcPatientRepository implements PatientRepository {

  Connection connection;

  public JdbcPatientRepository() throws SQLException {
    connection = DBUtil.getConnection();
  }

  @Override
  public List<Appointment> getAppointmentsByPatient(Patient patient) {
    List<Appointment> appointments = new ArrayList<Appointment>();
    try {
      PreparedStatement stmt = connection.prepareStatement(
          "SELECT beginconsultation,endconsultation FROM consultations WHERE patientId = '" + patient.getId() + "'");
      ResultSet rs = stmt.executeQuery();

      while (rs.next()) {
        Appointment appt = new Appointment(new TimeSlot(rs.getDate(1), rs.getDate(2)));
        appointments.add(appt);
      }
    } catch (SQLException e) {

      e.printStackTrace();
    }
    return appointments;
  }

  @Override
  public void savePatient(Patient patient) throws SQLException {
    Statement stmt = connection.createStatement();
    String request = "INSERT INTO Patients(patientid, firstname, lastname, gender, birthday, weight, height, mail, address) VALUES ("
        + "'" + patient.getId() + "'" + "," + "'" + patient.getFirstName() + "'" + "," + "'" + patient.getLastName()
        + "'" + "," + "'"
        + patient.getGender() + "'" + "," + "'" + new java.sql.Date(patient.getBirthday().getTime()) + "'" + ","
        + patient.getWeight() + "," + patient.getHeight() + "," + "'" + patient.getMail() + "'" + "," + "'"
        + patient.getAdress() + "'" + ")";
    stmt.executeUpdate(request);
    // DBUtil.closeConnection(connection);
  }

  @Override
  public boolean checkPatientExist(String mail) throws SQLException {
    connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM Patients WHERE mail=" + "'" + mail + "'";
    ResultSet rs = stmt.executeQuery(request);
    return rs.next();
  }
}
