import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import preference from '../context/preferenceContext';
import searchContext from '../context/searchContext';

function Home() {
  const [preferences] = useContext(preference);
  const [search] = useContext(searchContext);
  const router = useRouter();

  const { filePath } = preferences;

  useEffect(() => {
    if (filePath === '') {
      router.push('/settings');
    }
    return () => {};
  }, [filePath, router]);
  // console.log(search);
  return (
    <>
      <Head>
        <title>ZiiMGavel</title>
      </Head>
      <div>
        <p />
      </div>
      <a>{filePath}A test!??</a>
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
