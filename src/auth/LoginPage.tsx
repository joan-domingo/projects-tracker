import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import i18n from '../i18n/i18n';
import Button from '../shared/components/Button';
import { loginAction } from './auth.redux';

const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  return (
    <LoginPageContainer>
      <Button
        onClick={handleOnClickLogin}
        label={i18n.t('loginPage.loginButton')}
        type="primary"
      />
    </LoginPageContainer>
  );

  function handleOnClickLogin() {
    dispatch(loginAction());
  }
};

export default LoginPage;
