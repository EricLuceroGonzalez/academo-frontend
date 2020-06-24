import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";

// import { faHome, faRegistered, faTrademark } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import logo from "./media/logo01.png";
class FooterComponent extends Component {
  state = {};
  render() {
    return (
      <div
        className="col-12 p-2"
        style={{
          //   marginTop: "150px",
          height: '6%',
          color: "white",
          background:"rgba(75,20,90,0.97)",
          position: "fixed",
          bottom: "0px",
          fontSize: "0.5em",
          padding: '5px 2px',
          fontFamily: "Montserrat-Light"
        }}
      >
        creado para fines academicos
          por <span className="foot"><Link to='/' style={{color: 'white'}}>Eric Lucero G. {" "}</Link>
          <FontAwesomeIcon icon={faCodeBranch}></FontAwesomeIcon>
          </span>
        <div>contacto: ericlucero501@gmail.com</div>
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
