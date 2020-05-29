import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
  import { InlineMath, BlockMath } from "react-katex";

class About extends Component {
  state = {};
  render() {
    return (
      <div
        className="mr-auto ml-auto col-lg-8 col-md-10 col-12"
        style={{
          height: "100vh",
          width: "100vw",
          margin: "0px auto 1px auto",
          padding: "75px 0px 50px 0px",
        }}
      >
        <div className="col-10 col-md-8 mr-auto ml-auto lightThing">
          <div className="mb-5">
            <span className="navThing">Academo</span> es un sitio que lleva la
            educación virtual de manera personalizada.
          </div>
          Sitio creado y desarrollado para uso público.
          <FontAwesomeIcon
            style={{ color: "red" }}
            className="shakeThatLittleThing"
            icon={faHeart}
          ></FontAwesomeIcon>
        </div>
        <Link to="/dashboard">
          <div
            className="col-4 mr-auto ml-auto"
            style={{
              fontFamily: "Montserrat-ExtraBold",
              color: "white",
              backgroundColor: "rgb(116, 35, 153)",
              marginTop: "55px",
              padding: "7px 12px",
              boxShadow: "2px 2px 3px black",
            }}
          >
            Cursos
          </div>
        </Link>
      </div>
    );
  }
}

export default About;
