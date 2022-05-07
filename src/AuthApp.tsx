import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecaptchaVerifier, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { ROUTES, FIREBASE_CONFIG } from './util/constants';
import { Home, SignIn } from './components';


const AuthApp = () => {
  const firebaseConfig = FIREBASE_CONFIG;
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  const onSignInSubmit = () => {};

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      },
      auth
    );
  }, []);

  return (
    <BrowserRouter>
      <div id='recaptcha-container'>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AuthApp;
