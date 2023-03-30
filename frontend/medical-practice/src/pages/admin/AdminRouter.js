import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Appointments from './Appointments';
import Edit from './EditAccount';
import Error from '../../utils/Error';
import Layout from '../../components/Layout';

const AdminRouter = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    )
}

export default AdminRouter;