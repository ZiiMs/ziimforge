import React, { useContext } from 'react';
import Head from 'next/head';
// import { preference } from '../context/preferenceContext';
import searchContext from '../context/searchContext';

function Home() {
  // const { theme } = useContext(preference);
  const [search] = useContext(searchContext);
  // console.log(search);
  return (
    <>
      <Head>
        <title>ZiiMGavel</title>
      </Head>
      <div>
        <p />
      </div>
      <a>{search}A test!??</a>
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
