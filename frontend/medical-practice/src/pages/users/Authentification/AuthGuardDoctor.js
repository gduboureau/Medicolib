import React from "react"
import { Navigate } from "react-router";
import { accountService } from "./Sessionstorage";

const AuthGuardDoctor = ({children}) => {
    if(accountService.isDoctor()){
        return <Navigate to="/doctor/appointments"/>
    }
    return children;
}

export default AuthGuardDoctor; 