package core.application.medicalpractice.domain.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


public class MedicinePrescription{
    
    private final UUID id;
    private final List<String> medications;
    

    public MedicinePrescription(){
        medications = new ArrayList<>();
        id = UUID.randomUUID();
    }

    public void addMedicine(String medicine){
        medications.add(medicine);
    }

    public List<String> getMedications(){
        return medications;
    }

    public UUID getID(){
        return this.id; 
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((medications == null) ? 0 : medications.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;
        MedicinePrescription other = (MedicinePrescription) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (medications == null) {
            if (other.medications != null)
                return false;
        } else if (!medications.equals(other.medications))
            return false;
        return true;
    }


}
