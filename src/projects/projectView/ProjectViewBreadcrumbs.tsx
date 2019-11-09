import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import i18n from '../../i18n/i18n';
import { dashboardPath } from '../../routing/routes';

interface Props {
  projectName: string;
}

const ProjectViewBreadcrumbs: FC<Props> = ({ projectName }) => {
  const history = useHistory();
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link
        color="inherit"
        onClick={() => history.replace(dashboardPath)}
        style={{ cursor: 'pointer' }}
      >
        {i18n.t('dashboard.title')}
      </Link>
      <Typography color="textPrimary">{projectName}</Typography>
    </Breadcrumbs>
  );
};

export default ProjectViewBreadcrumbs;
