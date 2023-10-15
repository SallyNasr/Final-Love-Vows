import React from "react";
import { Link } from "react-router-dom";
import "./CommonServices.css";
import image from ".././images/couple flower banner.jpg";
import SpaIcon from "@mui/icons-material/Spa";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";

const CommonServices = () => {
  const photo = [
    {
      id: 10,
      title: "Spa",
      description:
        "Indulge in relaxation and pampering with our spa services. Let us help you look and feel your best on your special day.",
      icon: <SpaIcon color="var(--button-color)" />,
    },
    {
      id: 11,
      title: "Photographers & Videographers",
      description:
        "Capture the magic of your wedding day with our expert photographers and videographers. We'll make sure every moment is beautifully preserved.",
      icon: <VideoCameraBackIcon color="var(--button-color)" />,
    },
  ];

  return (
    <div className="common-services">
      <div className="common-name">
        <h3 className="titleOfText">Classic Wedding Services</h3>
        <hr />
        {photo.map((service) => (
          <div key={service.id}>
            <Link
              to={`/${service.title.toLowerCase()}`}
              className="service-link-page"
            >
              <p>
                {service.title} {service.icon}
              </p>
            </Link>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
      <img
        src={image}
        alt="services-img"
        style={{
          position: "relative",
          left: "120px",
          width: "60%",
          height: "500px",
        }}
      />
    </div>
  );
};

export default CommonServices;
