import React from "react";
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
    <h1>Home page</h1>
    <Button component={ Link } to="/profile">
      Go back to profile
    </Button>
    <div>
      <img src="https://homepages.cae.wisc.edu/~ece533/images/boat.png" alt="App"></img>
    </div>
  </div>
  );
}

export default App;
