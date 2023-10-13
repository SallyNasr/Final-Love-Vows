import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import "./Shopcontainer.css";
import PlaceIcon from "@mui/icons-material/Place";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const Shopcontainer = ({ shop, removeFavoriteShop}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the shop is in the user's favorites
    const checkFavoriteStatus = async () => {
      const q = query(
        collection(db, "favorite-shops"),
        where("shopId", "==", shop.id)
      );
      const querySnapshot = await getDocs(q);
      setIsFavorite(querySnapshot.docs.length > 0);
    };
    checkFavoriteStatus();
  }, [shop.id]);

  const handleAddToFavorites = async () => {
    if (!isFavorite) {
      setIsFavorite(true);
      alert("Shop added to Favorite");

      try {
        await addDoc(collection(db, "favorite-shops"), {
          shopId: shop.id,
          shopImage: shop.shopimage,
          shopTitle: shop.shoptitle,
          shopCoupon: shop.couponPercentage,
          shopAddress: shop.address,
          shopDescription: shop.description
        });
      } catch (error) {
        console.error("Error adding shop to favorites:", error);
      }
    } else {
      setIsFavorite(false);
      alert("Shop Removed from Favorite");

      try {
        // Remove the shop from the 'favorite-shops' collection in Firestore
        const q = query(
          collection(db, "favorite-shops"),
          where("shopId", "==", shop.id)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
          const shopDocRef = querySnapshot.docs[0].ref;
          await deleteDoc(shopDocRef);

          // Call the removeFavoriteShop callback to update the parent component
          removeFavoriteShop(shop.id);
        }
      } catch (error) {
        console.error("Error removing shop from favorites:", error);
      }
    }
  };

  return (
    <div className="shop-container">
      <img src={shop.shopimage} alt={shop.shoptitle} />

      <div className="shop-details">
        <div style={{ display: "flex" }}>
          <div className="shoptitle">{shop.shoptitle}</div>

          <div className="buttons-container">
            <button className="favorite-btn" onClick={handleAddToFavorites}>
              <FontAwesomeIcon
                icon={faHeart}
                style={{
                  color: isFavorite ? "#c1579a" : "#ccc",
                  fontSize: "24px",
                }}
              />
            </button>
          </div>
        </div>

        <div className="couponPercentage-container">
          <span>
            Use your coupon and get {shop.couponPercentage}% discount from us!
          </span>
        </div>
        <div className="Shop-location">
          <PlaceIcon />
          {shop.address}
        </div>
        <div className="shopLink">
          <a href={shop.description} className="website-link">
            Visit Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Shopcontainer;
