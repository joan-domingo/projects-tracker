import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../shared/components/Button';
import { loginAction } from './auth.redux';

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <p>Login Page</p>
      <Button onClick={handleOnClickLogin} label={'Log In'} type="primary" />
    </div>
  );

  function handleOnClickLogin() {
    dispatch(loginAction());
  }
};

export default LoginPage;
