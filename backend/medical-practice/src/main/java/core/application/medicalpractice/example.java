package core.application.medicalpractice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class example {
    
	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}
}
