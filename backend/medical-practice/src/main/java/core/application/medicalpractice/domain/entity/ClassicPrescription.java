package core.application.medicalpractice.domain.entity;

import java.util.Date;

public class ClassicPrescription implements Prescription{
    Patient patient;
    Doctor doctor;
    Date date;

    public ClassicPrescription(Patient patient, Doctor doctor, Date date){
        this.patient = patient;
        this.doctor = doctor; 
        this.date = date;
    }

    @Override
    public String getName() {
        return "classic prescription";
    }
    
}
