import React from "react";
import { Modal, Button, Box, Typography } from "@mui/material";
import EmailForm from "./EmailForm";
import "./NewsItem.css"

const SubscribeModal = ({ open, handleClose }) => {
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
          maxWidth: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          mx: "auto",
          mt: 10,
          mb: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ color: "#333", textAlign: "center" }}
        >
          Subscribe to our Newsletter
        </Typography>
        <EmailForm />
        <Button
        className="btn btn-sm btn-animated"
          onClick={handleClose}
          sx={{
            mt: 2,
            padding: "0.2rem 1.1rem",
            fontSize: "1rem",
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default SubscribeModal;
