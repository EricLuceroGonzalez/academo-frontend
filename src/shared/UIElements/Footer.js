import React from "react";

import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="col-12 footer-bar d-flex">
      <div className="col-6  col-sm-3">
        <a
          style={{ textDecoration: "none", color: "white" }}
          href={"https://www.instagram.com/infinitesuppliessa/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            style={{ marginRight: "8px", color: "#06d6a2" }}
          />
          infinitesupplies<span className='theLightBlue-b'>sa</span>
        </a>
      </div>
      <div
        className="col-6 col-sm-3 hoverLink"
        onClick={() => {
          window.location.href = "tel:(+507) 6291-7954";
        }}
      >
        <FontAwesomeIcon
          icon={faPhoneAlt}
          className='iconVibrate'
          style={{ color: "rgb(19, 245, 113)", marginRight: "8px" }}
        />
        (+507) 6291-7954
      </div>
      <div className="col-6  col-sm-3">
        <FontAwesomeIcon
          icon={faPhoneAlt}
          style={{ color: "rgb(19, 245, 113)", marginRight: "8px" }}
        />
        (+507) 382- 8846/47
      </div>
      <div className="col-12 col-sm-3">
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: "rgb(236, 27, 12)", marginRight: "0px" }}
        />
      {" "}
        Infinite Supplies, S.A.
      </div>
    </div>
  );
};

export default Footer;

//
// #8f3985
// #b6a39e
// #efd9ce
// #470ff4
