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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((patient == null) ? 0 : patient.hashCode());
        result = prime * result + ((doctor == null) ? 0 : doctor.hashCode());
        result = prime * result + ((date == null) ? 0 : date.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ClassicPrescription other = (ClassicPrescription) obj;
        if (patient == null) {
            if (other.patient != null)
                return false;
        } else if (!patient.equals(other.patient))
            return false;
        if (doctor == null) {
            if (other.doctor != null)
                return false;
        } else if (!doctor.equals(other.doctor))
            return false;
        if (date == null) {
            if (other.date != null)
                return false;
        } else if (!date.equals(other.date))
            return false;
        return true;
    }
    
}
