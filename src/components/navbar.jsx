// src/components/Navbar.jsx

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "@fontsource/poppins";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#000000ff",
        boxShadow: "none",
        paddingY: 1,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            color: "white",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
         Search My Movie
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;