import React from "react";
import coupleImage from "../images/img_placeholder.png";
import curveImage from "../images/curve.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Component/Banner.css";
import Chatbot from "./chatbot";

const Banner = () => {
  return (
    <div className="banner-container">
      <img
        src={coupleImage}
        alt="Couple"
        style={{
          width: " 100%",
          height: "75%",
          objectFit: "cover",
          objectPosition: "bottom center",
        }}
        fetchpriority="high"
        className="main-banner"
      />
      <div className="text-overlay">
        <p className="banner-text">
          Discover With Us:
          <br />
          Your Dream Wedding
        </p>
      </div>

      <img src={curveImage} alt="curve banner" className="curve-banner" />
      <chatbot />
    </div>
  );
};

export default Banner;
