import React, { useState, useEffect } from "react";
import Navigationbar from "./Navigationbar";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";


const UserProfile = () => {
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

  return (
    <div>
      <Navigationbar />
      <div className='userprofile-outercontainer'>
                {loggeduser ?
                    <div className='user-profile'>
                        <p className="heading">Your Account Details</p>
                        <div className='details'>
                            <div className='data-row'>
                                <span>Your Name:</span>
                                <span>{loggeduser.username}</span>
                            </div>
                            <div className='data-row'>
                                <span>Your Email:</span>
                                <span>{loggeduser.email}</span>
                            </div>
                           
                        </div>
                    </div>
                    : <div>You are Not Logged In</div>}
            </div>
        </div>
  );
};

export default UserProfile;
