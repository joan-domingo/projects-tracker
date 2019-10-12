import Add from '@material-ui/icons/Add';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import Edit from '@material-ui/icons/Edit';
import Filter from '@material-ui/icons/Filter';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import SortArrow from '@material-ui/icons/Sort';
import MaterialTable, { Icons, MaterialTableProps } from 'material-table';
import React, { FC } from 'react';

const tableIcons = {
  Add,
  Clear,
  Edit,
  Filter,
  FirstPage,
  LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search,
  SortArrow,
} as Icons;

const Table: FC<MaterialTableProps<any>> = props => (
  <MaterialTable icons={tableIcons} {...props} />
);

export default Table;
