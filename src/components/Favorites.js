import React, { useEffect, useState } from "react";
import NewsItem from "../shared/NewsItem"; // Reuse NewsItem for displaying articles
import { useAuth } from "../context/AuthContext"; // Ensure correct path
import defaultImg from "../assets/android-chrome-192x192.png"

const Favorites = () => {
  const { username } = useAuth(); // Get username from AuthContext
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites when the component mounts or when username changes
  useEffect(() => {
    if (username) {
      const savedFavorites =
        JSON.parse(localStorage.getItem(`favorites-${username}`)) || [];
      setFavorites(savedFavorites);
    }
  }, [username]);

  // Function to handle updating favorites in real-time
  const updateFavorites = () => {
    const updatedFavorites =
      JSON.parse(localStorage.getItem(`favorites-${username}`)) || [];
    setFavorites(updatedFavorites);
  };

  return (
    <div className="container" style={{minHeight:"76vh"}} >
      <h1 className="text-center" style={{ margin: "140px 0px 40px 0px" }}>
        {username}'s Favorites
      </h1>
      {favorites.length > 0 ? (
        <div className="row">
          {favorites.map((element) => (
            <div className="col-xl-3 col-md-6 mb-3" key={element.newsUrl}> {/* Use newsUrl as key */}
              <NewsItem
                title={element.title}
                description={element.description}
                imageUrl={!element.imageUrl?defaultImg:element.imageUrl}
                newsUrl={element.newsUrl}
                author={element.author || "Unknown"}
                date={element.publishedAt}
                source={element.source}
                placeholderImg="/path-to-placeholder-img.jpg"
                // Pass the updateFavorites callback to NewsItem
                onFavoriteChange={updateFavorites}
              />
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center">No favorites added yet.</h2>
      )}
    </div>
  );
};

export default Favorites;
