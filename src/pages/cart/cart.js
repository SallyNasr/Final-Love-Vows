import React, { useContext } from "react";
import { ShopContext } from "../Ourownshop/shop-context";
import { OURPRODUCTS } from "../../ourproducts";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import CartItem from "./cart-item";
import Navigationbar from "../../Component/Navigationbar";
import ban2 from '../../images/bannner2.png';


export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  return (
    <>
      <Navigationbar />
      <div>
        <img src={ban2} alt='banner-image1' style={{ position: "relative" }} height='65px' width='100%' />
      </div>
      <div className="cart">
        <div>
          <h1>Your Cart Items</h1>
        </div>
        <div className="cart">
          {OURPRODUCTS.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItem data={product} />;
            }
          })}
        </div>

        {totalAmount > 0 ? (
          <div className="checkout">
            <p> Subtotal: ${totalAmount} </p>
            <button onClick={() => navigate("/ourshop")}> Continue Shopping </button>
            <button
              onClick={() => {
                checkout();
                navigate("/checkout");
              }}
            >
              {" "}
              Checkout{" "}
            </button>
          </div>
        ) : (
          <h1> Your Shopping Cart is Empty</h1>
        )}
      </div>
    </>
  );
};
