import React from "react";
import "./Footer.css"; // Import your custom CSS for styling
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

function Footer() {
  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo ">
            <h2>Love & Vows</h2>
          </div>
          <div className="footer-links ">
            <Link to="/" onClick={scrollToTop}>
              Home
            </Link>{" "}
            {/* Add a space after Home */}
            <a href="#about-us">About us </a>
            {/* Add a space after About us */}
            <Link to="/terms">Terms & Conditions</Link>{" "}
            {/* Add a space after Terms & Conditions */}
            <Link to="/privacy">Privacy policy</Link>{" "}
            {/* Add a space after Privacy policy */}
            <Link to="/Contact-us">Contact us</Link>{" "}
            {/* Add a space after Contact us */}
          </div>
        </div>
        <hr />
        <div className="footer-social text-center">
          <a href="#">
            <FacebookRoundedIcon className="facebook-icon" />
          </a>
          <a href="#">
            <TwitterIcon className="twitter-icon" />
          </a>
          <a href="#">
            <InstagramIcon className="instagram-icon" />
          </a>
        </div>
        <div className="footer-copyright text-center">
          &copy; {new Date().getFullYear()} Love & Vows. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
