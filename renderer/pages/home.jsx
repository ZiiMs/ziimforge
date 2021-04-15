// import electron from 'electron';
import React, { useContext } from 'react';
import Head from 'next/head';
import Page from '../components/Page/page';
import { preference } from '../context/preferenceContext';
// import { Button } from 'rsuite';
// import 'rsuite/lib/styles/themes/dark/index.less';
// import NavBar from '../components/NavBar/NavBar';

function Home() {
  const { theme } = useContext(preference);
  console.log(theme);
  return (
    <>
      <Head>
        <title>ZiiMGavel</title>
      </Head>
      <Page>
        <div>
          <p />
        </div>
        <a>Test?</a>
      </Page>
    </>
  );
}

/* <NavBar />
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
  <img src="/images/logo.png" alt="Alt text" />
  <hr />
</div> */

export default Home;
