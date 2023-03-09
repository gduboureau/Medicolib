package core.application.medicalpractice.application;

import java.util.HashMap;
import java.util.UUID;

import org.apache.tomcat.util.http.parser.MediaTypeCache;

import core.application.medicalpractice.domain.aggregate.*;
import core.application.medicalpractice.domain.entity.*;
import core.application.medicalpractice.infra.*;

public class MedicalPractice {

    private MedicalRepository medicalDatas;
    private HashMap<Integer,MedicalFile> medicalFiles;
    
    public MedicalPractice(){
        this.medicalDatas = new MedicalRepository();
        this.medicalFiles = new HashMap<>();
    }

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
