import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../../components/Layout';
import HomePage from '../Home';
import DoctorsPage from '../Doctors';
import DoctorPage from '../Doctor';
import RegisterPage from '../users/Registers';
import LoginPage from '../users/Login';
import Error from '../../utils/Error';
import Booking from '../Doctor/Booking';
import AuthGuard from '../users/Authentification/AuthGuard';
import { useParams } from 'react-router-dom';
import SpecialityGuard from '../../utils/Speciality/SpecialityGuard';
import DoctorGuard from '../../utils/Doctor/DoctorGuard';


const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/docteurs/:speciality?"
          element={
            <SpecialityGuard speciality={useParams()["*"].split("/")[1]}>
              <DoctorsPage />
            </SpecialityGuard>
          } 
        />
        <Route path="/:speciality/:name" 
        element={ 
            <DoctorGuard speciality={useParams()["*"].split("/")[0]}
                         name={useParams()["*"].split("/")[1]}
                         id={new URLSearchParams(window.location.search).get("id")}>
              <DoctorPage />
            </DoctorGuard>
          } 
        />
        <Route path="/:speciality/:name/booking"
         element={
            <DoctorGuard speciality={useParams()["*"].split("/")[0]}
                        name={useParams()["*"].split("/")[1]}
                        id={new URLSearchParams(window.location.search).get("id")}>
              <AuthGuard>
                <Booking />
              </AuthGuard>
            </DoctorGuard>
            } 
          />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  )
}

export default PublicRouter