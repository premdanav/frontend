import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { setAuthAdminData } from "../../store/slices/adminAuthSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const adminDetails = {
          email: values.email,
          password: values.password,
        };

        const response = await axios.post(
          "http://localhost:5001/admin/login",
          adminDetails
        );

        const token = response.data.responseData.token;
        dispatch(setAuthAdminData({ token }));
        console.log("logged in");
        navigate("/admin-dashboard");
      } catch (error) {
        console.log(`error is loggin ${error.message}`);
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
        <Typography variant="body2" color="textSecondary" align="center">
          Don't have an account?{" "}
          <Link to="/admin-register" style={{ textDecoration: "none" }}>
            Sign up as Admin
          </Link>
        </Typography>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Login;
