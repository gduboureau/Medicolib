package core.application.medicalpractice.domain.entity;

import java.util.UUID;


public class Doctor {

    private final UUID id;
    private String firstName, lastName;
    //private List<Appointment> appointments;
    private String speciality;
    
    public Doctor(String firstName, String lastName, String speciality) {
        this.id = UUID.randomUUID();
        this.firstName = firstName;
        this.lastName = lastName;
        //this.appointments = new ArrayList<>();
        this.speciality = speciality;
    }

    public UUID getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /*public List<Appointment> getAppointments() {
        return appointments;
    }

    public void addAppointment(Appointment appointment){
        appointments.add(appointment);
    }

    public Appointment getAppointment(Appointment appointment){
        for(Appointment app : appointments){
            if (app.equals(appointment)) return app;
        }
        return null;
    }

    public void removeAppointment(Appointment appointment){
        appointments.remove(appointment);
    }*/

    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
        result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
        //result = prime * result + ((appointments == null) ? 0 : appointments.hashCode());
        result = prime * result + ((speciality == null) ? 0 : speciality.hashCode());
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
        Doctor other = (Doctor) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (firstName == null) {
            if (other.firstName != null)
                return false;
        } else if (!firstName.equals(other.firstName))
            return false;
        if (lastName == null) {
            if (other.lastName != null)
                return false;
        } else if (!lastName.equals(other.lastName))
            return false;
        /*if (appointments == null) {
            if (other.appointments != null)
                return false;
        } else if (!appointments.equals(other.appointments))
            return false;*/
        if (speciality == null) {
            if (other.speciality != null)
                return false;
        } else if (!speciality.equals(other.speciality))
            return false;
        return true;
    }

}
