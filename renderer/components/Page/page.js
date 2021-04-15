import React, { useState, useContext } from 'react';
import { Container, Header, Content } from 'rsuite';
import NavBar from '../NavBar/NavBar';
import Navigator from '../Navigator/Navigator';
import 'rsuite/lib/styles/themes/dark/index.less';
import { preference } from '../../context/preferenceContext';
import { SearchProvider } from '../../context/searchContext';

const Page = props => {
  const [expanded] = useState(false);
  const { theme } = useContext(preference);
  console.log('Theme: ', theme);
  return (
    <SearchProvider>
      <div>
        <Container>
          <Navigator theme={theme} expand={expanded} />
          <Container>
            <Header>
              <NavBar theme={theme} />
            </Header>
            <Content>{props.children}</Content>
          </Container>
        </Container>
      </div>
    </SearchProvider>
  );
};

export default Page;
