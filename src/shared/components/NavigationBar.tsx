import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';
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
  const classes = useStyles();
  return (
    <UserBarContainer>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {i18n.t('userBar.welcomeLabel', { displayName: '' })}
          </Typography>
        </Toolbar>
      </AppBar>
    </UserBarContainer>
  );
};

export default NavigationBar;
