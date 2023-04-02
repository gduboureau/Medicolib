package core.application.medicalpractice.infra.patient;

import java.io.IOException;
import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

import org.springframework.stereotype.Service;

import core.application.DButils.DBUtil;
import core.application.medicalpractice.domain.entity.*;
import core.application.medicalpractice.domain.valueObjects.TimeSlot;
import core.application.medicalpractice.infra.medical.MedicalRepository;

@Service
public class JdbcPatientRepository implements PatientRepository {

  @Override
  public UUID getPatientIdByMail(String mail) throws SQLException {
    UUID patientId = null;
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT patientId FROM Patients WHERE mail =" + "'" + mail + "'";
    ResultSet rs = stmt.executeQuery(request);
    if (rs.next()) {
      patientId = UUID.fromString(rs.getString(1));
    }
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
    return patientId;
  }

  @Override
  public String getMailByName(String firstname, String lastname) throws SQLException {
    String mail = null;
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT mail FROM Patients WHERE firstname=" + "'" + firstname + "' AND lastname=" + "'" + lastname
        + "'";
    ResultSet rs = stmt.executeQuery(request);
    if (rs.next()) {
      mail = rs.getString(1);
    }
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
    return mail;
  }

  @Override
  public List<List<String>> getAllAppointmentsByPatient(String mail) throws SQLException {
    Connection connection = DBUtil.getConnection();
    List<List<String>> appointments = new ArrayList<List<String>>();
    DateFormat df = new SimpleDateFormat("EEEE d MMM yyyy");
    Statement stmt = connection.createStatement();
    String sql = "SELECT appointments.appointmentid, doctors.firstname, doctors.lastname, doctors.speciality, appointments.StartTime FROM doctors JOIN appointments ON doctors.doctorid = appointments.doctorid WHERE appointments.patientid= (SELECT patientid FROM Patients WHERE mail= "
        + "'" + mail + "'" + ") ORDER BY appointments.starttime";
    ResultSet rs = stmt.executeQuery(sql);
    while (rs.next()) {
      if (LocalDateTime.now().isAfter(rs.getTimestamp(5).toLocalDateTime())){
        Statement stmt2 = connection.createStatement();
        String request2 = "DELETE FROM Appointments WHERE PatientId = '" + getPatientIdByMail(mail) + "' AND StartTime = '" + rs.getDate(5) + "'";
        stmt2.executeUpdate(request2);
        stmt2.close();
      }else{
        List<String> l = new ArrayList<>();
        l.add(rs.getString(1));
        l.add(rs.getString(2));
        l.add(rs.getString(3));
        l.add(rs.getString(4));
        l.add(df.format(rs.getDate(5)).toString());
        l.add(rs.getTime(5).toString());
        appointments.add(l);
      }
    }
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
    return appointments;
  }

  @Override
  public void savePatient(Patient patient) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();

    if (checkPatientExist(patient.getMail(), patient.getFirstName(), patient.getLastName())) {
      String request = "UPDATE Patients SET firstname = '" + patient.getFirstName() + "',lastname = '"
          + patient.getLastName()
          + "', gender = '" + patient.getGender() + "', birthday = '" + patient.getBirthday() + "', weight = '"
          + patient.getWeight()
          + "', height = '" + patient.getHeight() + "', mail = '" + patient.getMail() + "', address = '"
          + patient.getAdress() + "', numsocial = '"
          + patient.getNumSocial() + "' WHERE mail = '" + patient.getMail() + "'";
      stmt.executeUpdate(request);
    } else {
      String request = "INSERT INTO Patients(patientid, firstname, lastname, gender, birthday, weight, height, mail, address, numsocial) VALUES ("
          + "'" + patient.getId() + "'" + "," + "'" + patient.getFirstName() + "'" + "," + "'" + patient.getLastName()
          + "'" + "," + "'"
          + patient.getGender() + "'" + "," + "'" + new java.sql.Date(patient.getBirthday().getTime()) + "'" + ","
          + patient.getWeight() + "," + patient.getHeight() + "," + "'" + patient.getMail() + "'" + "," + "'"
          + patient.getAdress() + "','" + patient.getNumSocial() + "')";
      stmt.executeUpdate(request);
    }
    stmt.close();
    DBUtil.closeConnection(connection);

  }

  @Override
  public boolean checkPatientExist(String mail, String firstname, String lastname) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM Patients WHERE mail=" + "'" + mail + "'" + " OR firstname=" + "'" + firstname + "'"
        + " OR lastname=" + "'" + lastname + "'";
    ResultSet rs = stmt.executeQuery(request);
    Boolean exist = rs.next();
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
    return exist;
  }

  @Override
  public List<String> getInformationsPatient(String mail) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM Patients WHERE mail=" + "'" + mail + "'";
    ResultSet rs = stmt.executeQuery(request);
    ResultSetMetaData rsmd = rs.getMetaData();
    List<String> informations = new ArrayList<>();
    if (rs.next()) {
      for (int i = 1; i < rsmd.getColumnCount() + 1; i++) {
        informations.add(rs.getString(i));
      }
    }
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
    return informations;
  }

  @Override
  public void saveAddress(Patient patient) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    if (getAddress(patient.getMail()) == null) {
      String request = "INSERT INTO Address(patientid, numrue, nomrue, postalcode	, city) VALUES ("
          + "'" + patient.getId() + "'" + "," + "'" + patient.getAdress().getNumber() + "'" + "," + "'"
          + patient.getAdress().getStreet()
          + "'" + "," + "'"
          + patient.getAdress().getPostalCode() + "'" + "," + "'" + patient.getAdress().getCity() + "'" + ")";
      stmt.executeUpdate(request);
    } else {
      String request = "UPDATE Address SET numrue = '" + patient.getAdress().getNumber()
          + "', nomrue = '" + patient.getAdress().getStreet() + "', postalcode = '"
          + patient.getAdress().getPostalCode() + "', city = '"
          + patient.getAdress().getCity() + "'";
      stmt.executeUpdate(request);
    }
    stmt.close();
    DBUtil.closeConnection(connection);
  }

  @Override
  public Address getAddress(String mail) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM Address JOIN Patients ON (Address.patientid = Patients.patientid) WHERE mail ="
        + "'" + mail + "'";
    ResultSet rs = stmt.executeQuery(request);
    Address addr = null;
    if (rs.next()) {
      addr = new Address(rs.getInt(2), rs.getString(3), rs.getString(5), rs.getInt(4));
    }
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
    return addr;
  }

  @Override
  public void addAppointment(Appointment appointment) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "INSERT INTO Appointments(AppointmentId, doctorId, PatientId, startTime, endTime) VALUES (" + "'"
        + appointment.getId() + "'" + "," + "'" + appointment.getDoctorId() + "'" + "," + "'"
        + appointment.getPatientId() + "'" + "," + "'"
        + new Timestamp(appointment.getTimeSlot().getBeginDate().getTime()) + "'" + ","
        + "'" + new Timestamp(appointment.getTimeSlot().getEndDate().getTime()) + "'" + ")";
    stmt.executeUpdate(request);
    stmt.close();
    DBUtil.closeConnection(connection);
  }

  @Override
  public void removeTimeSlot(UUID id) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "DELETE FROM AvailableTimeSlots WHERE TimeSlotId =" + "'" + id + "'";
    stmt.executeUpdate(request);
    stmt.close();
    DBUtil.closeConnection(connection);
  }

  @Override
  public void makeAnAppointment(String id, String mail) throws SQLException {
    MedicalRepository medicalRepository = new MedicalRepository();
    Appointment appointment = null;
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM AvailableTimeSlots WHERE TimeSlotId =" + "'" + id + "'";
    ResultSet rs = stmt.executeQuery(request);
    if (rs.next()) {
      appointment = new Appointment(UUID.fromString(rs.getString(1)), UUID.fromString(rs.getString(2)),
          getPatientIdByMail(mail), new TimeSlot(rs.getTimestamp(3), rs.getTimestamp(4)));
      removeTimeSlot(UUID.fromString(rs.getString(1)));
    }
    addAppointment(appointment);
    if (!medicalRepository.checkMedicalFileExist(mail, UUID.fromString(rs.getString(2)))) {
      medicalRepository.createMedicalFile(getPatientIdByMail(mail), UUID.fromString(rs.getString(2)));
    }
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
  }

  @Override
  public void cancelAppointment(String id) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM Appointments WHERE appointmentId =" + "'" + id + "'";
    ResultSet rs = stmt.executeQuery(request);
    if (rs.next()) {
      Statement stmt2 = connection.createStatement();
      String request2 = "INSERT INTO AvailableTimeSlots(doctorId, startTime, endTime) VALUES (" + "'" + rs.getString(2)
          + "'" + "," + "'" + rs.getTimestamp(4) + "'" + "," + "'" + rs.getTimestamp(5) + "'" + ")";
      stmt2.executeUpdate(request2);
      stmt2.close();
    }

    Statement stmt3 = connection.createStatement();
    String request3 = "DELETE FROM Appointments WHERE appointmentId =" + "'" + id + "'";
    stmt3.executeUpdate(request3);
    stmt3.close();
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
  }

  @Override
  public UUID getPatientIdByName(String firstname, String lastname) throws SQLException {
    UUID patientId = null;
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT patientId FROM Patients WHERE lastname =" + "'" + lastname + "' AND firstname = '"
        + firstname + "'";
    ResultSet rs = stmt.executeQuery(request);
    if (rs.next()) {
      patientId = UUID.fromString(rs.getString(1));
    }
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
    return patientId;
  }

  @Override
  public List<List<String>> getConsultationsPatient(String mail) throws SQLException {
    UUID patientid = getPatientIdByMail(mail);
    List<List<String>> informations = new ArrayList<>();
    SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM Consultations JOIN Prescriptions ON Consultations.prescriptionsid = Prescriptions.prescriptionsid WHERE consultations.patientid ="
        + "'" + patientid + "' ORDER BY Consultations.day";
    ResultSet rs = stmt.executeQuery(request);
    while (rs.next()) {
      List<String> l = new ArrayList<>();
      l.add(df.format(rs.getDate(4)).toString());
      if (rs.getString(7).equals(" ")) {
        l.add("Aucune");
      } else {
        l.add(rs.getString(7));
      }
      informations.add(l);
    }
    rs.close();
    stmt.close();
    connection.close();
    return informations;
  }

  @Override
  public void saveDocument(String fileName, byte[] fileContent, String mail, String apptId) throws SQLException{
    UUID patientId = getPatientIdByMail(mail);
    UUID appointmentId = UUID.fromString(apptId);
    Connection connection = DBUtil.getConnection();
    PreparedStatement pstmt = connection.prepareStatement(
      "INSERT INTO documents (patientid, documentname, documentcontent, appointmentid) VALUES (?, ?, ?, ?)"
    );
    pstmt.setObject(1, patientId);
    pstmt.setString(2, fileName);
    pstmt.setBytes(3, fileContent);
    pstmt.setObject(4, appointmentId);
    pstmt.executeUpdate();
    pstmt.close();
    DBUtil.closeConnection(connection);
  }

  @Override
  public List<List<Object>> getDocument(String mail) throws SQLException, IOException {
    List<List<Object>> documentsByApptId = new ArrayList<>();
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT documentname,documentcontent,appointmentid from documents where patientid = '" + getPatientIdByMail(mail) + "'";
    ResultSet rs = stmt.executeQuery(request);
    while (rs.next()){
      List<Object> doc = new ArrayList<>();
      doc.add(rs.getString(1));
      doc.add(rs.getBytes(2));
      doc.add(rs.getString(3));
      documentsByApptId.add(doc);
    }
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
    return documentsByApptId;
  }

  public void deleteDocument(String idAppt, String docName) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "DELETE FROM documents WHERE appointmentId =" + "'" + idAppt + "' and documentname = '" + docName + "'";
    stmt.executeUpdate(request);
    stmt.close();
    DBUtil.closeConnection(connection);
  }
}
