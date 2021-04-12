import React, { useState } from 'react';
import { Container, Header, Content } from 'rsuite';
import NavBar from '../NavBar/NavBar';
import Navigator from '../Navigator/Navigator';
import 'rsuite/lib/styles/themes/dark/index.less';

const Page = props => {
  const [expanded] = useState(false);

  return (
    <div>
      <Container>
        <Navigator expand={expanded} />
        <Container>
          <Header>
            <NavBar />
          </Header>
          <Content>{props.children}</Content>
        </Container>
      </Container>
    </div>
  );
};

export default Page;
