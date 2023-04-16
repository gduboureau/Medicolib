import React,{useEffect,useState} from 'react';
import PublicHeader from './PublicHeader';
import PatientHeader from './PatientHeader';
import DoctorHeader from './DoctorHeader';
import { accountService } from "../../pages/users/Authentification/Sessionstorage";
import axios from 'axios';

const Header = () => {
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
        
    if (!accountService.isLogged()){
        return(
            <PublicHeader />
        );
        
    }else{
        if (loading) {
            return null; 
        } else if (patientExist) {
            return(
                <PatientHeader />
            );
        }else{
            return(
                <DoctorHeader />
            );
        }
    }
};

export default Header;