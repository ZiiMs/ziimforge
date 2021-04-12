import React, { useState } from 'react';
import Link from 'next/link';
import { Nav, Icon, Dropdown, Sidebar, Sidenav } from 'rsuite';
import './Navigator.less';
import 'rsuite/lib/styles/themes/dark/index.less';

const headerStyles = {
  background: '#169DE0',
  color: ' #fff',
  fontSize: 16,
  height: 56,
  overflow: 'hidden',
  padding: 18,
  whiteSpace: 'nowrap',
};

const Navigator = props => {
  const [expand] = useState(props.expand);

  return (
    <div>
      <Sidebar
        style={{ display: 'flex', flexDirection: 'column' }}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav
          expanded={expand}
          appearance="default"
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
            <Nav>
              <Nav.Item eventKey="1" active icon={<Icon icon="dashboard" />}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
                User Group
              </Nav.Item>
              <Dropdown
                eventKey="3"
                trigger="hover"
                title="Advanced"
                icon={<Icon icon="magic" />}
                placement="rightStart"
              >
                <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                <Dropdown.Item eventKey="3-3">Brand</Dropdown.Item>
                <Dropdown.Item eventKey="3-4">Loyalty</Dropdown.Item>
                <Dropdown.Item eventKey="3-5">Visit Depth</Dropdown.Item>
              </Dropdown>
              <Dropdown
                eventKey="4"
                trigger="hover"
                title="Settings"
                icon={<Icon icon="gear-circle" />}
                placement="rightStart"
              >
                <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                <Dropdown.Item eventKey="4-2">Websites</Dropdown.Item>
                <Dropdown.Item eventKey="4-3">Channels</Dropdown.Item>
                <Dropdown.Item eventKey="4-4">Tags</Dropdown.Item>
                <Dropdown.Item eventKey="4-5">Versions</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>
    </div>
  );
};

export default Navigator;
