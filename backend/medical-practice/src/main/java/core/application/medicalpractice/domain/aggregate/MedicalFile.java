package core.application.medicalpractice.domain.aggregate;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import core.application.medicalpractice.domain.entity.*;

public class MedicalFile {
    
    private List<Consultation> consultations;
    private UUID patientId;

    public UUID getPatientId() {
        return patientId;
    }

    public MedicalFile(UUID patientId){
        consultations = new ArrayList<>();
        this.patientId = patientId;
    }

    public void addConsultation(Consultation consultation){
        consultations.add(consultation);
    }

    public List<Consultation> getConsultations(){
        return consultations;
    }

}
