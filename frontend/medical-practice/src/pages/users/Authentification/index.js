import React from 'react';
import '../../../assets/HomePage.css';
import Auth from './Auth';
import AuthApi from './AuthApi';
import AuthRoute from './AuthRoute';
import LocaleStorage from './LocalStorage';


function AuthentificationPage() {
  return (
    <div>
      <LocaleStorage />
    </div>
  );
}

export default AuthentificationPage;