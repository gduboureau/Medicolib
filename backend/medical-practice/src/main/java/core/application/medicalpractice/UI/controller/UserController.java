package core.application.medicalpractice.UI.controller;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import core.application.medicalpractice.application.MedicalPractice;

@RestController
public class UserController {

    @Autowired
	private MedicalPractice medicalPractice;

    @Autowired
    private JWTToken jwtToken;

    @PostMapping(value = "/login")
	public ResponseEntity<?>  checkLogin(@RequestBody Map<String, String> map) throws SQLException {
        String email = map.get("login");
        String password = map.get("password");
        if (medicalPractice.checkLoginExist(email, password)){
            String token = jwtToken.createToken(email);
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		
	}
    
    
}
