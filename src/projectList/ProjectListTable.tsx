import AddIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import React, { FC } from 'react';
import Table from '../shared/components/Table';
import { ProjectUpdate } from '../shared/models/ProjectData';

interface Props {
  data: ProjectUpdate[];
  onAddProject: () => void;
}

const ProjectListTable: FC<Props> = props => {
  return (
    <Table
      title="Projects"
      columns={columns}
      data={props.data}
      actions={getTableActions(props)}
    />
  );
};

const getTableActions = (props: Props) => {
  return [
    {
      icon: () => <AddIcon />,
      tooltip: 'Add Project',
      onClick: props.onAddProject,
      isFreeAction: true,
    },
    {
      icon: () => <EditIcon />,
      tooltip: 'Edit Project',
      onClick: () => {
        alert('Edit Project');
      },
    },
    {
      icon: () => <DeleteIcon />,
      tooltip: 'Delete Project',
      onClick: () => {
        alert('Delete Project');
      },
    },
  ];
};

const columns = [
  {
    field: 'timeMillis',
    title: 'Last Update',
    render: (timeMillis: number) => <p>{moment(timeMillis).fromNow()}</p>,
  },
  { field: 'projectName', title: 'Project Name' },
];

export default ProjectListTable;
