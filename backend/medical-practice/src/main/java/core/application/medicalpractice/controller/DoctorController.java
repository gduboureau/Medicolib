package core.application.medicalpractice.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import core.application.medicalpractice.domain.entity.Doctor;
import core.application.medicalpractice.infra.JdbcDoctorRepository;

@RestController
public class DoctorController {
    
	@Autowired
	private JdbcDoctorRepository jdbcDoctorRepository;

	@RequestMapping(value="/doctors", method=RequestMethod.GET, produces="application/json")
	public List<Doctor> getAllDoctors(){
		return this.jdbcDoctorRepository.getAllDoctors();
	}

	@RequestMapping(value="/doctors/specialities", method=RequestMethod.GET, produces="application/json")
	public List<String> getAllSpecialities(){
		return this.jdbcDoctorRepository.getAllSpecialities();
	}
	
	@RequestMapping(value="/doctors/{speciality}", method=RequestMethod.GET, produces="application/json")
    public List<Doctor> getDoctorsBySpeciality(@PathVariable("speciality") String speciality){
        return this.jdbcDoctorRepository.getDoctorsBySpeciality(speciality);
    }
}
