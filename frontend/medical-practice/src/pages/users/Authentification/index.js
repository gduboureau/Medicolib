import React from 'react';
import '../../../assets/HomePage.css';
import Auth from './Auth';
import AuthApi from './AuthApi';
import AuthRoute from './AuthRoute';
import LocaleStorage from './LocaleStorage';


function AuthentificationPage() {
  return (
    <div>
      <Auth />
      <AuthApi />
      <AuthRoute />
      <LocaleStorage />
    </div>
  );
}

export default AuthentificationPage;