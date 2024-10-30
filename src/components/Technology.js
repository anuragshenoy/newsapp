import React, { useEffect, useState } from "react";
import News from "../shared/News";
import SkeletonLoader from "../shared/SkeletonLoader"; // Updated import
import { searchArticles } from "../service";
import TechnologyImg from "../assets/finaltechnology.webp";

const Technology = () => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Page state for pagination

  const query = "Technology";
  const category = ""; // Ensure category is set correctly

  useEffect(() => {
    const fetchInitialArticles = async () => {
      try {
        setLoading(true);
        const response = await searchArticles(query, category, page);
        setArticles(response.articles || []);
        setTotalResults(response.totalResults || 0);
      } catch (error) {
        console.error("Error fetching Technology articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialArticles();
  }, [query, category]); // Fetch initial data when query or category changes

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const response = await searchArticles(query, category, nextPage);
      setArticles((prevArticles) => [...prevArticles, ...response.articles]);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to fetch more Technology news:", error);
    }
  };

  const placeholderImg = TechnologyImg;

  return (
    <div>
      {loading ? (
        <SkeletonLoader count={20} /> // Adjust count as needed
      ) : (
        <News
          data={{ articles, totalResults }}
          placeholderImg={placeholderImg}
          loadMoreData={fetchMoreData}
          category={query.charAt(0).toUpperCase() + query.slice(1)} // Capitalize the category for display
        />
      )}
    </div>
  );
};

export default Technology;
