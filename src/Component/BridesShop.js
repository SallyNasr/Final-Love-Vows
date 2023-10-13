import React from "react";
import "./BridesShop.css";
import { Link } from "react-router-dom";

const BridesShops = () => {
  const Brideshops = [
    {
      id: 1,
      title: "Dresses",
      description: "Find the perfect dress for your special day",
      image: require("../images/weddingDress.jpg"),
    },
    {
      id: 2,
      title: "Heels",
      description:
        "Step into your happily ever after with our elegant bridal heels.",
      image: require("../images/weddingHeal.jpg"),
    },
    {
      id: 3,
      title: "Bouquet",
      description:
        "Complete your bridal look with our exquisite bridal bouquets.",
      image: require("../images/wddingBouquet.jpg"),
    },
    {
      id: 4,
      title: "Accessories",
      description: "Explore our collection of bridal accessories.",
      image: require("../images/weddingAccessories.jpg"),
    },
    {
      id: 5,
      title: "Hair & Makeup Salon",
      description: "Elevate your style with our stunning handbags.",
      image: require("../images/weddingHair.jpg"),
    },
    {
      id: 6,
      title: "Nails",
      description: "Nail care for a polished look.",
      image: require("../images/weddingNail.jpg"),
    },
  ];

  return (
    <div className="brides-shops">
      <div className="bride-intro">
        <h3 className="titleOfText">Welcome to Our Bride Shop</h3>
        <hr />
        <p>
          At Love & Vows, we understand that every bride is unique and deserves
          to shine on her special day. That's why we've curated an exquisite
          collection of bridal essentials to make your wedding dreams come true.
          From the perfect wedding dress that will take your breath away to the
          finishing touches that add elegance and grace, we have everything you
          need to look and feel your absolute best.
        </p>
      </div>
      <div className="row bride-rows">
        {Brideshops.map((shop) => (
          <div key={shop.id} className="col-md-4">
            <Link
              to={`/${shop.title.toLowerCase()}`}
              className="brides-link-page"
            >
              <div className="card">
                <img
                  src={shop.image}
                  className="card-img-top"
                  alt={shop.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{shop.title}</h5>
                  <p className="card-text">{shop.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BridesShops;
