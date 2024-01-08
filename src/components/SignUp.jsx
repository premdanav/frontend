import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import axios from "axios";
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setAuthUserData } from "../store/slices/userAuthSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  let userDetails = {};
  let api;

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      signupCode: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = "Required";
      }

      if (!values.email) {
        errors.email = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password must match";
      }

      if (selectedValue === "admin") {
        if (!values.signupCode) {
          errors.signupCode = "Required";
        } else if (values.signupCode !== "admin") {
          errors.signupCode = "Invalid signup code";
        }
      }

      return errors;
    },

    onSubmit: async (values) => {
      if (selectedValue === "admin") {
        userDetails = {
          username: values.username,
          email: values.email,
          password: values.password,
          signupCode: "admin",
        };
        console.log(`userDetails are in admin ${JSON.stringify(userDetails)}`);
        api = "http://localhost:5001/admin/register";
      } else {
        userDetails = {
          username: values.username,
          email: values.email,
          password: values.password,
        };
        console.log(
          `userDetails are in user ${JSON.stringify(userDetails.username)}`
        );

        api = "http://localhost:5001/user/register";
      }

      try {
        const response = await axios.post(api, userDetails, {
          headers: { "Content-Type": "application/json" },
        });

        const token = response.data.responseData.token;
        const role = selectedValue;
        dispatch(setAuthUserData({ token, role }));

        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          if (selectedValue === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/user-dashboard");
          }
        }, 2500);
      } catch (error) {
        console.error("Registration failed:", error.message);
        toast.error("Already registered", {
          position: "top-right",
          autoClose: 3000,
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
          Sign Up
        </Typography>

        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-form-control-label-placement"
            name="position"
            value={selectedValue}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="admin"
              control={<Radio />}
              label="admin"
              labelPlacement="end"
              checked={selectedValue === "admin"}
            />

            <FormControlLabel
              value="user"
              control={<Radio />}
              label="user"
              labelPlacement="end"
              checked={selectedValue === "user"}
            />
          </RadioGroup>
        </FormControl>

        {selectedValue === "admin" && (
          <TextField
            fullWidth
            margin="normal"
            id="signupCode"
            name="signupCode"
            label="Special Signup Code"
            value={formik.values.signupCode}
            onChange={formik.handleChange}
            error={
              formik.touched.signupCode && Boolean(formik.errors.signupCode)
            }
            helperText={formik.touched.signupCode && formik.errors.signupCode}
          />
        )}

        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            margin="normal"
            id="username"
            name="username"
            label="Username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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

          <TextField
            fullWidth
            margin="normal"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" color="textSecondary" align="center">
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Sign in
          </Link>
        </Typography>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default SignUp;
