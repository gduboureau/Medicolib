import React from "react"
import { Navigate } from "react-router";
import { accountService } from "../users/Authentification/Sessionstorage";

const AuthGuardLogin = ({children}) => {
    if(accountService.isLogged() && accountService.isDoctor()){
        return <Navigate to="/doctor/appointments"/>
    }
    if (accountService.isLogged() && !accountService.isDoctor()){
        return <Navigate to="/patient/appointments"/>
    }
    return children;
}

export default AuthGuardLogin; 