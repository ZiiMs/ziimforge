import React from "react";
import { Button } from '@material-ui/core';
// import { Link } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'author',
    headerName: 'Author',
  },
  {
    field: 'downloads',
    headerName: 'Downloads',
    type: 'number',
    width: 'auto',
  },
  {
    field: 'install',
    headerName: 'Install',
    // eslint-disable-next-line react/display-name
    renderCell: () => (
        <Button variant="contained" size="small" > 
          Install
        </Button>
    ),
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'dateTime',
    width: 'auto',
  },
  {
    field: 'category',
    headerName: 'Categories',
    width: 'auto'
  },
];

const rows = [
  {
    id: 1,
    name: 'Test1',
    author: 'ZiiM',
    date: new Date(2021, 0, 1).toLocaleDateString("en-US"),
    category: 'PVP',
  },
  {
    id: 2,
    name: 'Test2',
    author: 'ZiiM',
    date: new Date(2021, 0, 2).toLocaleDateString("en-US"),
    category: 'PVP',
  },
  {
    id: 3,
    name: 'Test3',
    author: 'ZiiM',
    date: new Date(2021, 0, 3).toLocaleDateString("en-US"),
    category: 'PVP',
  },
  {
    id: 4,
    name: 'Test4',
    author: 'ZiiM',
    date: new Date(2021, 0, 4).toLocaleDateString("en-US"),
    category: 'PVP',
  },
  {
    id: 5,
    name: 'Test5',
    author: 'ZiiM',
    date: new Date(2021, 0, 5).toLocaleDateString("en-US"),
    category: 'PVP',
  },
]

function Browse() {
  return (
    <div style={{ marginTop: '5%'}} >
    <DataGrid autoHeight pageSize={10} rows={rows} columns={columns} />
    </div>
  );
}

export default Browse;
