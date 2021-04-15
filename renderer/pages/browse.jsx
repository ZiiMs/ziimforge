import electron from 'electron';
import React, { useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import { Button, Table, Tag } from 'rsuite';
import 'rsuite/lib/styles/themes/dark/index.less';
import useWindowDimensions from '../hooks/useWindowDimensions';
import searchContext from '../context/searchContext';

const ipcRenderer = electron.ipcRenderer || false;

const { Column, HeaderCell, Cell } = Table;

function Browse() {
  const [mods, setMods] = useState([]);
  const [sortColumn, setsortColumn] = useState('downloadCount');
  const [sort, setSort] = useState(5);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sortType] = useState('desc');
  const [loading, setLoading] = useState(true);
  const [search] = useContext(searchContext);
  const { height } = useWindowDimensions();
  useEffect(() => {
    ipcRenderer.invoke('fetchMods', 5).then(res => {
      console.time('invokeMods');
      console.log('onLoad!📂', res);
      setMods(res);
      setLoading(false);
      console.timeEnd('invokeMods');
    });

    return () => {
      ipcRenderer.removeAllListeners('fetchMods');
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ipcRenderer.invoke('fetchMods', { sort, search }).then(res => {
        console.time('invokeMods');
        console.log('onChange🧀', res);
        setMods(res);
        setLoading(false);
        console.timeEnd('invokeMods');
      });
    }, 500);

    return () => {
      ipcRenderer.removeAllListeners('fetchMods');
      clearTimeout(timeout);
    };
  }, [sort, search]);

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
      setSort(getSortId(Col));
      setTimeout(() => {
        setsortColumn(() => Col);
      }, 500);
    }
  };

  const handleLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const getData = mods.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <>
      <Head>
        <title>Browse Mods</title>
      </Head>
      <div>
        <Table
          wordWrap
          height={height - 120}
          loading={loading}
          data={getData}
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
        <div>
          <Table.Pagination
            activePage={page}
            // layout={['total', '-', 'limit', '', 'pager', 'skip']}
            size="xs"
            // showInfo={false}
            // showLengthMenu={false}
            lengthMenu={[
              {
                value: 10,
                label: 10,
              },
              {
                value: 20,
                label: 20,
              },
              {
                value: 30,
                label: 30,
              },
            ]}
            maxButtons={5}
            displayLength={limit}
            total={mods.length}
            onChangePage={setPage}
            onChangeLength={handleLimit}
          />
        </div>
      </div>
    </>
  );
}

export default Browse;
