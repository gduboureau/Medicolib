import React from 'react';
import InfoDoctor from './InfoDoctor';
import Booking from './Booking';
import BookingSmall from './BookingSmall';
import { useLocation } from 'react-router-dom';
import './assets/index.css'


function BookingPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedDoctorId = params.get("id");
  return (
    <div className='BookingPage'>
      <div className="infodoctor-container">
        <InfoDoctor selectedDoctorId={selectedDoctorId}/>
      </div>
      <div className="booking-container">
        <Booking selectedDoctorId={selectedDoctorId}/>
      </div>
      <div className="bookingsmall-container">
        <BookingSmall selectedDoctorId={selectedDoctorId}/>
      </div>
    </div>
  );
}

export default BookingPage;