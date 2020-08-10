import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "./Footer.css";

class FooterComponent extends Component {
  state = {};
  render() {
    return (
      <div className="col-12 footer-basic">
        <div className="row d-flex">
          <div className="col-6 col-md-6 footer-brand mr-auto">
          <span role="img" aria-label="star-dust">
          {" "}
          🚀
        </span>Academo.xyz</div>
          <div className="col-6 col-md-6">  
            creado para fines académicos por{" "}
            <Link to="/">Eric Lucero G. {"  "}</Link>
            <FontAwesomeIcon
              className="footer-icon"
              icon={faCodeBranch}
            ></FontAwesomeIcon>
          </div>
          {/**
          <div className='col-12 col-md-4'>
          <a
            href="mailto: ericlucero501@gmail.com"
            alt="a mail button to ericlucero501@gmail.com"
          >
            ericlucero501@gmail.com
          </a>
          <FontAwesomeIcon className='footer-icon ml-1' icon={faEnvelope} />
        </div>
 */}
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
