import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Link,
} from "@mui/material";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import "./Signup.css";
import Navbar from "../Navbar/Navbar";

const Signup = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const btnstyle = { margin: "8px 0" };
  const marginTop = { marginTop: "5px" };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://accredian-backend-task-lcwi.onrender.com:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          gender,
          phoneNumber,
          password,
          confirmPassword,
        }),
      });

      if (response.ok) {
        // handle successful signup, e.g., show a success message or redirect to login
        // const result = await response.json();
        navigate("/login");
        console.log("Signup successful");
      } else {
        // const error = await response.json();
        const errorResponse = await response.json();
        setError(errorResponse.error || "signup failed");
        console.error("Signup failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <Grid>
        <Paper elevation={20} className="paper-signup">
          <Grid align="Center">
            <Avatar sx={{ bgcolor: "#1bbd7e" }}>
              <HowToRegRoundedIcon />
            </Avatar>
            <h2 className="headerStyle">Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account!
            </Typography>
          </Grid>
          <form onSubmit={handleSignup}>
            <Stack spacing={1} direction="column">
              <TextField
                fullWidth
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your Username"
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email id"
                required
              />

              <FormControl component="fieldset" style={marginTop}>
                <FormLabel component="legend" required>
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  style={{ display: "initial" }}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your Phone Number"
                required
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <TextField
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                placeholder="Confirm your password"
                required
              />
            </Stack>
            <FormControlLabel
              control={<Checkbox required />}
              label="Terms and Conditions."
            />
            <Button
              type="submit"
              variant="contained"
              style={btnstyle}
              color="primary"
              fullWidth
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </form>
          <Typography>
            Already have an account?
            <Link href="/login">Login</Link>
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
        </Paper>
      </Grid>
    </div>
  );
};

export default Signup;
