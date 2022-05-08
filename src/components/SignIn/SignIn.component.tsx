import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signInWithPhoneNumber, getAuth } from 'firebase/auth';
import { ROUTES } from '../../util/constants';
import { getUser } from '../../util/helper';
import SignInStyle from './SignIn.module.scss';
import Loader from '../Loader';

const SignIn = () => {
  const [mobileForm, setMobileForm] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const [user, loading] = getUser();

  if (user) {
    navigate(ROUTES.HOME);
  }

  const loginSubmit = (values: any) => {
    setIsDisabled(true);
    let phoneNumber = '+91' + values.phone;
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setMobileForm(false);
        setIsDisabled(false);
      })
      .catch((error) => {
        Swal.fire('Error!', error.message, 'error');
        setIsDisabled(false);
      });
  };

  const otpSubmit = (values: any) => {
    setIsDisabled(true);
    let otp = values.otp;

    window.confirmationResult
      .confirm(otp)
      .then((confirmationResult: any) => {
        setIsDisabled(false);
        navigate(ROUTES.HOME);
        Swal.fire('Welcome!', 'Verification Successful!', 'success');
      })
      .catch((error: any) => {
        setIsDisabled(false);
        Swal.fire('Error!', error.message, 'error');
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
    <>
      <div className={SignInStyle.wrapper}>
        <h1 className={SignInStyle.mainHeading}>Sign in</h1>
        <p className={SignInStyle.subText}>
          {mobileForm ? 'Sign in using your mobile number.' : 'Verify your OTP'}
        </p>

        <div className={SignInStyle.formWrapper}>
          <Form
            onSubmit={mobileForm ? loginSubmit : otpSubmit}
            validate={formValidate}
            render={({ handleSubmit, invalid }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name={mobileForm ? 'phone' : 'otp'}
                  render={({ input, meta }) => (
                    <div className={SignInStyle.inputField}>
                      <label>{mobileForm ? 'Phone Number' : 'Enter OTP'}</label>
                      <input
                        type='text'
                        {...input}
                        placeholder={mobileForm ? 'Phone' : 'One Time Password'}
                        name={mobileForm ? 'phone' : 'otp'}
                        autoComplete='false'
                      />
                      {meta.error && meta.touched && (
                        <span className='errorText'>{meta.error}</span>
                      )}
                    </div>
                  )}
                />

                <button
                  disabled={invalid || isDisabled}
                  type='submit'
                  id='sign-in-button'
                >
                  {mobileForm ? 'Sign in' : 'Verify OTP'}
                </button>
              </form>
            )}
          />
        </div>
      </div>

      {(isDisabled || loading) && <Loader />}
    </>
  );
};

export default SignIn;
