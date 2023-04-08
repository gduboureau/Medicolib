import React from 'react';
import PublicHeader from './PublicHeader';
import PatientHeader from './PatientHeader';
import DoctorHeader from './DoctorHeader';
import { accountService } from "../../pages/users/Authentification/Sessionstorage";


const Header = () => {
        
    if (!accountService.isLogged()){
        return(
            <PublicHeader />
        );
        
    }else{
        if(!accountService.isDoctor()){
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