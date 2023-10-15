import React, { useState } from "react";
import "./SignupForm.css";
import { Link, useNavigate } from "react-router-dom"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";

const SignupForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg("Please fill out all the required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create the user document in Firestore
      await addDoc(collection(db, "users"), {
        username: name,
        email: email,
        uid: user.uid,
      });

      setSuccessMsg(
        "New user added successfully, you will be automatically redirected to the login page"
      );
      setName("");
      setEmail("");
      setPassword("");
      setErrorMsg("");
      setConfirmPassword("");

      setTimeout(() => {
        setSuccessMsg("");
        navigate("/Login");
      }, 2000);

    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrorMsg("Invalid Email format.");
      } else if (error.code === "auth/email-already-in-use") {
        setErrorMsg("User already exists.");
      } else if (error.code === "auth/weak-password") {
        setErrorMsg("Password is too weak, should be at least 6 characters.");
      } else {
        setErrorMsg("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="navbar nb" >
        <h1 className="name">Love & Vows</h1>
        <div>
          <Link to="/" className="links">
            <KeyboardBackspaceSharpIcon
              sx={{ fontSize: 50 }}
              style={{ color: "white" }}
            />
          </Link>
          <Link to="userprofile"></Link>
          <PermIdentityIcon
            sx={{ fontSize: 50 }}
            style={{ color: "white" }}
          />
        </div>
      </div>

      <div className="reg-container">
        <form onSubmit={handleSubmit} className="reg-form" id="reg-form">
          <div className="header">
            <h2>Create Account</h2>
          </div>
          {successMsg && (
            <>
              <div className="success-msg">{successMsg}</div>
            </>
          )}

          {errorMsg && (
            <>
              <div className="error-msg">{errorMsg}</div>
            </>
          )}

          <div className="reg-form-control">
            <label htmlFor="name">User name</label>
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="User Name"
            />
          </div>

          <div className="reg-form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="reg-form-control">
            <label htmlFor="reg-password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              id="reg-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash color="black" /> : <FaEye color="black" />}
            </span></div>
          
          <div className="reg-form-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash color="black" /> : <FaEye color="black" />}
            </span>
          </div>
          <button type="submit">Sign Up</button>

          <h6>
            Already have an account?
            <Link to="/Login" className="reg-link-btn">
              Login here.
            </Link>
          </h6>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
