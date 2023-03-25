package core.application.medicalpractice.infra.doctor;

import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.stereotype.Service;

import core.application.DButils.DBUtil;
import core.application.medicalpractice.domain.entity.Doctor;

@Service
public class JdbcDoctorRepository implements DoctorRepository {

  Connection connection;

  public JdbcDoctorRepository() throws SQLException {
    connection = DBUtil.getConnection();
  }

  @Override
  public List<Doctor> getAllDoctors() {
    List<Doctor> doctorList = new ArrayList<Doctor>();
    try {
      PreparedStatement stmt = connection.prepareStatement("SELECT * FROM doctors");
      ResultSet rs = stmt.executeQuery();

      while (rs.next()) {
        Doctor doctor = new Doctor(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5),
            rs.getString(6));
        doctorList.add(doctor);
      }
    } catch (SQLException e) {

      e.printStackTrace();
    }
    return doctorList;
  }

  @Override
  public List<String> getAllSpecialities() {
    List<String> specialityList = new ArrayList<String>();
    try {
      PreparedStatement stmt = connection.prepareStatement("SELECT DISTINCT speciality FROM doctors");
      ResultSet rs = stmt.executeQuery();

      while (rs.next()) {
        specialityList.add(rs.getString(1));
      }
    } catch (SQLException e) {

      e.printStackTrace();
    }
    return specialityList;
  }

  @Override
  public List<Doctor> getDoctorsBySpeciality(String speciality) {
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
    } catch (SQLException e) {

      e.printStackTrace();
    }
    return doctorList;
  }

  @Override
  public Doctor getDoctorById(UUID doctorid) {
    Doctor doctor = null;
    try {
      PreparedStatement stmt = connection.prepareStatement("SELECT * FROM doctors WHERE doctorid = '" + doctorid + "'");
      ResultSet rs = stmt.executeQuery();
      while (rs.next()) {
        doctor = new Doctor(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5),
            rs.getString(6));
      }

    } catch (SQLException e) {

      e.printStackTrace();
    }
    return doctor;
  }

  @Override
  public List<List<String>> displayAppointments(String firstName, String lastName) throws SQLException {
    List<List<String>> appointments = new ArrayList<>();
    DateFormat df = new SimpleDateFormat("EEEE d MMM");
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
    return appointments;
  }

  @Override
  public List<List<String>> getAllAppointmentsDoctor(String mail) throws SQLException {
    List<List<String>> appointments = new ArrayList<List<String>>();
    DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
    Statement stmt = connection.createStatement();
    String sql = "SELECT appointments.appointmentid, appointments.StartTime, appointments.endtime, patients.firstname, patients.lastname FROM patients JOIN appointments ON patients.patientid = appointments.patientid WHERE appointments.doctorid= (SELECT doctorid FROM Doctors WHERE mail= "
        + "'" + mail + "'" + ") ORDER BY appointments.starttime";
    ResultSet rs = stmt.executeQuery(sql);
    while (rs.next()) {
      List<String> l = new ArrayList<>();
      l.add(rs.getString(1));
      l.add(df.format(rs.getDate(2)).toString());
      l.add(rs.getTime(2).toString());
      l.add(rs.getTime(3).toString());
      l.add(rs.getString(4));
      l.add(rs.getString(5));
      appointments.add(l);
    }
    return appointments;
  }

}
