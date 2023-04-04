import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../../components/Layout';
import DoctorAppointments from './DoctorAppointements'
import Error from '../../utils/Error';
import Consultation from './Consultation';
import ShowPatients from './ShowPatients';
import MedicalFile from './MedicalFile';
import { accountService } from '../users/Authentification/Sessionstorage';
import PatientGuard from '../../utils/Patient/PatientGuard';
import { useParams } from 'react-router-dom';

const DoctorRouter = () => {
  return (
    <Routes>
    <Route element={<Layout />}>
        <Route path="/appointments" element={<DoctorAppointments />} />
        <Route path="/:name/consultation" 
          element={
            <PatientGuard name={useParams()["*"].split("/")[0]}
                          patientId={new URLSearchParams(window.location.search).get("id")}
                          doctorMail={accountService.getEmail()}>
              <Consultation />
            </PatientGuard>
            } 
          />
          <Route path="/:name/dossier-medical" 
            element={
              <PatientGuard name={useParams()["*"].split("/")[0]}
                            patientId={new URLSearchParams(window.location.search).get("id")}
                            doctorMail={accountService.getEmail()}>
                <MedicalFile />
              </PatientGuard>
              } 
            />
        <Route path="/patients" element={<ShowPatients/>} />
        <Route path="*" element={<Error />} />
    </Route>
</Routes>
  )
}

export default DoctorRouter