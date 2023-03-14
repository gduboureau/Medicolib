import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/Home/index';
import DrSpecialityPage from './pages/DoctorsBySpeciality/index';



function Router(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<HomePage />} />
      <Route path = "/doctors/:speciality" element = {<DrSpecialityPage />} />
    </Routes>
    </BrowserRouter>
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
