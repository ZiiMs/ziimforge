import { SearchProvider } from '../context/searchContext';
import Page from '../components/Page/page';
import { KeyProvider } from '../context/keyContext';
import { PreferenceProvider } from '../context/preferenceContext';

function MyApp({ Component, pageProps }) {
  return (
    <KeyProvider>
      <PreferenceProvider>
        <SearchProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </SearchProvider>
      </PreferenceProvider>
    </KeyProvider>
  );
}

export default MyApp;
