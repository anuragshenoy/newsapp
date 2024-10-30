import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NewsItem.css";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAuth } from "../context/AuthContext";
import ShareIcon from "@mui/icons-material/Share";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function NewsItem({
  title = "No Title Available",
  description = "No Description Available",
  imageUrl = "https://www.shutterstock.com/search/placeholder-image",
  newsUrl,
  author = "Unknown",
  source,
  date,
  name,
  placeholderImg,
  onFavoriteChange,
}) {
  const { username } = useAuth();
  const [isFavorited, setIsFavorited] = useState(() => {
    if (username) {
      const favorites =
        JSON.parse(localStorage.getItem(`favorites-${username}`)) || [];
      return favorites.some(
        (fav) => fav.title === title && fav.newsUrl === newsUrl
      );
    }
    return false;
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  // Modal state for sharing
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleFavoriteClick = () => {
    if (username) {
      const favorites =
        JSON.parse(localStorage.getItem(`favorites-${username}`)) || [];
      if (isFavorited) {
        const updatedFavorites = favorites.filter(
          (fav) => !(fav.title === title && fav.newsUrl === newsUrl)
        );
        localStorage.setItem(
          `favorites-${username}`,
          JSON.stringify(updatedFavorites)
        );
        setIsFavorited(false);
        setSnackbarMessage("Removed from favorites");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
      } else {
        if (favorites.length < 5) {
          const updatedFavorites = [
            ...favorites,
            { title, description, imageUrl, newsUrl },
          ];
          localStorage.setItem(
            `favorites-${username}`,
            JSON.stringify(updatedFavorites)
          );
          setIsFavorited(true);
          setSnackbarMessage("Added to favorites");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage("You can only bookmark up to 5 cards.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      }

      if (onFavoriteChange) {
        onFavoriteChange();
      }
    } else {
      setSnackbarMessage(
        "Please log in or create an account to bookmark this article."
      );
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
    }
  };

  const handleShareClick = () => {
    setShareModalOpen(true);
  };

  const handleModalClose = () => {
    setShareModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = placeholderImg;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(newsUrl);
    setSnackbarMessage("Link copied to clipboard");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  // Truncate the link for display
  const truncatedLink = newsUrl;

  return (
    <div className="my-3 news-item">
      <div className="news-card">
        <div className="card-header">
          {/* {username && ( */}
            <span
              className={`badge rounded-pill favorite-badge ${
                isFavorited ? "favorited" : ""
              }`}
              onClick={handleFavoriteClick}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <BookmarkIcon />
            </span>
          {/* )} */}
          <span className="shareIcon" onClick={handleShareClick}>
            <ShareIcon />
          </span>

          <span className="badge rounded-pill bg-danger source-badge">
            {source}
          </span>
        </div>
        <img
          src={imageUrl}
          className="card-img-top"
          alt="news"
          onError={handleImageError}
        />
        <hr className="separator-line" />
        <div className="card-body">
          <h6>{name}</h6>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-animated"
          >
            Read More
          </a>
        </div>
      </div>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Share Modal */}
      <Dialog
        open={shareModalOpen}
        onClose={handleModalClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Share this article</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            overflow: "visible",
          }}
        >
          <TextField
            fullWidth
            value={truncatedLink}
            label="Copy Link"
            InputProps={{ readOnly: true }}
          />
          <IconButton onClick={handleCopyLink} style={{ color: "black" }}>
            <ContentCopyIcon />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <a className="btn btn-sm btn-animated" onClick={handleModalClose}>
            Close
          </a>
        </DialogActions>
      </Dialog>
    </div>
  );
}

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  newsUrl: PropTypes.string,
  author: PropTypes.string,
  source: PropTypes.string,
  date: PropTypes.string,
  name: PropTypes.string,
  placeholderImg: PropTypes.string,
  onFavoriteChange: PropTypes.func,
};
