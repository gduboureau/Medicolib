package core.application.medicalpractice.domain.entity;

import java.util.UUID;

public class Address {

    private int number;
    private String street;
    private String city;
    private int postalCode;
    private final UUID id;

    public Address(int number, String street, String city, int postalCode) {
        this.number = number;
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
        this.id = UUID.randomUUID();
    }

    public UUID getId() {
        return id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }

    @Override
    public String toString() {
        return this.number + " " + this.street + " " + this.postalCode + " " + this.city;

    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + number;
        result = prime * result + ((street == null) ? 0 : street.hashCode());
        result = prime * result + ((city == null) ? 0 : city.hashCode());
        result = prime * result + postalCode;
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
        Address other = (Address) obj;
        if (number != other.number)
            return false;
        if (street == null) {
            if (other.street != null)
                return false;
        } else if (!street.equals(other.street))
            return false;
        if (city == null) {
            if (other.city != null)
                return false;
        } else if (!city.equals(other.city))
            return false;
        if (postalCode != other.postalCode)
            return false;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

}