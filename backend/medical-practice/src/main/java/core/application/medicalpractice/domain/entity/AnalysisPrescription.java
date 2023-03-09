package core.application.medicalpractice.domain.entity;

import java.util.ArrayList;
import java.util.List;

public class AnalysisPrescription extends PrescriptionDecorator{
    List<String> analysis; 
    
    public AnalysisPrescription(Prescription prescription) {
        super(prescription);
        analysis = new ArrayList<String>();

    }

    public void addAnalysis(String analysis){
        this.analysis.add(analysis);
    }

    @Override
    public String getName(){
        return "analysis prescription";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((analysis == null) ? 0 : analysis.hashCode());
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
        AnalysisPrescription other = (AnalysisPrescription) obj;
        if (analysis == null) {
            if (other.analysis != null)
                return false;
        } else if (!analysis.equals(other.analysis))
            return false;
        return true;
    }
    
}
