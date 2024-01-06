import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = (type) => {
    if (type === "Admin") {
      navigate("/admin-login");
    } else if (type === "User") {
      navigate("/user-login");
    }
  };
  return (
    <Container className="cont">
      <Box
        className="container2"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Avatar
          src="/Admin.png"
          alt="admin img"
          sx={{ width: 200, height: 200 }}
          onClick={() => handleClick("Admin")}
        />
        <Typography variant="body1">ADMIN</Typography>
      </Box>
      <Box
        className="container3"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Avatar
          src="/User.png"
          alt="user img"
          sx={{ width: 200, height: 200 }}
          onClick={() => handleClick("User")}
        />
        <Typography variant="body1">USER</Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
