import React from 'react'
import Link from 'next/link'
import { Nav, Navbar, Icon, Dropdown } from 'rsuite';
import './NavBar.less';
import 'rsuite/lib/styles/themes/dark/index.less';
// import 'rsuite/styles/less/index.less';

const NavLink = React.forwardRef((props, ref) => {
  const { as, href, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <a ref={ref} {...rest} />
    </Link>
  );
});

const NavBar = () => (
  <Navbar>
    <Navbar.Header>
      <a href="/home" className="navbar-title logo">
        ZiiMForge
      </a>
    </Navbar.Header>
    <Navbar.Body>
      <Nav>
        <Nav.Item componentClass={NavLink} href="/home" icon={<Icon icon="home" />}>
          Home
        </Nav.Item>
        <Nav.Item componentClass={NavLink} href="/browse">Browse</Nav.Item>
        <Nav.Item >Products</Nav.Item>
        <Dropdown title="About">
          <Dropdown.Item >Company</Dropdown.Item>
          <Dropdown.Item >Team</Dropdown.Item>
          <Dropdown.Item >Contact</Dropdown.Item>
        </Dropdown>
      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
      </Nav>
    </Navbar.Body>
  </Navbar>
)

export default NavBar
