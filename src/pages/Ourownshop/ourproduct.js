import React, { useContext, useState } from "react";
import { ShopContext } from "./shop-context";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

export const Product = (props) => {
  const { id, productName, price } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];
  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const handleAddToCart = () => {
    const user = auth.currentUser;
    if (user) {
      setUserLoggedIn(true);
      addToCart(id);
    } else if(!userLoggedIn){
      alert('Please log in first.');
    navigate("/login");
      setUserLoggedIn(false);
    }
  }

  


  return (
    <div className="product">
      {/* <img src={productImage} /> */}
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBttn" onClick={handleAddToCart}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
