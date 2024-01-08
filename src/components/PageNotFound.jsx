import React from "react";
import { Typography, Box } from "@mui/material";

const PageNotFound = () => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Page Not Found
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        page does not exist.
      </Typography>
    </Box>
  );
};

export default PageNotFound;
