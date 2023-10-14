import React from "react";
import { OURPRODUCTS } from "../../OURPRODUCTS";
import { Product } from "./ourproduct";
import "./ourshop.css";
import Navigationbar from "../../Component/Navigationbar";
import Footer from "../../Component/Footer";
import ban2 from '../../images/bannner2.png'

import FetchCarousel from "../uploadProducts/fetchImagesCarousel";



export const OurShop = () => {
  return (
    <>
      <Navigationbar />

      <img src={ban2} alt='banner-image1' style={{ position: "relative" }} height='65px' width='100%' />
      <div className="Ourshop">
        <div className="ourshopTitle">
          <h1>Welcome to our own Shop</h1>
        </div>
        {/* <DressThreeD /> */}

        {/* DREES 1 */}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="sketchfab-embed-wrapper">
            <iframe
              title="The Bride"
              frameBorder="0"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              execution-while-out-of-viewport
              execution-while-not-rendered
              web-share
              src="https://sketchfab.com/models/6f72346c99d44a8cbc59bbe6630d0b20/embed"
            ></iframe>
          </div>
          {/* DRESS 2 */}
          <div className="sketchfab-embed-wrapper">
            <iframe
              title="Erica Bride Fullbody"
              frameBorder="0"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking
              execution-while-out-of-viewport
              execution-while-not-rendered
              web-share
              src="https://sketchfab.com/models/04940b90131b4c458f85f86ace3de329/embed"
            ></iframe>
          </div>
          {/* DRESS 3 */}
          <div className="sketchfab-embed-wrapper">
            <iframe
              title="3DFascination Bride"
              frameBorder="0"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking
              execution-while-out-of-viewport
              execution-while-not-rendered
              web-share
              src="https://sketchfab.com/models/fd982b81899144308e18e2a54e02f897/embed"
            ></iframe>
          </div>
        </div>

      
        <FetchCarousel />
        <div className="ourproducts">
          {OURPRODUCTS.map((product) => (
            <Product data={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default OurShop;