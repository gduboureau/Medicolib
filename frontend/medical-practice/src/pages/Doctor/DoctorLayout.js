import React from "react";
import { Outlet } from "react-router";
import DoctorHeader from "./DoctorHeader";

const DoctorLayout = () => {
    return(
        <div>
            <DoctorHeader />
            <Outlet />
        </div>
    );
}

export default DoctorLayout;