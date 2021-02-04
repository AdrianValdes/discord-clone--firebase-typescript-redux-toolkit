import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
/* import { auth, provider } from '../firebase'; */
import './Login.css';
import { signInUser } from './userSlice';
import logo from '../images/1280px-Discord_logo.svg.png';

export const Login = () => {
  const dispatch = useDispatch();
  const handleSignIn = () => {
    /* auth.signInWithPopup(provider).catch((error) => alert(error.message)); */
    dispatch(signInUser());
  };

  return (
    <div className='login'>
      <div className='login__logo'>
        <img src={logo} alt='discord' />
      </div>
      <Button onClick={handleSignIn}>Sign in</Button>
    </div>
  );
};
