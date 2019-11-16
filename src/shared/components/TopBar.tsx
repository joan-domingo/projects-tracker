import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import i18n from '../../i18n/i18n';
import { dashboardPath } from '../../routing/routes';
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
      cursor: 'pointer',
    },
  })
);

const UserBarContainer = styled.div`
  background-color: ${darkGray};
  margin-bottom: 80px;
  display: flex;
`;

const TopBar: FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleOnClickTitle = useCallback(() => {
    history.replace(dashboardPath);
  }, [history]);

  return (
    <UserBarContainer>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={handleOnClickTitle}
          >
            {i18n.t('userBar.title')}
          </Typography>
        </Toolbar>
      </AppBar>
    </UserBarContainer>
  );
};

export default TopBar;
