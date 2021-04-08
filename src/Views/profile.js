import React from "react";
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div>
    <h1>This is my profile</h1>
    <Button component={ Link } to="/">Go back to home</Button>
    <div>
      <img src="https://homepages.cae.wisc.edu/~ece533/images/lena.png" alt="Profile"></img> 
    </div>
  </div>
  );
}

export default Profile;
