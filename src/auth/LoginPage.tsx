import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from './auth.redux';

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <p>Login Page</p>
      <button onClick={handleOnClickLogin}>Log In</button>
    </div>
  );

  function handleOnClickLogin() {
    dispatch(loginAction());
  }
};

export default LoginPage;
