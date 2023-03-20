import React from "react"
import { Navigate } from "react-router";
import { accountService } from "./LocalStorage";

const AuthGuard = ({children}) => {
    if(!accountService.isLogged()){
        console.log(accountService.isLogged());
        return <Navigate to="/login" />
    }
    return children;
}

export default AuthGuard; 