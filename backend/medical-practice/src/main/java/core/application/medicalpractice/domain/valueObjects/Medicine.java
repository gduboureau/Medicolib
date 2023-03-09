package core.application.medicalpractice.domain.valueObjects;

public class Medicine {
    private final String name;
    private final double price;
    private final String dosage;

    public Medicine(String name, double price, String dosage){
        this.name = name; 
        this.price = price;
        this.dosage = dosage;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getDosage() {
        return dosage;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        long temp;
        temp = Double.doubleToLongBits(price);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + ((dosage == null) ? 0 : dosage.hashCode());
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
        Medicine other = (Medicine) obj;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (Double.doubleToLongBits(price) != Double.doubleToLongBits(other.price))
            return false;
        if (dosage == null) {
            if (other.dosage != null)
                return false;
        } else if (!dosage.equals(other.dosage))
            return false;
        return true;
    }

    
}
