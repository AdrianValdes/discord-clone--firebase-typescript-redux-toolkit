import React, { useEffect } from 'react';
import { Sidebar } from './channels/Sidebar';
import { Chat } from './chat/Chat';

import './App.css';
import { login, logout, selectUser } from './autenthication/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from './autenthication/Login';
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className='app'>
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
