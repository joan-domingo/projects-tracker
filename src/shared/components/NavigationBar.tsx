import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logoutAction, selectDisplayName } from '../../auth/auth.redux';
import i18n from '../../i18n/i18n';
import { darkGray } from '../styles/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const UserBarContainer = styled.div`
  background-color: ${darkGray};
  margin-bottom: 80px;
  display: flex;
`;

const NavigationBar: FC = () => {
  const dispatch = useDispatch();
  const displayName = useSelector(selectDisplayName);
  const classes = useStyles();
  return (
    <UserBarContainer>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {i18n.t('userBar.welcomeLabel', { displayName })}
          </Typography>
          <Button color="inherit" onClick={handleOnClickLogout}>
            {i18n.t('userBar.logoutButton')}
          </Button>
        </Toolbar>
      </AppBar>
    </UserBarContainer>
  );

  function handleOnClickLogout() {
    dispatch(logoutAction());
  }
};

export default NavigationBar;
