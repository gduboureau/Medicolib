import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorLayout from './DoctorLayout';
import DoctorAppointments from './DoctorAppointements'
import Error from '../../utils/Error';

const DoctorRouter = () => {
  return (
    <Routes>
    <Route element={<DoctorLayout />}>
        <Route path="/appointments" element={<DoctorAppointments />} />
        <Route path="*" element={<Error />} />
    </Route>
</Routes>
  )
}

export default DoctorRouter