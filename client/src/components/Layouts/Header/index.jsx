import { AppBar, Button, Menu, MenuItem, Toolbar } from "@material-ui/core";
import { PROFILE_ROUTE } from "constants";
import { SIGN_IN_ROUTE } from "constants";
import { WORKSPACES_ROUTE } from "constants";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteItemFromLocalStorage } from "utils";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button color="inherit" component={Link} to={WORKSPACES_ROUTE}>
          Workspace App
        </Button>
        <Button component={Link} color="inherit" to={`${WORKSPACES_ROUTE}/create`}>
          Create workspace
        </Button>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={Link} to={PROFILE_ROUTE}>
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => deleteItemFromLocalStorage("token")}
            to={SIGN_IN_ROUTE}
            component={Link}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
