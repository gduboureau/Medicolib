import React from 'react';
import InfoDoctor from './InfoDoctor';
import { useLocation } from 'react-router-dom';

function DoctorPage() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedDoctorId = params.get("id");

  return (
    <div>
      <InfoDoctor selectedDoctorId={selectedDoctorId}/>
    </div>
  );
}

export default DoctorPage;