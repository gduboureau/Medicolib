package core.application.medicalpractice.domain.valueObjects;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Prescription {
    
    private final Map<String, Integer> medications;
    private final UUID id;

    public Prescription(){
        medications = new HashMap<>();
        id = UUID.randomUUID();
    }

    public void addMedication(String medication, int quantity){
        medications.put(medication, quantity);
    }

    public Map<String,Integer> getMedications(){
        return medications;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((medications == null) ? 0 : medications.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
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
        Prescription other = (Prescription) obj;
        if (medications == null) {
            if (other.medications != null)
                return false;
        } else if (!medications.equals(other.medications))
            return false;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    
}
