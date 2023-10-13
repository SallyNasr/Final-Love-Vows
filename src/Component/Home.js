import React, { useEffect, useState } from "react";
import "./home.css";

import Navigationbar from "./Navigationbar";
import Banner from "./Banner";

import BridesShops from "./BridesShop";
import GroomShops from "./GroomsShop";
import Footer from "./Footer";

// import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

import CommonServices from "./CommonServices";
import Chatbot from "./chatbot";

const Home = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          console.log(userlogged.email);
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            console.log(q);
            const data = await getDocs(q);
            setUser(
              data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }))
            );
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const loggeduser = GetCurrentUser();
  console.log(loggeduser);

  return (
    <div className="container-section">
      <section className="nav-section">
        <Navigationbar />
      </section>
      <section className="banner-section">
        <Banner />
        <br />
      </section>
      <section>
        <Chatbot />
      </section>
      <section className="about-section" id="about-us">
        <h4 className="titleOfText">About Us</h4>
        <p>
          <hr />
          At Love and Vows, we're on a mission to turn your dream wedding into a
          reality! Our platform connects you with the best wedding shops and
          stylists, offering endless inspiration. What makes us special? Our
          exclusive discounts! Use our website coupons to create your dream
          wedding while staying within your budget, because your love story
          deserves nothing but the best. Are you ready to experience the magic
          of Love and Vows today?
        </p>
      </section>
      <section className="bride-section" id="bride-section">
        <BridesShops />
      </section>
      <section className="groom-section" id="groom-section">
        <GroomShops />
      </section>
      <section className="photographers">
        <CommonServices />
      </section>
      <section className="footer-section">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
