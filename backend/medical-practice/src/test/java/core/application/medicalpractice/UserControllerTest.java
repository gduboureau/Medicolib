package core.application.medicalpractice;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import core.application.medicalpractice.UI.controller.JWTToken;
import core.application.medicalpractice.UI.controller.UserController;
import core.application.medicalpractice.application.MedicalPractice;
import core.application.medicalpractice.domain.entity.User;
import jakarta.mail.internet.MimeMessage;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(OrderAnnotation.class)
public class UserControllerTest {

    private MockMvc mockMvc;

    private UserController userController;

    @Mock
    private MedicalPractice medicalPractice;

    @Mock
    private JWTToken jwtToken;

    @Mock
    private JavaMailSender javaMailSender;
    
    @BeforeEach
    void initializeValue() {
        MockitoAnnotations.openMocks(this);
        userController = new UserController();
        userController.medicalPractice = medicalPractice;
        userController.jwtToken = jwtToken;
        userController.javaMailSender = javaMailSender;
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /*@Test
      void testCheckLogin() throws Exception {
        Map<String, String> map = new HashMap<>();
        map.put("login", "test@gmail.com");
        map.put("password", "test");
        User user = new User("test@gmail.com", "test");
        when(medicalPractice.checkLoginExist(user)).thenReturn(true);

        this.mockMvc.perform(post("/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(asJsonString(map)))
        .andExpect(status().isOk());
    }*/

    @Test
    void testCheckLoginWithBadCredentials() throws Exception {
        Map<String, String> map = new HashMap<>();
        map.put("login", "test@gmail.com");
        map.put("password", "testfalse");
        User user = new User("test@gmail.com", "test");

        when(medicalPractice.checkLoginExist(user)).thenReturn(false);

        this.mockMvc.perform(post("/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(asJsonString(map)))
        .andExpect(status().isForbidden());
    }

    @Test
    public void testResetPassword() throws Exception {
        Map<String, String> map = new HashMap<>();
        map.put("mail", "test@gmail.com");
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        when(medicalPractice.checkUserExist("test@gmail.com")).thenReturn(true);
        when(javaMailSender.createMimeMessage()).thenReturn(mimeMessage);
        when(jwtToken.createToken("test@gmail.com")).thenReturn("testtoken");

        mockMvc.perform(post("/new-password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(map)))
                .andExpect(status().isOk());
    }

    @Test
    public void testResetPasswordWithNonUser() throws Exception {
        Map<String, String> map = new HashMap<>();
        map.put("mail", "test@gmail.com");

        when(medicalPractice.checkUserExist("test@gmail.com")).thenReturn(false);

        mockMvc.perform(post("/new-password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(map)))
                .andExpect(status().isNotFound());
    }
}
