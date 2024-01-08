import React, { useEffect, useState } from "react";
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
import { clearAuthUserData } from "../../store/slices/userAuthSlice";
import { ToastContainer, toast } from "react-toastify";

const AdminDashboard = () => {
  const token = useSelector((state) => state.user.token);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetAllUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/admin/getusers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.allUsers);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    handleGetAllUsers();
  }, [token, users]);

  const handleAddUser = () => {
    navigate("/adduser");
  };

  const handleDeleteUser = async (id) => {
    const response = await axios.delete(
      `http://localhost:5001/admin/deleteuser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(response.data.message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:5001/admin/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`logout ${response.data.message}`);
      dispatch(clearAuthUserData());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
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
            <Button fullWidth variant="contained" onClick={handleAddUser}>
              Add User
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
                      <Button onClick={() => handleDeleteUser(user._id)}>
                        Delete
                      </Button>
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
      <ToastContainer />
    </Container>
  );
};

export default AdminDashboard;
