import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

class About extends Component {
  state = {};
  render() {
    return (
      <div
        className="mr-auto ml-auto col-lg-8 col-md-10 col-12"
        style={{
          height: "100vh",
          margin: "0px auto 35px auto",
          padding: "33% 0px 50px 0px"
        }}
      >
        <Link to={"/resources/a"}>
          <div className="col-10 col-md-8 mr-auto ml-auto lightThing">
            <div className='mb-5'>
              <span className="navThing">Academo</span> es un sitio que lleva la
              educación virtual de manera personalizada.
            </div>
            Sitio creado y desarrollado para uso
            público.
            <FontAwesomeIcon
              style={{ color: "red" }}
              className="shakeThatLittleThing"
              icon={faHeart}
            ></FontAwesomeIcon>
          </div>
        </Link>
      </div>
    );
  }
}

export default About;
