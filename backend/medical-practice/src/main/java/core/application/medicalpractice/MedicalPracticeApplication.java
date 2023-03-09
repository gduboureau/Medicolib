package core.application.medicalpractice;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import core.application.medicalpractice.infra.MedicalRepository;

@SpringBootApplication
public class MedicalPracticeApplication {

	public static void main(String[] args) {
		//MedicalRepository test = new MedicalRepository();
		//test.Test(); //Test for Postgre Connection
		SpringApplication.run(MedicalPracticeApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {

			System.out.println("Let's inspect the beans provided by Spring Boot:");

			String[] beanNames = ctx.getBeanDefinitionNames();
			Arrays.sort(beanNames);
			for (String beanName : beanNames) {
				System.out.println(beanName);
			}

		};
	}

}
