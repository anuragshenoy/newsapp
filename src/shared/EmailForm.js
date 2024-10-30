import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import "./NewsItem.css"


export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/send-email", { email });
      setSnackbarMessage(
        "Welcome to the newsletter! Thank you for subscribing."
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setEmail("");
    } catch (error) {
      console.error("Error sending email:", error);
      setSnackbarMessage("There was an error subscribing. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <div
        className="newsletter-container"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "1.5rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center", // Ensures text is centered
            maxWidth: "600px", // Restricting max width to avoid too wide text
            margin: "auto", // Centers the container
            padding: "2rem 1rem",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "1.75rem",
              marginBottom: "1rem",
            }}
          >
            Stay Updated with Our Newsletter
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            Subscribe to receive the latest news and personalized updates
            delivered straight to your inbox. Choose the topics you’re
            interested in and never miss out on the stories that matter most to
            you.
          </p>

          {/* Form Section */}
          <form
            className="row g-3 newsletter-form"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "500px",
            }}
            onSubmit={handleSubmit}
          >
            <div
              className="col-auto d-flex flex-row"
              style={{ flex: "1", paddingRight: "0.5rem" }}
            >
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  fontSize: "1rem",
                  boxSizing: "border-box", // Ensures padding is included in the width calculation
                }}
              />
              <button
                type="submit"
                className="btn btn-sm btn-animated mb-3 mx-2"
                style={{
                  padding: "0.6rem 1.5rem",
                  fontSize: "1rem",
                  borderRadius: "4px",
                  height: "calc(100% - 0.1rem)", // Aligns height with input field
                  display: "flex",
                  alignItems: "center", // Aligns text vertically in the center
                }}
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe Now"}
              </button>
            </div>
            {/* <div className="col-auto"></div> */}
          </form>
        </div>
      </div>

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SnackbarContent
          style={{
            backgroundColor: snackbarSeverity === "success" ? "green" : "red",
          }}
          message={snackbarMessage}
        />
      </Snackbar>
    </>
  );
}
