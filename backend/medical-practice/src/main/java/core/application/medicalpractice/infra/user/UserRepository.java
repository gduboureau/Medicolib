package core.application.medicalpractice.infra.user;

import java.sql.SQLException;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {
    
    public boolean saveUser(String mail, String password);
    public void resetPassword(String email, String password) throws SQLException;
    public boolean checkLoginExist(String email, String password) throws SQLException;
    public boolean checkUserExist(String mail) throws SQLException;
    public String getUserType(String mail) throws SQLException;
    
}
