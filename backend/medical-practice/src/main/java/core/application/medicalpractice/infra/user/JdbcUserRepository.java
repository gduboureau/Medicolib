package core.application.medicalpractice.infra.user;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Service;

import core.application.DButils.DBUtil;

@Service
public class JdbcUserRepository implements UserRepository {

    Connection connection;

    public boolean saveUser(String mail, String password) {
        try {
            connection = DBUtil.getConnection();
            Statement stmt = connection.createStatement();
            String request = "INSERT INTO Users(mail, password) VALUES (" + "'" + mail + "'" + "," + "'" + password
                    + "'" + ")";
            stmt.executeUpdate(request);
            DBUtil.closeConnection(connection);
        } catch (SQLException e) {
            return false;
        }
        return true;
    }

    public void resetPassword(String mail, String password) throws SQLException {
        connection = DBUtil.getConnection();
        Statement stmt = connection.createStatement();
        String request = "UPDATE Users SET password=" + "'" + password + "'" + "WHERE mail=" + "'" + mail + "'";
        stmt.executeUpdate(request);
        DBUtil.closeConnection(connection);
    }

    public boolean checkLoginExist(String mail, String password) throws SQLException {
        connection = DBUtil.getConnection();
        Statement stmt = connection.createStatement();
        String request = "SELECT * FROM Users WHERE mail=" + "'" + mail + "' AND" + "password=" + "'" + password + "'";
        ResultSet rs = stmt.executeQuery(request);
        return rs.next();
    }
}
