import { SearchProvider } from '../context/searchContext';
import Page from '../components/Page/page';

function MyApp({ Component, pageProps }) {
  return (
    <SearchProvider>
      <Page>
        <Component {...pageProps} />
      </Page>
    </SearchProvider>
  );
}

export default MyApp;
