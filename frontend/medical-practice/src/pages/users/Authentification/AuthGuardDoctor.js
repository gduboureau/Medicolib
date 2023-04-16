import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { accountService } from "./Sessionstorage";
import axios from "axios";

const AuthGuardDoctor = ({ children }) => {
    const [doctorExists, setDoctorExists] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .post("/checkDoctorExist", { mail: accountService.getEmail() })
            .then((res) => {
                setDoctorExists(res.data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return null; 
    } else if (doctorExists) {
        return <Navigate to="/doctor/appointments" />;
    } else {
        return children;
    }
};

export default AuthGuardDoctor;