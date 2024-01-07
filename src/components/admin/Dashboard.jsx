import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthAdminData } from "../../store/slices/adminAuthSlice";

const Dashboard = () => {
  const token = useSelector((state) => state.authAdmin.token);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGetAllUsers = async () => {
    const response = await axios.get("http://localhost:5001/admin/getusers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`users are ${response.data.allUsers}`);
    setUsers(response.data.allUsers);
  };

  const handleAddUser = () => {
    navigate("/admin-adduser");
  };

  const handleDeleteUser = () => {};

  const handleLogout = async () => {
    const response = await axios.get("http://localhost:5001/admin/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`logut ${response.data.message}`);
    dispatch(clearAuthAdminData());
    navigate("/admin-login");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          You are Admin
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={handleGetAllUsers}>
              Get All Users
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={handleAddUser}>
              Add User
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sticky="top">Username</TableCell>
                <TableCell sticky="top">Email</TableCell>
                <TableCell sticky="top">Role</TableCell>
                <TableCell sticky="top">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.role !== "admin" ? (
                      <Button onClick={() => handleDeleteUser}>Delete</Button>
                    ) : (
                      <Button>Contact</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Dashboard;
