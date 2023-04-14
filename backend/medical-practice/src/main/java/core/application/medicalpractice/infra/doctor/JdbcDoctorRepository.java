package core.application.medicalpractice.infra.doctor;

import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

import org.springframework.stereotype.Service;

import core.application.DButils.DBUtil;
import core.application.medicalpractice.domain.entity.Doctor;
import core.application.medicalpractice.domain.entity.MedicinePrescription;
import core.application.medicalpractice.infra.patient.JdbcPatientRepository;

@Service
public class JdbcDoctorRepository implements DoctorRepository {

  @Override
  public List<Doctor> getAllDoctors() throws SQLException {
    Connection connection = DBUtil.getConnection();
    List<Doctor> doctorList = new ArrayList<Doctor>();
    try {
      PreparedStatement stmt = connection.prepareStatement("SELECT * FROM doctors");
      ResultSet rs = stmt.executeQuery();

      while (rs.next()) {
        Doctor doctor = new Doctor(UUID.fromString(rs.getString(1)), rs.getString(2), rs.getString(3), rs.getString(4),
            rs.getString(5),
            rs.getString(6), rs.getString(7));
        doctorList.add(doctor);
      }

      rs.close();
      stmt.close();
      connection.close();

    } catch (SQLException e) {

      e.printStackTrace();
    }
    return doctorList;
  }

  @Override
  public List<String> getAllSpecialities() throws SQLException {
    Connection connection = DBUtil.getConnection();
    List<String> specialityList = new ArrayList<String>();
    try {
      PreparedStatement stmt = connection.prepareStatement("SELECT DISTINCT speciality FROM doctors");
      ResultSet rs = stmt.executeQuery();

      while (rs.next()) {
        specialityList.add(rs.getString(1));
      }

      rs.close();
      stmt.close();
      connection.close();

    } catch (SQLException e) {

      e.printStackTrace();
    }
    return specialityList;
  }

  @Override
  public List<Doctor> getDoctorsBySpeciality(String speciality) throws SQLException {
    Connection connection = DBUtil.getConnection();
    List<Doctor> doctorList = new ArrayList<Doctor>();
    try {
      PreparedStatement stmt = connection
          .prepareStatement("SELECT * FROM doctors WHERE speciality = '" + speciality + "'");
      ResultSet rs = stmt.executeQuery();

      while (rs.next()) {
        Doctor doctor = new Doctor(UUID.fromString(rs.getString(1)), rs.getString(2), rs.getString(3), rs.getString(4),
            rs.getString(5),
            rs.getString(6), rs.getString(7));
        doctorList.add(doctor);
      }

      rs.close();
      stmt.close();
      connection.close();

    } catch (SQLException e) {

      e.printStackTrace();
    }
    return doctorList;
  }

  @Override
  public Doctor getDoctorById(UUID doctorid) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Doctor doctor = null;
    try {
      PreparedStatement stmt = connection.prepareStatement("SELECT * FROM doctors WHERE doctorid = '" + doctorid + "'");
      ResultSet rs = stmt.executeQuery();
      while (rs.next()) {
        doctor = new Doctor(UUID.fromString(rs.getString(1)), rs.getString(2), rs.getString(3), rs.getString(4),
            rs.getString(5),
            rs.getString(6), rs.getString(7));
      }

      rs.close();
      stmt.close();
      connection.close();

    } catch (SQLException e) {

      e.printStackTrace();
    }
    return doctor;
  }

  @Override
  public List<String> getInformationsDoctorByMail(String mail) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM Doctors WHERE mail=" + "'" + mail + "'";
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
  public List<List<String>> displayAppointments(UUID doctorid) throws SQLException {
    Connection connection = DBUtil.getConnection();
    List<List<String>> appointments = new ArrayList<>();
    DateFormat tf = new SimpleDateFormat("HH:mm");
    Statement stmt2 = connection.createStatement();
    String request2 = "DELETE FROM AvailableTimeSlots WHERE doctorid = (SELECT doctorid FROM Doctors WHERE doctorid='" + doctorid + "') and StartTime < NOW() - INTERVAL '1 week'";
    stmt2.executeUpdate(request2);
    stmt2.close();
    Statement stmt3 = connection.createStatement();
    String request3 = "UPDATE AvailableTimeSlots SET Booked = true WHERE doctorid = (SELECT doctorid FROM Doctors WHERE doctorid='" + doctorid + "') and StartTime < NOW()";
    stmt3.executeUpdate(request3);
    stmt3.close();
    PreparedStatement stmt = connection
        .prepareStatement(
            "SELECT * FROM AvailableTimeSlots WHERE doctorid=(SELECT doctorid FROM Doctors WHERE doctorid='" + doctorid + "') ORDER BY starttime");
    ResultSet rs = stmt.executeQuery();
    while (rs.next()) {
      List<String> l = new ArrayList<>();
      l.add(rs.getString(1));
      l.add(rs.getString(2));
      l.add(rs.getDate(3).toString());
      l.add(tf.format(rs.getTime(3)).toString());
      l.add(tf.format(rs.getTime(4)).toString());
      l.add(String.valueOf(rs.getBoolean(5)));
      appointments.add(l);
    }

    rs.close();
    stmt.close();
    connection.close();

    return appointments;
  }

  @Override
  public List<List<String>> getAllAppointmentsDoctor(String mail) throws SQLException {
    Connection connection = DBUtil.getConnection();
    List<List<String>> appointments = new ArrayList<List<String>>();
    Statement stmt = connection.createStatement();
    String sql = "SELECT appointments.appointmentid, appointments.StartTime, appointments.endtime, patients.firstname, patients.lastname, patients.patientid, patients.mail FROM patients JOIN appointments ON patients.patientid = appointments.patientid WHERE appointments.doctorid= (SELECT doctorid FROM Doctors WHERE mail= "
        + "'" + mail + "'" + ") ORDER BY appointments.starttime";
    ResultSet rs = stmt.executeQuery(sql);
    while (rs.next()) {
      List<String> l = new ArrayList<>();
      l.add(rs.getString(1));
      l.add(rs.getDate(2).toString());
      l.add(rs.getTime(2).toString());
      l.add(rs.getTime(3).toString());
      l.add(rs.getString(4));
      l.add(rs.getString(5));
      l.add(rs.getString(6));
      l.add(rs.getString(7));
      appointments.add(l);
    }

    rs.close();
    stmt.close();
    connection.close();

    return appointments;
  }

  @Override
  public List<HashMap<String, String>> getPatientsByDoctor(String mail) throws SQLException {
    Connection connection = DBUtil.getConnection();
    List<HashMap<String, String>> patients = new ArrayList<HashMap<String, String>>();
    Statement stmt = connection.createStatement();
    String sql = "SELECT * FROM Patients JOIN MedicalFile on (MedicalFile.patientid = Patients.patientid) where doctorid = '"
        + getDoctorIdByMail(mail) + "'";
    ResultSet rs = stmt.executeQuery(sql);
    while (rs.next()) {
      HashMap<String, String> l = new HashMap<>();
      l.put("id", rs.getString(1));
      l.put("firstName", rs.getString(2));
      l.put("lastName", rs.getString(3));
      l.put("gender", rs.getString(4));
      l.put("birthday", rs.getDate(5).toString());
      l.put("weight", String.valueOf(rs.getDouble(6)));
      l.put("heigth", String.valueOf(rs.getDouble(7)));
      l.put("mail", rs.getString(8));
      l.put("adress", rs.getString(9));
      l.put("numsocial", rs.getString(10));
      patients.add(l);
    }

    rs.close();
    stmt.close();
    connection.close();

    return patients;
  }

  @Override
  public UUID getDoctorIdByMail(String mail) throws SQLException {
    Connection connection = DBUtil.getConnection();
    UUID doctorId = null;
    Statement stmt = connection.createStatement();
    String request = "SELECT doctorId FROM Doctors WHERE mail =" + "'" + mail + "'";
    ResultSet rs = stmt.executeQuery(request);
    if (rs.next()) {
      doctorId = UUID.fromString(rs.getString(1));
    }

    rs.close();
    stmt.close();
    connection.close();

    return doctorId;
  }

  @Override
  public UUID addPrescription(String fileName, byte[] fileContent) throws SQLException {
    Connection connection = DBUtil.getConnection();
    MedicinePrescription prescription = new MedicinePrescription(fileName, fileContent);
    PreparedStatement pstmt = connection.prepareStatement(
        "INSERT INTO prescriptions (prescriptionsid, documentname, documentcontent) VALUES (?, ?, ?)");
    pstmt.setObject(1, prescription.getId());
    pstmt.setString(2, fileName);
    pstmt.setBytes(3, fileContent);
    pstmt.executeUpdate();
    pstmt.close();
    DBUtil.closeConnection(connection);
    return prescription.getId();
  }

  @Override
  public void addConsultation(String mail, String lastname, String firstname, Date date, String motif, String fileName,
      byte[] fileContent) throws SQLException {
    JdbcPatientRepository patientRepository = new JdbcPatientRepository();
    UUID patientid = patientRepository.getPatientIdByName(firstname, lastname);
    String request = null;
    UUID doctorId = getDoctorIdByMail(mail);
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    if (fileName == null && fileContent == null) {
      request = "INSERT INTO Consultations(PatientId , DoctorId , Day , motif) VALUES (" + "'"
          + patientid + "'" + "," + "'" + doctorId + "'" + "," + "'"
          + new java.sql.Date(date.getTime()) + "'" + "," + "'"
          + motif + "')";
    } else {
      request = "INSERT INTO Consultations(PatientId , DoctorId , Day , motif, PrescriptionsId ) VALUES (" + "'"
          + patientid + "'" + "," + "'" + doctorId + "'" + "," + "'"
          + new java.sql.Date(date.getTime()) + "'" + "," + "'"
          + motif + "'" + "," + "'"
          + addPrescription(fileName, fileContent) + "')";
    }
    stmt.executeUpdate(request);

    stmt.close();
    connection.close();

  }

  @Override
  public List<List<Object>> getConsultationsDoctor(String mail, String firstname, String lastname) throws SQLException {
    JdbcPatientRepository patientRepository = new JdbcPatientRepository();
    UUID patientid = patientRepository.getPatientIdByName(firstname, lastname);
    UUID doctorId = getDoctorIdByMail(mail);
    List<List<Object>> informations = new ArrayList<>();
    SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM Consultations WHERE patientid ="
        + "'" + patientid + "'" + " AND doctorid=" + "'" + doctorId + "' ORDER BY Consultations.day";
    ResultSet rs = stmt.executeQuery(request);
    while (rs.next()) {
      List<Object> l = new ArrayList<>();
      l.add(df.format(rs.getDate(4)).toString());
      l.add(rs.getString(5));
      String value = rs.getString(6);
      if (!rs.wasNull()) {
        Connection connection2 = DBUtil.getConnection();
        Statement stmt2 = connection2.createStatement();
        String request2 = "SELECT * from Prescriptions WHERE prescriptionsid = '" + value + "'";
        ResultSet rs2 = stmt2.executeQuery(request2);
        if (rs2.next()) {
          l.add(rs2.getString(2));
          l.add(rs2.getBytes(3));
        }
        rs2.close();
        stmt2.close();
        connection2.close();
      }
      informations.add(l);
    }
    rs.close();
    stmt.close();
    connection.close();
    return informations;
  }

  public List<List<Object>> getDocumentPatient(String idAppt) throws SQLException {
    List<List<Object>> documentsByApptId = new ArrayList<>();
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT documentname,documentcontent from documents where appointmentid = '" + idAppt + "'";
    ResultSet rs = stmt.executeQuery(request);
    while (rs.next()) {
      List<Object> doc = new ArrayList<>();
      doc.add(rs.getString(1));
      doc.add(rs.getBytes(2));
      documentsByApptId.add(doc);
    }
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
    return documentsByApptId;
  }

  @Override
  public List<Object> getPriceConsultations(String idDoctor) throws SQLException {
    List<Object> price = new ArrayList<>();
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT pricename,price from price where doctorid = '" + idDoctor + "'";
    ResultSet rs = stmt.executeQuery(request);
    while (rs.next()) {
      price.add(rs.getString(1));
      price.add(rs.getString(2));
    }
    rs.close();
    stmt.close();
    DBUtil.closeConnection(connection);
    return price;
  }

  @Override
  public void modifyInfoPersoDoctor(String idDoctor, String firstName, String lastName, String gender)
      throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "UPDATE doctors SET firstname = '" + firstName + "', lastname = '" + lastName + "', gender = '"
        + gender + "' where doctorid = '" + idDoctor + "'";
    stmt.executeUpdate(request);
    stmt.close();
    DBUtil.closeConnection(connection);
  }

  @Override
  public void modifyCredentialsDoctor(String idDoctor, String newMail, String prevMail, String password)
      throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "UPDATE doctors SET mail = '" + newMail + "' where doctorid = '" + idDoctor + "'";
    stmt.executeUpdate(request);
    stmt.close();
    Statement stmt1 = connection.createStatement();
    String request1 = null;
    if (password != null && password != "") {
      request1 = "UPDATE users SET mail = '" + newMail + "',password = '" + password + "' where mail = '" + prevMail
          + "'";
    } else {
      request1 = "UPDATE users SET mail = '" + newMail + "' where mail = '" + prevMail + "'";
    }
    stmt1.executeUpdate(request1);
    stmt1.close();
    DBUtil.closeConnection(connection);
  }

  public void modifyProInfoDoctor(String idDoctor, String infos, List<List<String>> priceList, List<List<String>> prevPriceList, List<String> deletedPrice)
      throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "UPDATE doctors SET informations = '" + infos + "' where doctorid = '" + idDoctor + "'";
    stmt.executeUpdate(request);
    stmt.close();
    for (int i = 0; i < priceList.size(); ++i){
      if (i >= prevPriceList.size()){
        Statement stmt1 = connection.createStatement();
        String request1 = "INSERT INTO price(doctorid , pricename , price ) VALUES (" + "'"
        + idDoctor + "'" + "," + "'" + priceList.get(i).get(0) + "'" + ","
        + priceList.get(i).get(1) + ")";
        stmt1.executeUpdate(request1);
        stmt1.close();
      }else{
        Statement stmt1 = connection.createStatement();
        String request1 = "UPDATE price SET pricename = '" + priceList.get(i).get(0) + "',price = " + priceList.get(i).get(1) +
          " where doctorid = '" + idDoctor + "' and pricename = '" + prevPriceList.get(i).get(0) + "'";
        stmt1.executeUpdate(request1);
        stmt1.close();
      }
    }
    for (int i = 0; i < deletedPrice.size(); i += 2){
      Statement stmt2 = connection.createStatement();
      String request2 = "DELETE FROM price where doctorid = '" + idDoctor + "' and pricename = '" + deletedPrice.get(i) + "'";
      stmt2.executeUpdate(request2);
      stmt2.close();
    }
    DBUtil.closeConnection(connection);
  }

}
