import React, { useEffect, useState } from "react";
import News from "../shared/News";
import { searchArticles } from "../service";
import { useLocation } from "react-router-dom";
import SkeletonLoader from "../shared/SkeletonLoader"; // Import the SkeletonLoader component
import placeholderImg from "../assets/apple-touch-icon.png"


const SearchResults = () => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Add page state
  const [skeletonLoading, setSkeletonLoading] = useState(false); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const category = location.pathname.split("/")[2] || ""; 
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await searchArticles(query, category, page);
        setArticles(response.articles || []);
        setTotalResults(response.totalResults || 0);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query, category]); 

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      setSkeletonLoading(true); 
      const response = await searchArticles(query, category, nextPage);
      setArticles((prevArticles) => [...prevArticles, ...response.articles]); 
      setPage(nextPage);
      setSkeletonLoading(false); 
    } catch (error) {
      console.error("Failed to fetch more news:", error);
      setSkeletonLoading(false); 
    }
  };

 

  return (
    <div>
      {loading ? (
        <SkeletonLoader /> // Show skeleton loader during initial load
      ) : (
        <News
          data={{ articles, totalResults }}
          placeholderImg={placeholderImg}
          loadMoreData={fetchMoreData}
          category={query.charAt(0).toUpperCase() + query.slice(1)} // Use a static category name or customize it as needed
          skeletonLoading={skeletonLoading} // Pass skeleton loading state to News component
        />
      )}
    </div>
  );
};

export default SearchResults;
