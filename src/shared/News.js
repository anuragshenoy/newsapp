import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import { Tooltip } from "@mui/material";
import SkeletonLoader from "../shared/SkeletonLoader";

import InfiniteScroll from "react-infinite-scroll-component";


const News = ({ data, loadMoreData, placeholderImg, category }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [country, setCountry] = useState("in");
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (data) {
      setArticles(data.articles || []);
      setTotalResults(data.totalResults || 0);
      setCountry(data.country || "in");
    }
  }, [data]);

  const loadMoreNews = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const newArticles = await loadMoreData(country, nextPage);

    if (newArticles && newArticles.length > 0) {
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setPage(nextPage);
    }
    setLoadingMore(false);
  };

  const filteredArticles = articles.filter(
    (element) => element.source?.name !== "[Removed]"
  );

  return (
    <>
      <h1 className="text-center" style={{ margin: "140px 0px 40px 0px" }}>
        {category} News
      </h1>

      <InfiniteScroll
        dataLength={filteredArticles.length}
        next={loadMoreNews}
        hasMore={filteredArticles.length < totalResults}
        loader={loadingMore ? <SkeletonLoader count={8} /> : null}
      >
        <div className="container">
          <div className="row">
            {filteredArticles.map((element) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3" key={element.url}>
                <NewsItem
                  title={
                    element.title
                      ? element.title.length > 35
                        ? element.title.slice(0, 35) + "..."
                        : element.title
                      : ""
                  }
                  description={
                    element.description
                      ? element.description.length > 68
                        ? element.description.slice(0, 68) + "..."
                        : element.description
                      : ""
                  }
                  imageUrl={
                    element.urlToImage ? element.urlToImage : placeholderImg
                  }
                  newsUrl={element.url}
                  author={
                    element.author
                      ? element.author.length > 8
                        ? element.author.slice(0, 8) + "..."
                        : element.author
                      : "Unknown"
                  }
                  date={element.publishedAt}
                  source={element?.source?.name}
                  placeholderImg={placeholderImg}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>

      <Tooltip title="Scroll to Top" placement="left">
        <ArrowCircleUpRoundedIcon
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            width: "50px",
            height: "50px",
            color: "#007bff",
            cursor: "pointer",
            position: "sticky",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            backgroundColor: "transparent",
            pointerEvents: "auto",
            marginBottom: "90",
            float: "right",
          }}
        />
      </Tooltip>
    </>
  );
};

export default News;
