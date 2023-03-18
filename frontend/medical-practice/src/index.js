import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/Home/index';
import DrSpecialityPage from './pages/DoctorsBySpeciality/index';
import DoctorPage from './pages/Doctor';
import { hasAuthenticated } from './pages/users/Authentification/AuthApi';
import Auth from './pages/users/Authentification/Auth';
import RegisterPage from './pages/users/Registers';
import LoginPage from './pages/users/Login';
import Error from './utils/Error';
import Layout from './pages/Layout';



function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
  return (
    <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/doctors/:speciality" element={<DrSpecialityPage />} />
            <Route path="/doctors/:firstName-lastName-speciality" element={<DoctorPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Auth.Provider>
  );
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
