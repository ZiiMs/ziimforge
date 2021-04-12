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
  const [sortType, setsortType] = useState('desc');
  const [loading, setLoading] = useState(true);
  const { height } = useWindowDimensions();
  // const mods = [];
  useEffect(() => {
    // like componentDidMount(
    ipcRenderer.on('fetchMods', async (event, data) => {
      setMods(data);
      // await setupMods(data);
      setLoading(false);
    });

    ipcRenderer.send('fetchMods');

    return () => {
      // like componentWillUnmount()

      // unregister it
      ipcRenderer.removeAllListeners('fetchMods');
    };
  }, []);

  const getData = () => {
    const data = mods;

    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        }
        return y - x;
      });
    }
    return data;
  };

  const handleSortColumn = (Col, Type) => {
    setTimeout(() => {
      setsortColumn(() => Col);
      setsortType(() => Type);
    }, 0);
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
            data={getData()}
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

            <Column flexGrow={2}>
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

            <Column width={120} fixed="right">
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
