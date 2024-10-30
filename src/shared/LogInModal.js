import React from "react";
import { Link } from "react-router-dom";

import { Modal, Button, Box, Typography } from "@mui/material";
import LogInForm from "./LogInForm";

const LoginModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: 1000, // Increased maxWidth for larger modal
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          mx: "auto",
          mt: 5,
          mb: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{ color: "#333", textAlign: "center", mb: 3 }} // Adjusted margin
        >
          Log In to Your Account
        </Typography>
        <LogInForm handleClose={handleClose} />{" "}
        {/* Pass handleClose to LogInForm */}
        <h5 style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <Link to="/register" onClick={handleClose} style={{ color: "black" }}>
            Create one
          </Link>
        </h5>
        <Button
          className="btn btn-sm btn-animated"
          onClick={handleClose}
          variant="outlined"
          sx={{
            mt: 3, // Adjusted margin-top
            color: "#007bff",
            borderColor: "#007bff",
            "&:hover": {
              backgroundColor: "#007bff",
              color: "#fff",
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginModal;
