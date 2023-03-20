import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Appointments from './Appointments';
import Edit from './EditAccount';
import Error from '../../utils/Error';
import ALayout from './AdminLayout';

const AdminRouter = () => {
    return (
        <Routes>
            <Route element={<ALayout />}>
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    )
}

export default AdminRouter;