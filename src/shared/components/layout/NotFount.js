import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  // state = {};
  return (
    <div
      className="mr-auto ml-auto col-12 col-lg-8 col-md-10"
      style={{
        height: "80vh"
      }}
    >
      <div className="col-10 col-md-8 mr-auto ml-auto lightThing">
        <div className="shakeThatThing mb-4">
          <div style={{ fontSize: "5em" }}>404</div>
          <div>
            <span role="img" aria-label="star-dust" style={{ fontSize: "5em" }}>
              🐉
            </span>
            <div className="navThing"> Dirección no encontrada</div>
          </div>
        </div>
        <div className="mt-5 p-0">
          <span className="navThing">Academo</span> es un sitio que lleva la
          educación virtual de manera personalizada.
          <div>
            Sitio creado y desarrollado para uso público.
            <FontAwesomeIcon
              style={{ color: "red" }}
              className="shakeThatLittleThing"
              icon={faHeart}
            ></FontAwesomeIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
