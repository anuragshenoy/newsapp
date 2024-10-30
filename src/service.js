import axios from "axios";

const getBusinessNews = (country, query) =>
  searchArticles("business", country, query);

const getEntertainmentNews = (country, query) =>
  searchArticles("entertainment", country, query);

const getGeneralNews = (country, query) =>
  searchArticles("general", country, query);

const getHealthNews = (country, query) =>
  searchArticles("health", country, query);

const getScienceNews = (country, query) =>
  searchArticles("science", country, query);

const getSportsNews = (country, query) =>
  searchArticles("sports", country, query);

const getTechnologyNews = (country, query) =>
  searchArticles("technology", country, query);

const searchArticles = async (query, category, page = 1) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        category: category || "", //
        sortBy:"publishedAt",
        language: "en",
        apiKey: process.env.REACT_APP_API_KEY,
        pageSize: 16,
        page: page,
    
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching articles:", error);
    return { articles: [], totalResults: 0 };
  }
};

export {
  getBusinessNews,
  getEntertainmentNews,
  getGeneralNews,
  getHealthNews,
  getScienceNews,
  getSportsNews,
  getTechnologyNews,
  searchArticles,
};
