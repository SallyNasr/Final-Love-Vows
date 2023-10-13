import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigationbar.css";
import "../../src/colors.css";
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
import {
  Navbar,
  Nav,
  Button,
  Form,
  InputGroup,
  NavDropdown,
  Container,
  CloseButton,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { ShoppingCart } from "phosphor-react";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const allowedEmails = ["izrafiljinane@gmail.com", "sally.nasr153@gmail.com"];

const Navigationbar = () => {
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
  if (loggeduser) {
    console.log(loggeduser[0]);
  }

  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const toggleSearch = (e) => {
    e.preventDefault();
    setSearchOpen(!searchOpen);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchInput("");
  };

  const navigateToPage = (path) => {
    const searchPathMap = {
      "contact us": "/Contact-us",
      login: "/Login",
      signup: "/Signup",
      "user profile": "/userprofile",
      feedback: "/terms",
      "terms and conditions": "/terms",
      privacy: "/privacy",
      "sell shop": "/sellshop",
      heel: "/heels",
      dress: "/dresses",
      bouquet: "/bouquet",
      accessories: "/accessories",
      "hair & makeup salon": "/hair & makeup salon",
      nail: "/nails",
      outfit: "/outfit",
      watch: "/watch",
      "hair & beard": "/hair & beard",
      "photographers & videographers": "/photographers & videographers",
      spa: "/spa",
      "favorite shops": "/favoriteshops",
    };

    const normalizedPath = path.toLowerCase();
    if (searchPathMap[normalizedPath]) {
      navigate(searchPathMap[normalizedPath]);
      closeSearch();
    }
  };

  useEffect(() => {
    if (searchInput) {
      navigateToPage(searchInput);
    }
  }, [searchInput]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="transparent"
      variant="light"
      className="navbar navbar-expand-lg"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        padding: 0,
        margin: 0,
        zIndex: 1000,
        justifyContent: "space-around",
      }}
    >
      <Container
        style={{
          height: "66px",
          margin: 0,
          padding: 0,
          width: "100%",
        }}
      >
        <Navbar.Brand as={Link} to="/">
          <h1 className="name">Love & Vows</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{
            justifyContent: "flex-end",
            backgroundColor: "transparent",
          }}
          className={`collapse navbar-collapse ${searchOpen ? "show" : ""}`}
        >
          <Nav
            className="ml-auto"
            style={{
              display: "contents",
              order: 1,
            }}
          >
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link href="#about-us" className="nav-link">
              About us
            </Nav.Link>

            {/* hay lal new shop */}
            <Nav.Link as={Link} to="/ourshop" className="nav-link">
              Our Shop
            </Nav.Link>

            <NavDropdown
              title={<div>Coupon<ArrowDropDownIcon/></div>}
              id="basic-nav-dropdown"
              className="coupon-nav"
            >
              <NavDropdown.Item href="#bride-section">Bride</NavDropdown.Item>
              <NavDropdown.Item href="#groom-section">Groom</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/Contact-us" className="nav-link">
              Contact
            </Nav.Link>
            {allowedEmails.includes(auth.currentUser?.email) ? (
              <Nav.Link as={Link} to="/sellshop" className="nav-link">
                Sell
              </Nav.Link>
            ) : (
              <div></div>
            )}

            <Nav.Link as={Link} to="/favoriteshops" className="nav-link">
              <FavoriteBorderOutlinedIcon style={{ fontSize: 28 }} />
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" className="nav-link">
              <ShoppingCart size={28} />
            </Nav.Link>

            <li className="search-toggle-li menu-item wpex-menu-extra no-icon-margin">
              <Button
                href=""
                className="site-search-toggle search-header-replace-toggle"
                aria-controls="searchform-header-replace"
                variant="link"
                onClick={toggleSearch}
                aria-expanded={searchOpen}
                aria-label="Search"
              >
                <span className="link-inner">
                  <span
                    className={`wpex-menu-search-text ${searchOpen ? "" : "wpex-hidden"
                      }`}
                  ></span>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="wpex-menu-search-icon ticon ticon-search"
                    style={{ color: "#ffffff", fontSize: 20 }}
                  />
                </span>
              </Button>

              {searchOpen && (
                <Form
                  inline
                  className={`searchform wpex-relative open}`}
                  action=""
                  method="get"
                >
                  <InputGroup
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "80%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: "150px",
                    }}
                  >
                    <Form.Control
                      type="search"
                      className={`field open`}
                      name="s"
                      placeholder=" Search…"
                      autoComplete="off"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />

                    <CloseButton
                      onClick={closeSearch}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        zIndex: 2,
                        transform: "translateY(-50%)",
                      }}
                    />
                  </InputGroup>
                </Form>
              )}
            </li>
            {loggeduser ? (
            
                <Nav onClick={handleLogout}>Logout</Nav>
             
            ) : (
              <NavDropdown title={
                <div className="profile-icon">
                  <PermIdentityIcon sx={{ fontSize: 30 }} style={{ color: "#ffffff", margin: "3" }} />
                </div>
              }
              className="profile-nav">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
              </NavDropdown>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigationbar;
