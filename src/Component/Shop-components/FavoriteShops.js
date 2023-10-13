import React, { useEffect, useState } from "react";
import Navigationbar from "../Navigationbar";
import ban2 from "../../images/bannner2.png";
import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import FavoriteShopContainer from "./FavoriteShopContainer";

const FavoriteShops = (setIsFavorite) => {

  const [favoriteShops, setFavoriteShops] = useState([]);

  useEffect(() => {
    // Query for favorite shops
    const favoriteShopsRef = collection(db, 'favorite-shops');

    // Listen for changes to the favorite-shops collection
    const unsubscribe = onSnapshot(favoriteShopsRef, (snapshot) => {
      const shops = snapshot.docs.map((doc) => doc.data());
      setFavoriteShops(shops);
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, []);

  const removeFavoriteShop = async (shopId) => {
    try {
      // Remove the shop from the 'favorite-shops' collection in Firestore
      const shopDocRef = doc(db, 'favorite-shops', shopId);
      await deleteDoc(shopDocRef);

      // Remove the shop from the list of favorite shops in state
      const updatedFavoriteShops = favoriteShops.filter((shop) => shop.shopId !== shopId);
      setFavoriteShops(updatedFavoriteShops);

      setFavoriteShops((prevFavoriteShops) =>
        prevFavoriteShops.map((shop) => {
          if (shop.shopId === shopId) {
            return { ...shop, isFavorite: false };
          }
          return shop;
        })
      );

    } catch (error) {
      console.error('Error removing shop from favorites:', error);
    }
  };

  return (
    <div>
      <Navigationbar />
      <div>
        <img
          src={ban2}
          alt="banner-img"
          style={{
            position: "relative",
            height: "65px",
            width: "100%",
          }}

        />
      </div>
      <h1>Favorite Shops</h1>
      <div>
        {favoriteShops.map((shop) => (
          <div key={shop.shopId}>
            <FavoriteShopContainer
              key={shop.shopId}
              shop={shop}
              removeFavoriteShop={removeFavoriteShop}
              setIsFavorite={setIsFavorite} // Pass isFavorite as a prop
              isShopFavorite={favoriteShops.includes(shop.id)}

            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default FavoriteShops;
