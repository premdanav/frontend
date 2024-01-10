import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAuthUserData } from "../store/slices/userAuthSlice";
import axios from "axios";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const role = useSelector((state) => state.user.role);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/${role}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`logout ${response.data.message}`);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
    dispatch(clearAuthUserData());

    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {!isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Register
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
