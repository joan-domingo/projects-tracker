import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logoutAction, selectDisplayName } from '../../auth/auth.redux';
import i18n from '../../i18n/i18n';
import { darkGray } from '../styles/colors';
import { small } from '../styles/dimensions';
import Button from './Button';

const UserBarContainer = styled.div`
  height: 5rem;
  background-color: ${darkGray};
  margin-bottom: ${small};
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

const UserWelcomeLabel = styled.p`
  flex-grow: 1;
  color: white;
`;

const UserBar: FC = () => {
  const dispatch = useDispatch();
  const displayName = useSelector(selectDisplayName);
  return (
    <UserBarContainer>
      <UserWelcomeLabel>
        {i18n.t('userBar.welcomeLabel', { displayName })}
      </UserWelcomeLabel>

      <div>
        <Button
          onClick={handleOnClickLogout}
          label={i18n.t('userBar.logoutButton')}
        />
      </div>
    </UserBarContainer>
  );

  function handleOnClickLogout() {
    dispatch(logoutAction());
  }
};

export default UserBar;
