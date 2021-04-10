import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Table } from 'rsuite';
import NavBar from '../components/NavBar/NavBar';

const { Column, HeaderCell, Cell, Pagination } = Table;

function Browse() {
  return (
    <React.Fragment>
      <NavBar />
      <Head>
        <title>Next - Nextron (ipc-communication)</title>
      </Head>
      <div>
      <Table
          height={400}
          data={[]}
          onRowClick={data => {
            console.log(data);
          }}
        >
          <Column flexGrow={1} align="center" sortable fixed>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column flexGrow={1} fixed>
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey="status" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Downloads</HeaderCell>
            <Cell dataKey="downloads" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Authors</HeaderCell>
            <Cell dataKey="authors" />
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>

            <Cell>
              {() => {
                return (
                  <span>
                    <Button>Install</Button>
                  </span>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default Browse;
