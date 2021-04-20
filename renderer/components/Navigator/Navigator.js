import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { Nav, Icon, Sidebar, Sidenav } from 'rsuite';
import './Navigator.less';
import 'rsuite/lib/styles/themes/dark/index.less';
import keyContext from '../../context/keyContext';

const headerStyles = {
  background: '#169DE0',
  color: ' #fff',
  fontSize: 16,
  height: 56,
  overflow: 'hidden',
  padding: 18,
  whiteSpace: 'nowrap',
};

const NavLink = React.forwardRef((props, ref) => {
  const { as, href, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <p ref={ref} {...rest} />
    </Link>
  );
});

const Navigator = props => {
  const [expand] = useState(props.expand);
  const [theme, setTheme] = useState(props.theme);
  const [key, setKey] = useContext(keyContext);

  useEffect(() => {
    setTheme(props.theme);
    return () => {};
  }, [props.theme]);

  const handleClick = e => {
    setKey(e);
    console.log(e);
  };

  return (
    <div>
      <Sidebar
        style={{ display: 'flex', flexDirection: 'column' }}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav
          expanded={expand}
          appearance={theme}
          style={{ height: '100vh' }}
        >
          <Sidenav.Header>
            <div style={headerStyles}>
              <Link href="/home">
                <a>
                  <Icon
                    icon="gavel"
                    size="lg"
                    // eslint-disable-next-line sort-keys
                    style={{ verticalAlign: 0, color: 'rgb(255,255,255)' }}
                  />
                </a>
              </Link>
            </div>
          </Sidenav.Header>
          <Sidenav.Body>
            <Nav activeKey={key}>
              <Nav.Item
                componentClass={NavLink}
                eventKey={1}
                icon={<Icon icon="dashboard" />}
                onSelect={value => handleClick(value)}
                href="/home"
              >
                Dashboard
              </Nav.Item>
              <Nav.Item
                // componentClass={NavLink}
                eventKey={4}
                icon={<Icon icon="group" />}
                onSelect={value => handleClick(value)}
              >
                User Group
              </Nav.Item>
              <Nav.Item
                componentClass={NavLink}
                eventKey={3}
                onSelect={value => handleClick(value)}
                icon={<Icon icon="gear-circle" />}
                href="/settings"
              >
                Settings
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>
    </div>
  );
};

export default Navigator;
