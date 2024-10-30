import React from "react";
import RotatingText from "../shared/RotatingText";
import Carousel from "../shared/Carousel";
import Footer from "../shared/Footer";
import businessImg from "../assets/finalbusiness.webp";
import entertainmentImg from "../assets/finalentertainment.webp";
import generalImg from "../assets/finalgeneral.avif";
import healthImg from "../assets/finalhealth.webp";
import scienceImg from "../assets/finalscience.jpg";
import sportsImg from "../assets/finalsports.avif";
import technologyImg from "../assets/finaltechnology.webp";
import EmailForm from "../shared/EmailForm";
import "./styles.css";

export default function Home() {
  const rotatingWords = [
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];

  const carouselData = [
    { src: businessImg, title: "Business", link: "/business" },
    { src: entertainmentImg, title: "Entertainment", link: "/entertainment" },
    { src: generalImg, title: "General", link: "/general" },
    { src: healthImg, title: "Health", link: "/health" },
    { src: scienceImg, title: "Science", link: "/science" },
    { src: sportsImg, title: "Sports", link: "/sports" },
    { src: technologyImg, title: "Technology", link: "/technology" },
  ];

  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-name">PulseWire</span>
          </h1>
          <h2 className="hero-subtitle">
            Explore{" "}
            <span className="rotating-text">
              <RotatingText wordList={rotatingWords} />
            </span>
          </h2>
          <p className="hero-description">
            Not sure where to start with your news reading? We’ve got you
            covered. Explore our wide range of categories and find the stories
            that matter most to you. From breaking news to in-depth analysis,
            PulseWire is here to keep you informed and engaged. Dive in and
            discover the latest updates, all in one place.
          </p>
          <a href="#carousel" className="cta-button">
            Start Exploring
          </a>
        </div>
      </div>
      <h1 className="discover-title">Discover</h1>
      <div className="carousel-wrapper" id="carousel">
        <Carousel carouselData={carouselData} />
      </div>
      <EmailForm />
      {/* <Footer /> */}
    </>
  );
}
