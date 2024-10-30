import React, { useState, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // useAuth hook from AuthContext
import "./NavBar.css";
import SubscribeModal from "./SubscribeModal";
import axios from "axios";
import "./NavbarSearchBar.css";
import NavbarSearchBar from "./NavbarSearchBar";
import LoginModal from "./LogInModal";
import PersonIcon from "@mui/icons-material/Person";

import businessImage from "../assets/finalbusiness.jpg";
import entertainmentImage from "../assets/finalentertainment.webp";
import generalImage from "../assets/finalgeneral.avif";
import healthImage from "../assets/finalhealth.webp";
import scienceImage from "../assets/finalscience.jpg";
import sportsImage from "../assets/finalsports.avif";
import technologyImage from "../assets/finaltechnology.avif";

const defaultImages = {
  business: businessImage,
  entertainment: entertainmentImage,
  general: generalImage,
  health: healthImage,
  science: scienceImage,
  sports: sportsImage,
  technology: technologyImage,
};

export default function NavBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, setUsername } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [logInModalOpen, setLogInModalOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState("");
  const [newsData, setNewsData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const isLoggedIn = Boolean(username); 
  const user = { username };

  const handleSearch = () => {
    const category = location.pathname.split("/")[1];
    navigate(`/search?query=${searchQuery}`);
  };

  const handleMouseEnter = (category) => {
    setDropdownVisible(category);
    loadCards(category);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(null);
  };

  const handleSubscribeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } else {
      setModalOpen(true);
    }
  };

  const handleLogInClick = () => {
    setLogInModalOpen(true);
  };

  const handleLogout = () => {
    setUsername(null);
    sessionStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const loadCards = async (category) => {
    try {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: category,
          from: "2024-10-02",
          to: "2024-10-02",
          sortBy: "popularity",
          apiKey: process.env.REACT_APP_API_KEY,
          pageSize: 7,
          language: "en",
        },
      });
      const filteredArticles = response.data.articles.filter(
        (article) => article.title !== "[Removed]"
      );
      setNewsData({ ...newsData, [category]: filteredArticles });
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <div className="brand-container">
              <img src="apple-touch-icon.png" alt="Logo" className="logo" />
            </div>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              {categories.map((category) => (
                <li
                  key={category}
                  className="nav-item"
                  onMouseEnter={() => handleMouseEnter(category)}
                >
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to={`/${category}`}
                    onClick={() => setDropdownVisible(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </NavLink>
                  {dropdownVisible === category && (
                    <div
                      id={`dropdown-${category}`}
                      ref={dropdownRef}
                      className="dropdown-menu"
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="dropdown-content">
                        <h4>
                          Trending{" "}
                          {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                          News
                        </h4>
                        <div className="news-card-container row">
                          {newsData[category]?.slice(0, 7).map((article) => (
                            <a
                              key={article.url}
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="news-card col"
                            >
                              <img
                                src={
                                  article.urlToImage || defaultImages[category]
                                }
                                alt={article.title}
                              />
                              <h5>{article.title}</h5>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Centered Search Bar */}
            <div className="mx-auto search-bar">
              <NavbarSearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
              />
            </div>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <div className="nav-link col-auto d-flex flex-row">
                      <PersonIcon />
                      <span className="ms-2">{user.username}</span>
                    </div>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "active" : ""}`
                      }
                      to="/favorites"
                    >
                      Favorites
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={handleLogout}>
                      Log Out
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "active" : ""}`
                      }
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      onClick={handleLogInClick}
                      style={{ cursor: "pointer" }}
                    >
                      Log In
                    </a>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/about"
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={handleSubscribeClick}
                  style={{ cursor: "pointer" }}
                >
                  Subscribe
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <SubscribeModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
      <LoginModal
        open={logInModalOpen}
        handleClose={() => setLogInModalOpen(false)}
      />
    </div>
  );
}
