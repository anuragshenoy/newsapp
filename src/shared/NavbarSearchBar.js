import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const NavbarSearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname, setSearchQuery]);

  return (
    <div
      className="search-bar-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "3rem", // Ensure the height for container
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "black",
          color: "black",
          borderRadius: "4px",
          border: "1px solid #ccc",
          height: "2.5rem", // Matching height for input and button
        }}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            padding: "0.25rem 0.5rem",
            fontSize: "1rem",
            height: "100%",
          }}
        />
        <button
          type="button" // Change to "button" type to prevent form submission
          onClick={handleSearch}
          style={{
            backgroundColor: "#007bff",
            border: "none",
            color: "white",
            padding: "0 0.75rem",
            borderRadius: "4px",
            height: "100%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaSearch style={{ fontSize: "1.3rem" }} />
        </button>
      </div>
    </div>
  );
};

export default NavbarSearchBar;
