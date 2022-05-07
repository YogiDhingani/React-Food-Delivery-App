import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { signInWithPhoneNumber, getAuth } from 'firebase/auth';
import { ROUTES } from '../../util/constants';
import '../SignIn/SignIn.scss';

const SignIn = () => {
  const [mobileForm, setMobileForm] = useState(true);
  const navigate = useNavigate();

  const loginSubmit = (values: any) => {
    let phoneNumber = '+91' + values.phone;
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setMobileForm(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const otpSubmit = (values: any) => {
    let otp = values.otp;

    window.confirmationResult
      .confirm(otp)
      .then((confirmationResult: any) => {
        navigate(ROUTES.HOME);
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };

  const formValidate = (values: any) => {
    const form = mobileForm
      ? {
          phone: values.phone && values.phone.length === 10,
        }
      : {
          otp: values.otp && values.otp.length === 6,
        };

    const errors: any = {};
    Object.keys(form).forEach((item: any) => {
      if (!form[item]) {
        errors[item] = mobileForm
          ? 'Please Enter Valid Phone Number'
          : 'Please Enter Valid OTP';
      }
    });
    return errors;
  };

  return (
    <div className='wrapper'>
      <h1 className='main-heading'>Sign in</h1>
      <p className='sub-text'>
        {mobileForm ? 'Sign in using your mobile number.' : 'Verify your OTP'}
      </p>

      <div className='form-wrapper'>
        <Form
          onSubmit={mobileForm ? loginSubmit : otpSubmit}
          validate={formValidate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name={mobileForm ? 'phone' : 'otp'}
                render={({ input, meta }) => (
                  <div className='input-field'>
                    <label>{mobileForm ? 'Phone Number' : 'Enter OTP'}</label>
                    <input
                      type='text'
                      {...input}
                      placeholder={mobileForm ? 'Phone' : 'One Time Password'}
                      name={mobileForm ? 'phone' : 'otp'}
                      autoComplete='false'
                    />
                    {meta.error && meta.touched && (
                      <span className='errorRedText'>{meta.error}</span>
                    )}
                  </div>
                )}
              />

              <button className='main-button' type='submit' id='sign-in-button'>
                {mobileForm ? 'Sign in' : 'Verify OTP'}
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default SignIn;
