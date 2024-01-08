import React from "react";
import { Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Box
        component="footer"
        sx={{
          mt: 2,
          py: 2,
          textAlign: "center",
          backgroundColor: "#2196F3",
          position: "static",
          width: "100%",
          bottom: 0,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © 2024 Premkumar Danav
        </Typography>
      </Box>
    </div>
  );
};

export default Footer;
