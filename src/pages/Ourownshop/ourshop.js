import React from "react";
import { OURPRODUCTS } from "../../ourproducts";
import { Product } from "./ourproduct";
import "./ourshop.css";
import Navigationbar from "../../Component/Navigationbar";
import Footer from "../../Component/Footer";
import ban2 from '../../images/bannner2.png'

import FetchCarousel from "../uploadProducts/fetchImagesCarousel";
import ImageUploadForm from "../uploadProducts/ImageUploadForm";
import uploadMultiImages from '../uploadProducts/uploadMultiImages';
import DressThreeD from "../../3D shops/assets/importModel";

export const OurShop = () => {
  return (
    <>
      {/* <Navigationbar />

      <img src={ban2} alt='banner-image1' style={{ position: "relative" }} height='65px' width='100%' />
      <div className="Ourshop">
        <div className="ourshopTitle">
          <h1>Welcome to our own Shop</h1> */}

<DressThreeD/>

          {/* <uploadMultiImages />
        </div>
        <ImageUploadForm />
        {uploadMultiImages}
        <FetchCarousel />
        <div className="ourproducts">
          {OURPRODUCTS.map((product) => (
            <Product data={product} />
          ))}
        </div>
      </div>
      <Footer /> */}
    </>
  );
};
export default OurShop;