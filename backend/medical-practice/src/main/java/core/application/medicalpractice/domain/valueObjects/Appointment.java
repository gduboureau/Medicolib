package core.application.medicalpractice.domain.valueObjects;

import java.util.UUID;

public class Appointment {
    
    private final UUID id;
    private final TimeSlot timeSlot;

    public Appointment(TimeSlot timeSlot){
        this.id = UUID.randomUUID();
        this.timeSlot = timeSlot;
    }

    public UUID getId(){
        return id;
    }

    public TimeSlot getDate(){
        return timeSlot;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((timeSlot == null) ? 0 : timeSlot.hashCode());
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
        Appointment other = (Appointment) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (timeSlot == null) {
            if (other.timeSlot != null)
                return false;
        } else if (!timeSlot.equals(other.timeSlot))
            return false;
        return true;
    }

}
