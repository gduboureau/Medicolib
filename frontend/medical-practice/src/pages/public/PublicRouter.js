import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import HomePage from '../Home';
import DoctorsPage from '../Doctors';
import DoctorPage from '../Doctor';
import RegisterPage from '../users/Registers';
import LoginPage from '../users/Login';
import Error from '../../utils/Error';
import Booking from '../Doctor/Booking';

const PublicRouter = () => {
    return (
        <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/docteurs/:speciality?" element={<DoctorsPage />} />
          <Route path="/:speciality/:name" element={<DoctorPage />} />
          <Route path="/:name/booking" element={<Booking/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    )
}

export default PublicRouter