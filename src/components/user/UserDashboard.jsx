import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
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
// import { clearAuthUserData } from "../../store/slices/userAuthSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const token = useSelector((state) => state.user.token);
  const { name, email } = useSelector((state) => state.userData);
  const [users, setUsers] = useState([]);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    const handleGetAllUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/user/getusers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(`users are ${response.data.users}`);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    handleGetAllUsers();
  }, [token]);

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
          Welcome {name} {email}
          Your are User
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}></Grid>

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sticky="top">Username</TableCell>
                <TableCell sticky="top">Email</TableCell>
                <TableCell sticky="top">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default UserDashboard;
