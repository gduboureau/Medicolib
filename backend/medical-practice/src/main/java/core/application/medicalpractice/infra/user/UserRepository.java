package core.application.medicalpractice.infra.user;

import java.sql.SQLException;

import org.springframework.stereotype.Repository;

import core.application.medicalpractice.domain.entity.User;

@Repository
public interface UserRepository {
    
    public boolean saveUser(User user);
    public void resetPassword(User user) throws SQLException;
    public boolean checkLoginExist(User user) throws SQLException;
    public boolean checkUserExist(String mail) throws SQLException;
    public String getUserType(User user) throws SQLException;
    
}
