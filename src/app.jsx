import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom";
// import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider } from "@blueprintjs/core";
import Navbar from './Components/NavBar'
import App from './Views/App';
import Browse from './Views/browse';
import Profile from './Views/profile';

  ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <Navbar />
            <div>
            <Route path="/" exact component={App} />
            <Route path="/browse" exact component={Browse} />
            <Route path="/profile" exact component={Profile} />
            </div>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
