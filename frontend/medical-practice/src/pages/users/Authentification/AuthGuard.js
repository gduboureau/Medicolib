import React from "react"
import { Navigate } from "react-router";
import { accountService } from "./Sessionstorage";
import { useLocation } from "react-router-dom";

const AuthGuard = ({children}) => {
    const location = useLocation();
    if(!accountService.isLogged()){
        return <Navigate to="/login" state={{ prev: location.pathname }}/>
    }
    return children;
}

export default AuthGuard; 