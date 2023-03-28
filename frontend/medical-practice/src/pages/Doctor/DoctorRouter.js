import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorLayout from './DoctorLayout';
import DoctorAppointments from './DoctorAppointements'
import Error from '../../utils/Error';
import Consultation from './Prescription';
import ShowPatients from './ShowPatients';

const DoctorRouter = () => {
  return (
    <Routes>
    <Route element={<DoctorLayout />}>
        <Route path="/appointments" element={<DoctorAppointments />} />
        <Route path="/consultations" element={<Consultation />} />
        <Route path="/patients" element={<ShowPatients/>} />
        <Route path="*" element={<Error />} />
    </Route>
</Routes>
  )
}

export default DoctorRouter