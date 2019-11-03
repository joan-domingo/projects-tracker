import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import moment from 'moment';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import i18n from '../../i18n/i18n';
import { generateProjectViewPath } from '../../routing/routes';
import SectionTitle from '../../shared/components/SectionTitle';
import Table from '../../shared/components/Table';
import { ProjectUpdate } from '../../shared/models/ProjectData';
import { selectIsLoadingProjects } from '../projectData.redux';

interface Props {
  data: ProjectUpdate[];
}

const ProjectListTable: FC<Props> = props => {
  const history = useHistory();
  const isLoadingProjects = useSelector(selectIsLoadingProjects);
  return (
    <Table
      title={<SectionTitle>{i18n.t('dashboard.title')}</SectionTitle>}
      columns={columns}
      data={props.data}
      onRowClick={(e, rowData) =>
        history.push(generateProjectViewPath(rowData.projectId))
      }
      options={{
        pageSize: 10,
        pageSizeOptions: [10, 25, 50],
        sorting: true,
      }}
      isLoading={isLoadingProjects}
    />
  );
};

const columns = [
  {
    field: 'timeMillis',
    title: i18n.t('dashboard.table.lastUpdate'),
    render: (projectUpdate: ProjectUpdate) =>
      moment(projectUpdate.timeMillis).fromNow(),
    defaultSort: 'desc' as ('asc' | 'desc'),
  },
  {
    field: 'projectOverview.projectName',
    title: i18n.t('dashboard.table.projectName'),
  },
  {
    title: i18n.t('dashboard.table.teamSize'),
    render: (projectUpdate: ProjectUpdate) => {
      const { projectTeam } = projectUpdate;
      if (projectTeam && projectTeam.projectMembers) {
        return projectUpdate.projectTeam.projectMembers.length;
      }
      return 0;
    },
  },
  {
    title: i18n.t('dashboard.table.actionNeeded'),
    render: (projectUpdate: ProjectUpdate) => {
      const { projectRisksOpportunities } = projectUpdate;
      return (
        <FormControlLabel
          control={
            <Radio
              color="primary"
              style={{ paddingTop: 0, paddingBottom: 0 }}
              disableRipple
            />
          }
          label={undefined}
          checked={
            projectRisksOpportunities &&
            projectRisksOpportunities.isActionNeeded
          }
          disabled={
            !projectRisksOpportunities ||
            !projectRisksOpportunities.isActionNeeded
          }
        />
      );
    },
  },
  {
    title: i18n.t('dashboard.table.helpNeeded'),
    render: (projectUpdate: ProjectUpdate) => {
      const { projectRisksOpportunities } = projectUpdate;
      return (
        <FormControlLabel
          control={
            <Radio style={{ paddingTop: 0, paddingBottom: 0 }} disableRipple />
          }
          label={undefined}
          checked={
            projectRisksOpportunities && projectRisksOpportunities.isHelpNeeded
          }
          disabled={
            !projectRisksOpportunities ||
            !projectRisksOpportunities.isHelpNeeded
          }
        />
      );
    },
  },
];

export default ProjectListTable;
