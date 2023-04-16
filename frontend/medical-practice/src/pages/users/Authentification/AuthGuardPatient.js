import React,{useState,useEffect} from "react"
import { Navigate } from "react-router";
import { accountService } from "./Sessionstorage";
import axios from "axios";

const AuthGuardPatient = ({children}) => {
    const [patientExist, setPatientExist] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .post("/checkPatientExist", { mail: accountService.getEmail() })
            .then((res) => {
                setPatientExist(res.data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return null; 
    } else if (patientExist) {
        return <Navigate to="/patient/appointments" />;
    } else {
        return children;
    }
}

export default AuthGuardPatient; 