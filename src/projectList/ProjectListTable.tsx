import AddIcon from '@material-ui/icons/AddCircle';
import moment from 'moment';
import React, { FC } from 'react';
import i18n from '../i18n/i18n';
import Table from '../shared/components/Table';
import { ProjectUpdate } from '../shared/models/ProjectData';

interface Props {
  data: ProjectUpdate[];
  onAddProject: () => void;
}

const ProjectListTable: FC<Props> = props => {
  return (
    <Table
      title={i18n.t('projectList.table.title')}
      columns={columns}
      data={props.data}
      actions={getTableActions(props)}
      // tslint:disable-next-line: no-empty
      onRowClick={() => {}}
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
    render: (timeMillis: number) => moment(timeMillis).fromNow(),
  },
  { field: 'projectName', title: i18n.t('projectList.table.projectName') },
];

export default ProjectListTable;
