package core.application.medicalpractice.infra.user;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Service;

import core.application.DButils.DBUtil;
import core.application.medicalpractice.domain.entity.User;

@Service
public class JdbcUserRepository implements UserRepository {

    public boolean saveUser(User user) {
        try {
            Connection connection = DBUtil.getConnection();
            Statement stmt = connection.createStatement();
            String request = "INSERT INTO Users(mail, password) VALUES (" + "'" + user.getMail() + "'" + "," + "'" + user.getPassword()+ "'" + ")";
            stmt.executeUpdate(request);
            stmt.close();
            DBUtil.closeConnection(connection);
        } catch (SQLException e) {
            return false;
        }
        return true;
    }

    public void resetPassword(User user) throws SQLException {
        Connection connection = DBUtil.getConnection();
        Statement stmt = connection.createStatement();
        String request = "UPDATE Users SET password=" + "'" + user.getPassword() + "'" + "WHERE mail=" + "'" + user.getMail() + "'";
        stmt.executeUpdate(request);
        stmt.close();
        DBUtil.closeConnection(connection);
    }

    public boolean checkLoginExist(User user) throws SQLException {
        Connection connection = DBUtil.getConnection();
        Statement stmt = connection.createStatement();
        String request = "SELECT * FROM Users WHERE mail=" + "'" + user.getMail() + "' AND " + "password=" + "'" + user.getPassword() + "'";
        ResultSet rs = stmt.executeQuery(request);
        Boolean exist = rs.next();
        rs.close();
        stmt.close();
        DBUtil.closeConnection(connection);
        return exist;
    }

    public boolean checkUserExist(String mail) throws SQLException {
        Connection connection = DBUtil.getConnection();
        Statement stmt = connection.createStatement();
        String request = "SELECT * FROM Users WHERE mail=" + "'" + mail + "'";
        ResultSet rs = stmt.executeQuery(request);
        Boolean exist = rs.next();
        rs.close();
        stmt.close();
        DBUtil.closeConnection(connection);
        return exist;
    }

    @Override
    public String getUserType(User user) throws SQLException {
        String userType = null;
        Connection connection = DBUtil.getConnection();
        Statement stmt = connection.createStatement();
        String request = "SELECT userType FROM Users WHERE mail=" + "'" + user.getMail() + "'";
        ResultSet rs = stmt.executeQuery(request);
        if (rs.next()){
            userType = rs.getString(1);
        }
        rs.close();
        stmt.close();
        DBUtil.closeConnection(connection);
        return userType;
    }

}
