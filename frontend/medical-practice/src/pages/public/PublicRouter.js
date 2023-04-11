import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../../components/Layout';
import HomePage from '../Home';
import DoctorsPage from '../Doctors';
import BookingPage from '../Booking';
import RegisterPage from '../users/Registers';
import LoginPage from '../users/Login';
import Error from '../../utils/Error';
import { useParams } from 'react-router-dom';
import SpecialityGuard from '../../utils/Speciality/SpecialityGuard';
import DoctorGuard from '../../utils/Doctor/DoctorGuard';
import AuthGuardLogin from './AuthGuardLogin';

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
              <BookingPage />
            </DoctorGuard>
          }
        />
        <Route path="/register" element={<AuthGuardLogin><RegisterPage /></AuthGuardLogin>} />
        <Route path="/login" element={<AuthGuardLogin><LoginPage /></AuthGuardLogin>} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  )
}

export default PublicRouter