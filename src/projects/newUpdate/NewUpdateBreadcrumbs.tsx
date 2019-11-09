import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import i18n from '../../i18n/i18n';
import { dashboardPath, generateProjectViewPath } from '../../routing/routes';

interface Props {
  projectName: string;
  projectId: string;
}

const NewUpdateBreadcrumbs: FC<Props> = ({ projectName, projectId }) => {
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
      <Link
        color="inherit"
        onClick={() => history.replace(generateProjectViewPath(projectId))}
        style={{ cursor: 'pointer' }}
      >
        {projectName}
      </Link>
      <Typography color="textPrimary">
        {i18n.t('projectView.newUpdate')}
      </Typography>
    </Breadcrumbs>
  );
};

export default NewUpdateBreadcrumbs;
