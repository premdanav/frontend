import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          Home
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
