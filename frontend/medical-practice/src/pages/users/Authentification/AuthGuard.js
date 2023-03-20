import React from "react"
import { Navigate } from "react-router";
import { accountService } from "./LocalStorage";

const AuthGuard = ({children}) => {
    if(!accountService.isLogged()){
        <Navigate to="/login" />
    }
    return children;
}

export default AuthGuard; 