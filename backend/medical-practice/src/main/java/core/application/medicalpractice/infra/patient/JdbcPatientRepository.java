package core.application.medicalpractice.infra.patient;

import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.stereotype.Service;

import core.application.DButils.DBUtil;
import core.application.medicalpractice.domain.entity.*;

@Service
public class JdbcPatientRepository implements PatientRepository {

  Connection connection;

  public JdbcPatientRepository() throws SQLException {
    connection = DBUtil.getConnection();
  }

  @Override
  public List<List<String>> getAllAppointmentsByPatient(String mail) throws SQLException{
    List<List<String>> appointments = new ArrayList<List<String>>();
    DateFormat df = new SimpleDateFormat("EEEE d MMM yyyy");
    Statement stmt = connection.createStatement();
    String sql = "SELECT doctors.firstname, doctors.lastname, doctors.speciality, appointments.startdate FROM doctors JOIN appointments ON doctors.doctorid = appointments.doctorid WHERE appointments.patientid= (SELECT patientid FROM Patients WHERE mail= "
        + "'" + mail + "'" + ")";
    ResultSet rs = stmt.executeQuery(sql);
    while (rs.next()) {
      List<String> l = new ArrayList<>();
      l.add(rs.getString(1));
      l.add(rs.getString(2));
      l.add(rs.getString(3));
      l.add(df.format(rs.getDate(4)).toString());
      l.add(rs.getTime(4).toString());
      appointments.add(l);
    }
    return appointments;
  }

  @Override
  public void savePatient(Patient patient) throws SQLException {
    Statement stmt = connection.createStatement();

    if (checkPatientExist(patient.getMail())){
      String request = "UPDATE Patients SET firstname = '" + patient.getFirstName() + "',lastname = '" + patient.getLastName()
      + "', gender = '" + patient.getGender() + "', birthday = '" + patient.getBirthday() + "', weight = '" + patient.getWeight() 
      + "', height = '" + patient.getHeight() + "', mail = '" + patient.getMail() + "', address = '" + patient.getAdress() + "', numsocial = '"
      + patient.getNumSocial() + "' WHERE mail = '" + patient.getMail() + "'";
      stmt.executeUpdate(request);
    }else{
      String request = "INSERT INTO Patients(patientid, firstname, lastname, gender, birthday, weight, height, mail, address, numsocial) VALUES ("
      + "'" + patient.getId() + "'" + "," + "'" + patient.getFirstName() + "'" + "," + "'" + patient.getLastName()
      + "'" + "," + "'"
      + patient.getGender() + "'" + "," + "'" + new java.sql.Date(patient.getBirthday().getTime()) + "'" + ","
      + patient.getWeight() + "," + patient.getHeight() + "," + "'" + patient.getMail() + "'" + "," + "'"
      + patient.getAdress() + "','" + patient.getNumSocial() + "')";
      stmt.executeUpdate(request);
    }

  }

  @Override
  public boolean checkPatientExist(String mail) throws SQLException {
    connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM Patients WHERE mail=" + "'" + mail + "'";
    ResultSet rs = stmt.executeQuery(request);
    return rs.next();
  }

  @Override
  public List<String> getInformationsPatient(String mail) throws SQLException {
    connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM Patients WHERE mail=" + "'" + mail + "'";
    ResultSet rs = stmt.executeQuery(request);
    ResultSetMetaData rsmd = rs.getMetaData();
    List<String> informations = new ArrayList<>();
    if (rs.next()){
      for (int i = 1; i < rsmd.getColumnCount() + 1 ; i++){
        informations.add(rs.getString(i));
      }
    }
    return informations;
  }

  @Override
  public void saveAddress(Patient patient) throws SQLException{
    connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    if (getAddress(patient.getMail()) == null){
      String request = "INSERT INTO Address(patientid, numrue, nomrue, postalcode	, city) VALUES ("
      + "'" + patient.getId() + "'" + "," + "'" + patient.getAdress().getNumber() + "'" + "," + "'" + patient.getAdress().getStreet()
      + "'" + "," + "'"
      + patient.getAdress().getPostalCode() + "'" + "," + "'" + patient.getAdress().getCity() + "'" + ")";
      stmt.executeUpdate(request);
    }else{
      String request = "UPDATE Address SET numrue = '" + patient.getAdress().getNumber()
      + "', nomrue = '" + patient.getAdress().getStreet() + "', postalcode = '" + patient.getAdress().getPostalCode() + "', city = '" 
      + patient.getAdress().getCity() + "'";
      stmt.executeUpdate(request);
    }
  }

  @Override
  public Address getAddress(String mail) throws SQLException{
    connection = DBUtil.getConnection();
    Statement stmt = connection.createStatement();
    String request = "SELECT * FROM Address JOIN Patients ON (Address.patientid = Patients.patientid) WHERE mail =" + "'" + mail + "'";
    ResultSet rs = stmt.executeQuery(request);
    Address addr = null;
    if (rs.next()){
      addr = new Address(rs.getInt(2), rs.getString(3), rs.getString(5), rs.getInt(4));
    }
    return addr;
  }

}
