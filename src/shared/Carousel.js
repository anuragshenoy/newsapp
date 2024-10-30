import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Add additional styles here

export default function Carousel(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const carousel = document.getElementById("carouselExampleFade");
    new window.bootstrap.Carousel(carousel, {
      interval: 3000,
      ride: "carousel",
    });
  }, []);

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {props.carouselData.map((item, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={index}
            onClick={() => navigate(item.link)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={item.src}
              className="d-block w-100 carousel-image"
              alt={item.title}
            />
            <div className="carousel-caption">
              <h5>{item.title}</h5>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
