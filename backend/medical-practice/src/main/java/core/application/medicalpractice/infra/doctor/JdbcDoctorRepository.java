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
        Doctor doctor = new Doctor(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5),
            rs.getString(6));
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
        Doctor doctor = new Doctor(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5),
            rs.getString(6));
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
        doctor = new Doctor(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5),
            rs.getString(6));
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
  public List<List<String>> displayAppointments(String firstName, String lastName) throws SQLException {
    Connection connection = DBUtil.getConnection();
    List<List<String>> appointments = new ArrayList<>();
    DateFormat df = new SimpleDateFormat("EEEE d MMM yyyy");
    DateFormat tf = new SimpleDateFormat("HH:mm");
    PreparedStatement stmt = connection
        .prepareStatement(
            "SELECT * FROM AvailableTimeSlots WHERE doctorid=(SELECT doctorid FROM Doctors WHERE firstname=" + "'"
                + firstName + "'" + " AND lastname=" + "'" + lastName + "') ORDER BY starttime");
    ResultSet rs = stmt.executeQuery();
    while (rs.next()) {
      List<String> l = new ArrayList<>();
      l.add(rs.getString(1));
      l.add(rs.getString(2));
      l.add(df.format(rs.getDate(3)).toString());
      l.add(tf.format(rs.getTime(3)).toString());
      l.add(tf.format(rs.getTime(4)).toString());
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
    String sql = "SELECT appointments.appointmentid, appointments.StartTime, appointments.endtime, patients.firstname, patients.lastname FROM patients JOIN appointments ON patients.patientid = appointments.patientid WHERE appointments.doctorid= (SELECT doctorid FROM Doctors WHERE mail= "
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
      appointments.add(l);
    }

    rs.close();
    stmt.close();
    connection.close();

    return appointments;
  }

  @Override
  public List<List<String>> getPatientsByDoctor(String mail) throws SQLException {
    Connection connection = DBUtil.getConnection();
    List<List<String>> patients = new ArrayList<List<String>>();
    Statement stmt = connection.createStatement();
    String sql = "SELECT * FROM Patients JOIN MedicalFile on (MedicalFile.patientid = Patients.patientid) where doctorid = '"
        + getDoctorIdByMail(mail) + "'";
    ResultSet rs = stmt.executeQuery(sql);
    while (rs.next()) {
      List<String> l = new ArrayList<>();
      l.add(rs.getString(2));
      l.add(rs.getString(3));
      l.add(rs.getString(4));
      l.add(rs.getDate(5).toString());
      l.add(rs.getString(8));
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
  public UUID addPrescription(List<String> medicList) throws SQLException {
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    MedicinePrescription medicinePrescription = new MedicinePrescription(medicList);
    StringBuilder stringBuilder = new StringBuilder();
    for (String medic : medicList) {
      stringBuilder.append(medic + " ");
    }
    String request = "INSERT INTO Prescriptions (prescriptionsId, Description) VALUES (" + "'"
        + medicinePrescription.getID() + "', '" + stringBuilder.toString() + "')";
    stmt.executeUpdate(request);

    stmt.close();
    connection.close();

    return medicinePrescription.getID();
  }

  @Override
  public void addConsultation(String mail, String lastname, String firstname, Date date, String motif,
      List<String> medicList) throws SQLException {
    JdbcPatientRepository patientRepository = new JdbcPatientRepository();
    UUID patientid = patientRepository.getPatientIdByName(firstname, lastname);
    UUID doctorId = getDoctorIdByMail(mail);
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "INSERT INTO Consultations(PatientId , DoctorId , Day , PrescriptionsId ) VALUES (" + "'"
        + patientid + "'" + "," + "'" + doctorId + "'" + "," + "'"
        + new java.sql.Date(date.getTime()) + "'" + "," + "'"
        + addPrescription(medicList) + "')";
    stmt.executeUpdate(request);

    stmt.close();
    connection.close();

  }

  @Override
  public List<List<String>> getConsultations(String mail, String firstname, String lastname) throws SQLException {
    JdbcPatientRepository patientRepository = new JdbcPatientRepository();
    UUID patientid = patientRepository.getPatientIdByName(firstname, lastname);
    UUID doctorId = getDoctorIdByMail(mail);
    List<List<String>> informations = new ArrayList<>();
    SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
    Connection connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM Consultations JOIN Prescriptions ON Consultations.prescriptionsid = Prescriptions.prescriptionsid WHERE consultations.patientid ="
        + "'" + patientid + "'" + " AND consultations.doctorid=" + "'" + doctorId + "'";
    ResultSet rs = stmt.executeQuery(request);
    while (rs.next()) {
      List<String> l = new ArrayList<>();
      l.add(df.format(rs.getDate(4)).toString());
      if (rs.getString(7).equals(" ")) {
        l.add("Pas de prescriptions");
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

}
