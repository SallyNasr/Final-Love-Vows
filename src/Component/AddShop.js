import React, { useState } from "react";
import Navigationbar from "./Navigationbar";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
// import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "../Component/AddShop.css";
import ban2 from ".././images/bannner2.png";

function AddShop() {
  const [shoptitle, setShopTitle] = useState("");
  const [shoptype, setShopType] = useState("");
  const [description, setDescription] = useState("");
  const [couponPercentage, setCouponPercentage] = useState("");
  const [shopimage, setShopImage] = useState("");


  // const navigate = useNavigate();
  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];

  const handleShopImg = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setShopImage(selectedFile);
        setImageError("");
      } else {
        setShopImage(null);
        setImageError("Please select a valid image file type (png or jpg).");
      }
    } else {
      setImageError("Please select your file.");
    }
  };

  const handleAddShop = async (e) => {
    e.preventDefault();
    const storageRef = ref(
      storage,
      `shop-images/${shoptype.toUpperCase()}/${Date.now()}`
    );

    try {
      await uploadBytes(storageRef, shopimage);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, `Shops-${shoptype.toUpperCase()}`), {
        shoptitle,
        shoptype,
        description,
        couponPercentage,
        shopimage: imageUrl,
      });

      setSuccessMsg("Shop added successfully");

      setShopTitle("");
      setShopType("");
      setDescription("");
      setCouponPercentage("");
      setShopImage("");
    } catch (error) {
      setUploadError(error.message);
    }
  };

  return (
    <div>
      <Navigationbar />
      <div>
        <img
          src={ban2}
          alt="banner-image1"
          style={{ position: "relative" }}
          height="65px"
          width="100%"
        />
      </div>
      <div className="addshop-container">
        <form onSubmit={handleAddShop} className="addshop-form">
          <p>Add Data</p>
          {successMsg && (
            <>
              <div className="success-msg">{successMsg}</div>
            </>
          )}

          {uploadError && (
            <>
              <div className="error-msg">{uploadError}</div>
            </>
          )}

          <label>Shop Title</label>
          <input
            onChange={(e) => setShopTitle(e.target.value)}
            type="text"
            placeholder="Shop Title"
            value={shoptitle}
          />

          <label>Shop Type</label>
          <input
            onChange={(e) => setShopType(e.target.value)}
            type="text"
            placeholder="Shop Type"
            value={shoptype}
          />

          <label>Coupon percentage</label>
          <input
            onChange={(e) => setCouponPercentage(e.target.value)}
            type="text"
            placeholder="Shop coupon"
            value={couponPercentage}
          />

          <label>Image</label>
          <input onChange={handleShopImg} type="file" />

          {imageError && (
            <>
              <div className="error-msg">{imageError}</div>
            </>
          )}

          <label>Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your Shop in brief"
            value={description}
          ></textarea>

          <button type="submit">Add</button>
        </form>
      </div>

    </div>
  );
}

export default AddShop;
