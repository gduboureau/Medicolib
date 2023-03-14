package core.application.medicalpractice.application;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import core.application.medicalpractice.domain.aggregate.*;
import core.application.medicalpractice.domain.entity.*;
import core.application.medicalpractice.domain.valueObjects.Appointment;
import core.application.medicalpractice.infra.*;

@Service
public class MedicalPractice {

    private MedicalRepository medicalDatas;
    private JdbcDoctorRepository doctorRepository;
    private JdbcPatientRepository patientRepository;
    private HashMap<Integer,MedicalFile> medicalFiles;

    public MedicalPractice() throws SQLException{
        this.medicalDatas = new MedicalRepository();
        this.doctorRepository = new JdbcDoctorRepository();
        this.patientRepository = new JdbcPatientRepository();
        this.medicalFiles = new HashMap<>();
    }

    //requests for doctors

    public List<Doctor> getAllDoctors(){
        return doctorRepository.getAllDoctors();
    }

    public List<String> getAllSpecialities(){
        return doctorRepository.getAllSpecialities();
    }

    public List<Doctor> getDoctorsBySpeciality(String speciality){
        return doctorRepository.getDoctorsBySpeciality(speciality);
    }

    public List<Appointment> getAppointmentByDoctor(Doctor doctor){
        return doctorRepository.getAppointmentsByDoctors(doctor);
    }


    //requests for patients

    
    public List<Appointment> getAppointmentByPatient(Patient patient){
        return patientRepository.getAppointmentsByPatient(patient);
    }

    public void savePatient(Patient patient) throws SQLException{
        patientRepository.savePatient(patient);

    }


    //requests for medical files


    public int createMedicalFile(){
        //Patient patient = new Patient();
        MedicalFile medicalFile = new MedicalFile(null);
        return 1;
    }

    public void saveMedicalFile(MedicalFile file){

    }

    public MedicalFile getMedicalFile(UUID medicalId){
        return null;
    }
    
}
