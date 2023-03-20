import React from "react";
import { Outlet } from "react-router";
import AHeader from "./AdminHeader";

const ALayout = () => {
    return(
        <div>
            <AHeader />
            <Outlet />
        </div>
    );
}

export default ALayout;