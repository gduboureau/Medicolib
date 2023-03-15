package core.application.medicalpractice.infra.doctor;

import java.sql.*;
import java.util.*;

import org.springframework.stereotype.Service;

import core.application.DButils.DBUtil;
import core.application.medicalpractice.domain.entity.Doctor;
import core.application.medicalpractice.domain.valueObjects.Appointment;
import core.application.medicalpractice.domain.valueObjects.TimeSlot;

@Service
public class JdbcDoctorRepository implements DoctorRepository {

  Connection connection;

  public JdbcDoctorRepository() throws SQLException{
    connection = DBUtil.getConnection();
  }

  @Override
  public List<Doctor> getAllDoctors(){
    List<Doctor> doctorList = new ArrayList<Doctor>();
    try {
      PreparedStatement stmt = connection.prepareStatement("SELECT * FROM doctors");
      ResultSet rs = stmt.executeQuery();

      while(rs.next()){
        Doctor doctor = new Doctor(rs.getString(1), rs.getString(2),rs.getString(3),rs.getString(4));
        doctorList.add(doctor);
      }
    } catch (SQLException e) {
      
      e.printStackTrace();
    }
    return doctorList;
  }

  @Override
  public List<String> getAllSpecialities(){
    List<String> specialityList = new ArrayList<String>();
    try {
      PreparedStatement stmt = connection.prepareStatement("SELECT DISTINCT speciality FROM doctors");
      ResultSet rs = stmt.executeQuery();

      while(rs.next()){
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
      PreparedStatement stmt = connection.prepareStatement("SELECT * FROM doctors WHERE speciality = '" + speciality + "'");
      ResultSet rs = stmt.executeQuery();

      while(rs.next()){
        Doctor doctor = new Doctor(rs.getString(1), rs.getString(2),rs.getString(3),rs.getString(4));
        doctorList.add(doctor);
      }
    } catch (SQLException e) {

      e.printStackTrace();
    }
    return doctorList;
  }

  public List<Appointment> getAppointmentsByDoctors(Doctor doctor){
    List<Appointment> appointments = new ArrayList<Appointment>();
    try {
      PreparedStatement stmt = connection.prepareStatement("SELECT beginconsultation,endconsultation FROM consultations WHERE doctorId = '" + doctor.getId() + "'");
      ResultSet rs = stmt.executeQuery();

      while(rs.next()){
        Appointment appt = new Appointment(new TimeSlot(rs.getDate(1), rs.getDate(2)));
        appointments.add(appt);
      }
    } catch (SQLException e) {

      e.printStackTrace();
    }
    return appointments;
  }

}
