import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { Box, TextField, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext"; // Adjust import path as needed

export default function LogInForm({ handleClose }) { // Add handleClose as a prop
  const { setUsername } = useAuth(); // Get setUsername from AuthContext
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a delay for login process
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(
        (user) => user.userName === userName && user.password === password
      );

      if (foundUser) {
        // Credentials are valid, log the user in
        setUsername(foundUser.userName); // Set the logged-in username in context
        sessionStorage.setItem("loggedInUser", foundUser.userName); // Store the username in sessionStorage
        setSnackbarMessage("Login successful!");
        setSnackbarSeverity("success");
        
        // Close modal after successful login
        handleClose();
      } else {
        // Invalid credentials
        setSnackbarMessage("Invalid username or password.");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
      setLoading(false);

      // Reset form fields
      setUserName("");
      setPassword("");
    }, 1000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 800,
          margin: "auto",
          p: 3,
          bgcolor: "#f8f9fa",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
        className="btn btn-sm btn-animated"
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            width: "100%",
            height: "40px",
            fontSize: "1rem",
          }}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SnackbarContent
          sx={{
            bgcolor: snackbarSeverity === "success" ? "green" : "red",
          }}
          message={snackbarMessage}
        />
      </Snackbar>
    </>
  );
}
