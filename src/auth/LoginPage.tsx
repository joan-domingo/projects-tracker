import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import i18n from '../i18n/i18n';
import Button from '../shared/components/Button';
import { loginAction } from './auth.redux';

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        onClick={handleOnClickLogin}
        label={i18n.t('loginPage.loginButton')}
        type="primary"
      />
    </div>
  );

  function handleOnClickLogin() {
    dispatch(loginAction());
  }
};

export default LoginPage;
