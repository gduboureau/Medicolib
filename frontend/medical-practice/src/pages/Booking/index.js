import React from 'react';
import InfoDoctor from './InfoDoctor';
import { useLocation } from 'react-router-dom';


function BookingPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedDoctorId = params.get("id");
  return (
    <div>
      <InfoDoctor selectedDoctorId={selectedDoctorId}/>
    </div>
  );
}

export default BookingPage;