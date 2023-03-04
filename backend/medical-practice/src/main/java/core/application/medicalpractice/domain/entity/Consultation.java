package core.application.medicalpractice.domain.entity;

import java.util.List;
import java.util.UUID;

import core.application.medicalpractice.domain.valueObjects.*;

public class Consultation {

    private final UUID id;
    private Appointment appointment;
    private Patient patient;
    private Doctor doctor;
    private List<Prescription> prescriptions;
    
    public Consultation(Appointment appointment, Patient patient, Doctor doctor, List<Prescription> prescriptions) {
        this.id = UUID.randomUUID();
        this.appointment = appointment;
        this.patient = patient;
        this.doctor = doctor;
        this.prescriptions = prescriptions;
    }

    public UUID getId() {
        return id;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public List<Prescription> getPrescriptions() {
        return prescriptions;
    }

    public void addPrescriptions(Prescription prescription) {
        prescriptions.add(prescription);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((appointment == null) ? 0 : appointment.hashCode());
        result = prime * result + ((patient == null) ? 0 : patient.hashCode());
        result = prime * result + ((doctor == null) ? 0 : doctor.hashCode());
        result = prime * result + ((prescriptions == null) ? 0 : prescriptions.hashCode());
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
        Consultation other = (Consultation) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (appointment == null) {
            if (other.appointment != null)
                return false;
        } else if (!appointment.equals(other.appointment))
            return false;
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
        if (prescriptions == null) {
            if (other.prescriptions != null)
                return false;
        } else if (!prescriptions.equals(other.prescriptions))
            return false;
        return true;
    }
    
}
