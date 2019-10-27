import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import i18n from '../../i18n/i18n';
import { dashboardPath } from '../../routing/routes';

const NewProjectBreadcrumbs: FC = () => {
  const history = useHistory();
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link
        color="inherit"
        onClick={() => history.replace(dashboardPath)}
        href="#"
      >
        {i18n.t('dashboard.title')}
      </Link>
      <Typography color="textPrimary">
        {i18n.t('dashboard.newProject')}
      </Typography>
    </Breadcrumbs>
  );
};

export default NewProjectBreadcrumbs;
