import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

export default function Register() {
  // Input States
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Loading State
  const [loading, setLoading] = useState(false);

  // Snackbar States
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Error States
  const [emailError, setEmailError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Utility Functions

  // Check if Email Exists (Case-Insensitive)
  const checkEmailExists = (emailToCheck) => {
    const trimmedEmail = emailToCheck.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(
      (user) => user.email.trim().toLowerCase() === trimmedEmail
    );
  };

  // Check if Username Exists (Case-Insensitive)
  const checkUserNameExists = (userNameToCheck) => {
    const trimmedUserName = userNameToCheck.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(
      (user) => user.userName.trim().toLowerCase() === trimmedUserName
    );
  };

  // Validation Functions

  // Validate Email on Blur
  const validateEmail = () => {
    const trimmedEmail = email.trim();
    if (trimmedEmail === "") {
      setEmailError("Email is required.");
      return false;
    }
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(trimmedEmail)) {
      setEmailError("Invalid email format.");
      return false;
    }
    if (checkEmailExists(trimmedEmail)) {
      setEmailError("Email already exists.");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Validate Username on Blur
  const validateUserName = () => {
    const trimmedUserName = userName.trim();
    if (trimmedUserName === "") {
      setUserNameError("Username is required.");
      return false;
    }
    if (checkUserNameExists(trimmedUserName)) {
      setUserNameError("Username already exists.");
      return false;
    }
    setUserNameError("");
    return true;
  };

  // Validate Password on Change
  const validatePassword = (newPassword) => {
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Validate Confirm Password on Change
  const validateConfirmPassword = (newConfirmPassword) => {
    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  // Handlers

  // Handle Email Change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError("");
    }
  };

  // Handle Username Change
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    if (userNameError) {
      setUserNameError("");
    }
  };

  // Handle Password Change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);

    // Re-validate Confirm Password
    if (confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
  };

  // Handle Confirm Password Change
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validateConfirmPassword(newConfirmPassword);
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Perform Final Validations
    const isEmailValid = validateEmail();
    const isUserNameValid = validateUserName();
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (
      !isEmailValid ||
      !isUserNameValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      setSnackbarMessage("Please fix the form errors before submitting.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }

    try {
      // Retrieve existing users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Create new user object
      const newUser = {
        email: email.trim(),
        userName: userName.trim(),
        password, // Note: Storing plain passwords is insecure. Consider hashing.
      };

      // Add new user to the array
      users.push(newUser);

      // Store updated array back to localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Show success message
      setSnackbarMessage("Registration successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Reset form fields
      setEmail("");
      setUserName("");
      setPassword("");
      setConfirmPassword("");

      // Clear all error messages
      setEmailError("");
      setUserNameError("");
      setPasswordError("");
      setConfirmPasswordError("");
    } catch (error) {
      console.error("Registration error:", error);
      setSnackbarMessage(
        "There was an error in registering. Please try again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle Snackbar Close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Check Overall Form Validity
  const isFormValid = () => {
    return (
      email &&
      userName &&
      password &&
      confirmPassword &&
      !emailError &&
      !userNameError &&
      !passwordError &&
      !confirmPasswordError
    );
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
          justifyContent: "center",
          width: "100%",
          maxWidth: 600, // Responsive width
          minHeight: "100vh", // Full height of the viewport
          padding: 4,
          bgcolor: "#f8f9fa",
          borderRadius: 2,
          boxShadow: 3,
          margin: "auto",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ textAlign: "center", marginBottom: 2, fontWeight: "bold" }}
        >
          Create an Account
        </Typography>

        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          onBlur={validateEmail}
          required
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userName}
          onChange={handleUserNameChange}
          onBlur={validateUserName}
          required
          error={!!userNameError}
          helperText={userNameError}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
          required
          error={!!passwordError}
          helperText={passwordError}
        />
        <TextField
          type="password"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
        />
      
        <Button
        className="btn btn-sm btn-animated"
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            width: "100%",
            height: "45px",
            fontSize: "1rem",
          }}
          disabled={loading || !isFormValid()}
        >
          {loading ? "Registering..." : "Register"}
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
