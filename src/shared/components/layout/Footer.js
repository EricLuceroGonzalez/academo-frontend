import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";

import "./Footer.css";

class FooterComponent extends Component {
  state = {};
  render() {
    return (
      <div className="col-12 d-flex footer-basic">
        <div className="col-6 col-md-5 footer-brand mr-auto d-flex align-items-center">
          <span role="img" aria-label="star-dust">
            🚀 {" "}
          </span>
          Academo<span className="footerAltText">.xyz</span>
        </div>
        <div className="col-6 col-md-7 footerTextB">
          creado por{" "}
          <a
            href="mailto: ericlucero501@gmail.com"
            alt="a mail button to ericlucero501@gmail.com"
          >
            Eric Lucero G. {"  "}
          </a>
        </div>
      </div>
    );
  }
}

export default FooterComponent;

//
// #8f3985
// #b6a39e
// #efd9ce
// #470ff4
