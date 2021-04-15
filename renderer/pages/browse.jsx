import electron from 'electron';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, Table, Tag } from 'rsuite';
import Page from '../components/Page/page';
import 'rsuite/lib/styles/themes/dark/index.less';
import useWindowDimensions from '../hooks/useWindowDimensions';

const ipcRenderer = electron.ipcRenderer || false;

const { Column, HeaderCell, Cell } = Table;

function Browse() {
  const [mods, setMods] = useState([]);
  const [sortColumn, setsortColumn] = useState('downloadCount');
  const [sortType] = useState('desc');
  const [loading, setLoading] = useState(true);
  const { height } = useWindowDimensions();
  useEffect(() => {
    ipcRenderer.invoke('fetchMods', 5).then(res => {
      console.time('invokeMods');
      console.log(res);
      setMods(res);
      setLoading(false);
      console.timeEnd('invokeMods');
    });

    return () => {
      ipcRenderer.removeAllListeners('fetchMods');
    };
  }, []);

  const fetchData = sort => {
    ipcRenderer.invoke('fetchMods', sort).then(res => {
      console.time('invokeMods');
      setMods(res);
      setLoading(false);
      console.timeEnd('invokeMods');
    });
  };
  const getSortId = col => {
    switch (col) {
      case 'popularity': {
        return 1;
      }
      case 'dateModified': {
        return 2;
      }
      case 'name': {
        return 3;
      }
      case 'authors': {
        return 4;
      }
      case 'downloadCount': {
        return 5;
      }
      default: {
        return 5;
      }
    }
  };

  const handleSortColumn = Col => {
    if (Col !== sortColumn) {
      setLoading(true);
      fetchData(getSortId(Col));
      setTimeout(() => {
        setsortColumn(() => Col);
      }, 500);
    }
  };

  return (
    <>
      <Head>
        <title>Browse Mods</title>
      </Head>
      <Page>
        <div>
          <Table
            wordWrap
            height={height - 56}
            loading={loading}
            data={mods}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
          >
            <Column flexGrow={1} align="center" sortable fixed="left">
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={60} align="center">
              <HeaderCell>Status</HeaderCell>
              <Cell dataKey="status" />
            </Column>

            <Column width={100} sortable>
              <HeaderCell>Downloads</HeaderCell>
              <Cell dataKey="downloadCount" />
            </Column>

            <Column width={160} sortable>
              <HeaderCell>Last Update</HeaderCell>
              <Cell dataKey="dateModified">
                {data => {
                  const date = new Date(data.dateModified);
                  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
                  return <p>{dateString}</p>;
                }}
              </Cell>
            </Column>

            <Column flexGrow={2}>
              <HeaderCell>Categories</HeaderCell>
              <Cell dataKey="categories">
                {data => {
                  return (
                    <span key={data.id}>
                      {data.categories.map(cat => (
                        <Tag style={{ marginTop: '5px' }}> {cat.name} </Tag>
                      ))}
                    </span>
                  );
                }}
              </Cell>
            </Column>

            <Column flexGrow={2} sortable>
              <HeaderCell>Authors</HeaderCell>
              <Cell dataKey="authors">
                {data => {
                  return (
                    <span key={data.id}>
                      {data.authors.map(author => (
                        <a> {author.name} </a>
                      ))}
                    </span>
                  );
                }}
              </Cell>
            </Column>

            <Column width={140} fixed="right">
              <HeaderCell>Action</HeaderCell>

              <Cell dataKey="id">
                {data => {
                  const handleInstallClick = () => {
                    console.log('🖱️Click: ', data);
                  };
                  return <Button onClick={handleInstallClick}>Install</Button>;
                }}
              </Cell>
            </Column>
          </Table>
        </div>
      </Page>
    </>
  );
}

export default Browse;
