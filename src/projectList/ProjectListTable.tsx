import AddIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { FC } from 'react';
import Table from '../shared/components/Table';

interface Props {
  onAddProject: () => void;
}

const ProjectListTable: FC<Props> = props => {
  return (
    <Table
      title="Projects"
      columns={columns}
      data={data}
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
  { field: 'name', title: 'Project Name' },
  { field: 'description', title: 'Project Description' },
  { field: 'team', title: 'Names of the team' },
  { field: 'rating', title: 'rating' },
  { field: 'update', title: 'Last update' },
];

const data = [
  createData(
    'XProject',
    4,
    'Hans, Peter',
    'doing good',
    'canvas digitalization'
  ),
  createData('PProject', 3, 'Johannes, Mariia', 'doing meh', 'toilet app'),
];

function createData(
  name: string,
  rating: number,
  team: string,
  update: string,
  description: string
) {
  return { name, rating, team, update, description };
}

export default ProjectListTable;
