import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { Nav, Navbar, Icon, Dropdown, InputGroup, Input } from 'rsuite';
import './NavBar.less';
import 'rsuite/lib/styles/themes/dark/index.less';
import searchContext from '../../context/searchContext';

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
  const [theme] = useState(props.theme);
  const [search, setSearch] = useContext(searchContext);
  // const searchContext = useContext(settings);

  const handleChange = e => {
    setSearch(e);
    // saveSearch(e);
    // console.log(searchContext);
  };

  return (
    <Navbar appearance={theme}>
      <Navbar.Body>
        <Nav>
          <Nav.Item
            componentClass={NavLink}
            href="/home"
            icon={<Icon icon="home" />}
          >
            Home
          </Nav.Item>
          <Nav.Item componentClass={NavLink} href="/browse">
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
          <InputGroup size="sm" style={styles}>
            <Input
              value={search}
              onChange={data => handleChange(data)}
              size="sm"
            />
            <InputGroup.Button>
              <Icon icon="search" />
            </InputGroup.Button>
          </InputGroup>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

export default NavBar;
