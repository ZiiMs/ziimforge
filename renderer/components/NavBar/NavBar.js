import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Nav, Navbar, Icon, Dropdown, InputGroup, Input } from 'rsuite';
import './NavBar.less';
import 'rsuite/lib/styles/themes/dark/index.less';
import searchContext from '../../context/searchContext';
import keyContext from '../../context/keyContext';

// const { settings, saveSearch } = useSearch();

// import 'rsuite/styles/less/index.less';

const NavLink = React.forwardRef((props, ref) => {
  const { as, href, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <p ref={ref} {...rest} />
    </Link>
  );
});

const styles = {
  width: 300,
  marginTop: 10,
  marginRight: 15,
};

const NavBar = props => {
  const [theme, setTheme] = useState(props.theme);
  const [search, setSearch] = useContext(searchContext);
  const [key, setKey] = useContext(keyContext);
  // const searchContext = useContext(settings);

  useEffect(() => {
    setTheme(props.theme);
    return () => {};
  }, [props.theme]);

  const handleChange = e => {
    setSearch(e);
    // saveSearch(e);
    // console.log(searchContext);
  };

  return (
    <Navbar appearance={theme}>
      <Navbar.Body>
        <Nav activeKey={key}>
          <Nav.Item
            eventKey={1}
            onSelect={value => setKey(value)}
            componentClass={NavLink}
            href="/home"
            icon={<Icon icon="home" />}
          >
            Home
          </Nav.Item>
          <Nav.Item
            componentClass={NavLink}
            eventKey={2}
            onSelect={value => setKey(value)}
            href="/browse"
          >
            Browse
          </Nav.Item>
          <Nav.Item>Products</Nav.Item>
          <Dropdown title="About">
            <Dropdown.Item>Company</Dropdown.Item>
            <Dropdown.Item>Team</Dropdown.Item>
            <Dropdown.Item>Contact</Dropdown.Item>
          </Dropdown>
        </Nav>
        <Nav pullRight>
          <InputGroup inside size="sm" style={styles}>
            <Input
              value={search}
              onChange={data => handleChange(data)}
              size="sm"
            />
            <InputGroup.Button onClick={() => handleChange('')}>
              <Icon icon="close" />
            </InputGroup.Button>
          </InputGroup>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

export default NavBar;
