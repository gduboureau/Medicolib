package core.application.medicalpractice.domain.entity;

public class PrescriptionDecorator implements Prescription{

    protected Prescription prescription;

    public PrescriptionDecorator(Prescription prescription){
        this.prescription = prescription;
    }

    @Override
    public String getName() {
        return prescription.getName();
    }

    
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((prescription == null) ? 0 : prescription.hashCode());
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
        PrescriptionDecorator other = (PrescriptionDecorator) obj;
        if (prescription == null) {
            if (other.prescription != null)
                return false;
        } else if (!prescription.equals(other.prescription))
            return false;
        return true;
    }
}
