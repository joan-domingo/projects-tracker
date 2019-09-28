import {
  Add,
  ChevronLeft,
  ChevronRight,
  Clear,
  FirstPage,
  LastPage,
  Search,
} from '@material-ui/icons';
import MaterialTable, { Icons, MaterialTableProps } from 'material-table';
import React, { FC } from 'react';

const tableIcons = {
  Add,
  Clear,
  FirstPage,
  LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search,
} as Icons;

const Table: FC<MaterialTableProps<any>> = props => (
  <MaterialTable icons={tableIcons} {...props} />
);

export default Table;
