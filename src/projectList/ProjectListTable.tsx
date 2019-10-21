import AddIcon from '@material-ui/icons/AddCircle';
import moment from 'moment';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import i18n from '../i18n/i18n';
import Table from '../shared/components/Table';
import { ProjectUpdate } from '../shared/models/ProjectData';
import { selectIsLoadingProjects } from './projectList.redux';

interface Props {
  data: ProjectUpdate[];
  onAddProject: () => void;
}

const ProjectListTable: FC<Props> = props => {
  const isLoadingProjects = useSelector(selectIsLoadingProjects);
  return (
    <Table
      title={i18n.t('projectList.table.title')}
      columns={columns}
      data={props.data}
      actions={getTableActions(props)}
      // tslint:disable-next-line: no-empty
      onRowClick={() => {}}
      options={{
        pageSize: 15,
        pageSizeOptions: [15, 30, 50],
      }}
      isLoading={isLoadingProjects}
    />
  );
};

const getTableActions = (props: Props) => {
  return [
    {
      icon: () => <AddIcon />,
      tooltip: i18n.t('projectList.addProject'),
      onClick: props.onAddProject,
      isFreeAction: true,
    },
  ];
};

const columns = [
  {
    field: 'timeMillis',
    title: i18n.t('projectList.table.lastUpdate'),
    render: (projectUpdate: ProjectUpdate) =>
      moment(projectUpdate.timeMillis).fromNow(),
  },
  {
    field: 'projectOverview.projectName',
    title: i18n.t('projectList.table.projectName'),
  },
  {
    field: 'projectOverview.projectGoal',
    title: i18n.t('projectList.table.projectGoal'),
  },
];

export default ProjectListTable;
