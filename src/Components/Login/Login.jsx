import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Link,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navbar from "../Navbar/Navbar";

const Login = () => {
  const btnstyle = { margin: "8px 0" };
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("13.228.225.19:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Redirect to Dashboard or handle successful login
        // const result = await response.json();
        console.log("Navigating to /dashboard");
        navigate("/dashboard");
        console.log("Login successful");
      } else {
        // const error = await response.json();
        const errorResponse = await response.json();
        setError(errorResponse.error || "Login failed");
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <Grid>
        <Paper elevation={20} className="paper-login">
          <Grid align="Center">
            <Avatar sx={{ bgcolor: "#1bbd7e" }}>
              <LoginIcon />
            </Avatar>
            <h2>Login</h2>
          </Grid>
          <form onSubmit={handleLogin}>
            <Stack spacing={2} direction="column">
              <TextField
                label="Username"
                placeholder="Enter Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Password"
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </Stack>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Button
              type="submit"
              variant="contained"
              style={btnstyle}
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              login
            </Button>
          </form>
          <Typography>
            <Link href="#">Forgot Password?</Link>
          </Typography>
          <Typography>
            Don't have an account?
            <Link href="/signup">SignUp</Link>
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
