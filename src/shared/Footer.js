import React from "react";
import { Link } from "react-router-dom";

import logoIcon from "../assets/android-chrome-192x192.png";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo ">
        <Link to="/" className="me-2 text-muted text-decoration-none lh-1">
          <img src={logoIcon} alt="Company Logo" width="auto" height="70" />
        </Link>
        <span>PulseWire</span>
      </div>
      <div className="footer-text">
        <span>&copy; 2024 PulseWire, Inc</span>
      </div>
      <ul className="footer-icons list-unstyled d-flex">
        <li>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XIcon />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </a>
        </li>
        <li>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </a>
        </li>
      </ul>
    </div>
  );
}
