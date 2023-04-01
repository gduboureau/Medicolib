import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../../components/Layout';
import DoctorAppointments from './DoctorAppointements'
import Error from '../../utils/Error';
import Consultation from './Consultation';
import ShowPatients from './ShowPatients';
import MedicalFile from './MedicalFile';

const DoctorRouter = () => {
  return (
    <Routes>
    <Route element={<Layout />}>
        <Route path="/appointments" element={<DoctorAppointments />} />
        <Route path="/:name/consultation" element={<Consultation />} />
        <Route path="/:name/dossier-medical" element={<MedicalFile />} />
        <Route path="/patients" element={<ShowPatients/>} />
        <Route path="*" element={<Error />} />
    </Route>
</Routes>
  )
}

export default DoctorRouter