package core.application.medicalpractice.domain.entity;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import core.application.medicalpractice.domain.valueObjects.Medicine;

public class MedicinePrescription extends PrescriptionDecorator{
    private final UUID id;
    private final Map<Integer, Medicine> medications;
    

    public MedicinePrescription(Prescription prescription){
        super(prescription);
        medications = new HashMap<>();
        id = UUID.randomUUID();
    }

    public void addMedicine(int quantity, Medicine medicine){
        medications.put(quantity, medicine);
    }

    public Map<Integer, Medicine> getMedications(){
        return medications;
    }

    public UUID getID(){
        return this.id; 
    }

    @Override
    public String getName(){
        return "medicine prescription";
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
