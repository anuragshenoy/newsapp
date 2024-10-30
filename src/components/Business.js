import React, { useEffect, useState } from "react";
import News from "../shared/News";
import SkeletonLoader from "../shared/SkeletonLoader";
import { searchArticles } from "../service";
import businessImg from "../assets/finalbusiness.webp";

const Business = () => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // 

  const query = "business";
  const category = ""; // Ensure category is set correctly

  useEffect(() => {
    const fetchInitialArticles = async () => {
      try {
        setLoading(true);
        const response = await searchArticles(query, category, page);
        setArticles(response.articles || []);
        setTotalResults(response.totalResults || 0);
      } catch (error) {
        console.error("Error fetching business articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialArticles();
  }, [query, category]); 

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const response = await searchArticles(query, category, nextPage);
      setArticles((prevArticles) => [...prevArticles, ...response.articles]);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to fetch more business news:", error);
    }
  };

  const placeholderImg = businessImg;

  return (
    <div>
      {loading ? (
        <SkeletonLoader count={20} />
      ) : (
        <News
          data={{ articles, totalResults }}
          placeholderImg={placeholderImg}
          loadMoreData={fetchMoreData}
          category={query.charAt(0).toUpperCase() + query.slice(1)} 
        />
      )}
    </div>
  );
};

export default Business;
