package core.application.medicalpractice.domain.entity;

import java.util.Arrays;
import java.util.UUID;


public class MedicinePrescription{
    private final UUID id;
    private String fileName;
    byte[] fileContent;
    

    public MedicinePrescription(String fileName, byte[] fileContent){
        this.fileName = fileName;
        this.fileContent = fileContent;
        id = UUID.randomUUID();
    }

    public UUID getId(){
        return this.id; 
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getFileContent() {
        return fileContent;
    }

    public void setFileContent(byte[] fileContent) {
        this.fileContent = fileContent;
    }

        
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((fileName == null) ? 0 : fileName.hashCode());
        result = prime * result + Arrays.hashCode(fileContent);
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
        MedicinePrescription other = (MedicinePrescription) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (fileName == null) {
            if (other.fileName != null)
                return false;
        } else if (!fileName.equals(other.fileName))
            return false;
        if (!Arrays.equals(fileContent, other.fileContent))
            return false;
        return true;
    }


}
