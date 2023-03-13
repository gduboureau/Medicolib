package core.application.medicalpractice.infra;

import java.sql.*;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.application.DButils.DBUtil;
import core.application.medicalpractice.domain.entity.Doctor;

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

}
