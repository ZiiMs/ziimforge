import electron from 'electron';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'rsuite';
import 'rsuite/lib/styles/themes/dark/index.less';
import NavBar from '../components/NavBar/NavBar';

const ipcRenderer = electron.ipcRenderer || false;

function Home() {
  const [message, setMessage] = useState('no ipc message');

  const onClickWithIpc = () => {
    ipcRenderer.send('ping-pong', 'some data from ipcRenderer');
  };

  const onClickWithIpcSync = () => {
    const message = ipcRenderer.sendSync('ping-pong-sync', 'some data from ipcRenderer');
    setMessage(message);
  };

  // If we use ipcRenderer in this scope, we must check the instance exists
  if (ipcRenderer) {
    // In this scope, the webpack process is the client
  }

  useEffect(() => {
    // like componentDidMount()

    // register `ping-pong` event
    ipcRenderer.on('ping-pong', (event, data) => {
      console.log(data);
      // setMessage(data);
    });

    return () => {
      // like componentWillUnmount()

      // unregister it
      ipcRenderer.removeAllListeners('ping-pong');
    };
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <Head>
        <title>Home - Nextron (ipc-communication)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/browse">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
        <hr />
        <Button onClick={onClickWithIpc}>IPC messaging</Button>
        <Button onClick={onClickWithIpcSync}>IPC messaging (sync)</Button>
        <p>{message}</p>
      </div>
    </React.Fragment>
  );
};

export default Home;
