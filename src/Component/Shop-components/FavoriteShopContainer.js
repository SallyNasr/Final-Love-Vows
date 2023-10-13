// FavoriteShopContainer.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import PlaceIcon from '@mui/icons-material/Place';
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const FavoriteShopContainer = ({ shop, removeFavoriteShop }) => {
    const [isFavorite, setIsFavorite] = useState(true); // Shops on the favorite page are always marked as favorite


    const handleRemoveFromFavorites = async () => {
        setIsFavorite(false);
        alert('Shop Removed from Favorite');

        try {
            // Remove the shop from the 'favorite-shops' collection in Firestore
            const q = query(collection(db, 'favorite-shops'), where("shopId", "==", shop.id));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs.length > 0) {
                const shopDocRef = querySnapshot.docs[0].ref;
                await deleteDoc(shopDocRef);
                // Notify the parent component to remove the shop from the list
                removeFavoriteShop(shop.id);
                console.log('delete shop');
            }
        } catch (error) {
            console.error('Error removing shop from favorites:', error);
        }
    }

    if (!isFavorite) {
        return null; // Don't render the component if it's not a favorite
    }

    return (
        <div className="shop-container">
            <img src={shop.shopImage} alt={shop.shopTitle} />

            <div className="shop-details">
                <div style={{ display: "flex" }}>
                    <div className="shoptitle">{shop.shopTitle}</div>
                    <div className="buttons-container">
                        <button className="favorite-btn" onClick={handleRemoveFromFavorites}>
                            <FontAwesomeIcon
                                icon={faHeart}
                                style={{
                                    color: !isFavorite ? "#ccc" : "#c1579a",
                                    fontSize: "24px"
                                }}
                            />
                        </button>
                    </div>
                </div>

                <div className="couponPercentage-container">
                    <span>
                        Use your coupon and get {shop.shopCoupon}% discount from us!
                    </span>
                </div>
                <div className="Shop-location">
                    <PlaceIcon />{shop.shopAddress}
                </div>
                <div className="shopLink">
                    <a href={shop.shopDescription} className="website-link">Visit Us</a>
                </div>
            </div>
        </div>
    );
};

export default FavoriteShopContainer;
