// import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider } from "@blueprintjs/core";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: 'auto',
  },
  buttonSpacing: {
    marginLeft: '5px',
    marginRight: '5px',
  },
}));


function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" style={{ borderRight: '0.01em solid rgba(255,255,255,.2)', padding: '0.5em' }} >
          <Button component={ Link } to="/">
            ZiimForge
          </Button>
          </Typography>
          <Button color="inherit" className={classes.buttonSpacing} component={ Link } to="/browse">Browse</Button>
          <Button color="inherit" className={classes.buttonSpacing} component={ Link } to="/profile">Installed</Button>
          <Button color="inherit" className={classes.title} component={ Link } to="/">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
