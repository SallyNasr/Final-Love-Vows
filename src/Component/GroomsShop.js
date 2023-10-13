import React from "react";
import { Link } from "react-router-dom";
import "./GroomsShop.css";

const GroomShops = () => {
  const Groomshops = [
    {
      id: 7,
      title: "Outfit",
      description: "Choose the perfect outfit for your wedding.",
      image: require("../images/GroomOutfit.jpg"),
    },
    {
      id: 8,
      title: "Watch",
      description: "Explore our collection of bridal accessories.",
      image: require("../images/GroomWatch.jpg"),
    },
    {
      id: 9,
      title: "Hair & Beard",
      description: "Get a stylish haircut for your big day.",
      image: require("../images/GroomHair.jpg"),
    },
  ];

  return (
    <div className="groom-shops">
      <div className="groom-intro">
        <h3 className="titleOfText">Welcome to our Groom Shop</h3>
        <hr />
        <p>
          At Love & Vows, we understand that the groom deserves to look and feel
          his best on the big day. That's why we've curated a carefully selected
          collection of essentials to make sure every groom is impeccably
          dressed and groomed from head to toe.
        </p>
      </div>
      <div className="row groom-rows">
        {Groomshops.map((shop) => (
          <div key={shop.id} className="col-md-4">
            <Link
              to={`/${shop.title.toLowerCase()}`}
              className="grooms-link-page"
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

export default GroomShops;
