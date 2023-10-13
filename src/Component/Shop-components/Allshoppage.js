import React, { useEffect, useState } from "react";
import Navigationbar from "../Navigationbar";
import Shopcontainer from "./Shopcontainer";
import { collection, query, getDocs } from "firebase/firestore"; // Removed 'onSnapshot' as it's not needed here
import { db } from "../../firebase";
import "./Allshoppage.css";
import Footer from "../Footer";
import ban2 from "../../images/bannner2.png";

const Allshoppage = (props) => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const getShops = async () => {
      try {
        const path = `Shops-${props.type.toUpperCase()}`; // Ensure the path matches your Firestore collection
        const querySnapshot = await getDocs(collection(db, path));

        const shopList = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setShops(shopList);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    getShops();
  }, [props.type]); // Include 'props.type' as a dependency to trigger the effect when it changes

  return (
    <div className="allshoppage">
      <Navigationbar />
      <div>
        <img
          src={ban2}
          alt="banner-img"
          style={{ position: "relative" }}
          height="65px"
          width="100%"
        />
      </div>
      <div className="heading">Our {props.type} Shops (Coupon:58923)</div>

      <div className="allshopcontainer">
        {shops.map((shop) => (
          <Shopcontainer key={shop.id} shop={shop} />
        ))}
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Allshoppage;
