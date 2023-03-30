import React from "react"
import { Navigate } from "react-router";
import { accountService } from "./Sessionstorage";

const AuthGuardPatient = ({children}) => {
    if(!accountService.isDoctor()){
        return <Navigate to="/patient/appointments"/>
    }
    return children;
}

export default AuthGuardPatient; 