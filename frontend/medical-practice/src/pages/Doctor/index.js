import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

function DoctorPage() {

  const location = useLocation();
  const selectedDoctorId = location?.state?.selectedDoctorId;

  return (
    <div>
      <Header selectedDoctorId={selectedDoctorId} />
    </div>
  );
}

export default DoctorPage;