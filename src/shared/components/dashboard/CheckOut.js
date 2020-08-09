import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";
// import LoadingSpinner from "../UIElements/LoadingSpinner";

const CheckOut = (props) => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };

  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState();
  // const history = useHistory();

  useEffect(() => {
    props.auth.isAuthenticated ? setIsLogged(true) : setIsLogged(false);
    props.auth.isAuthenticated
      ? setUserName(props.auth.user.name.firstName)
      : setUserName();
  }, [props]);

  return (
    <React.Fragment>
      <div
        style={{
          height: "89vh",
          width: "99vw",
        }}
        // className="container"
      >
        <div className="mb-5">
          <div className="col-12 col-lg-6 col-md-8 col-sm-10 center-align mr-auto ml-auto">
            <div className="shakeThatThing">
              <span
                role="img"
                aria-label="star-dust"
                style={{ fontSize: "6em" }}
              >
                {" "}
                🚀
              </span>
            </div>
            <h4>
              <b className="navThing">Gracias,</b> {userName}
              <span role="img" aria-label="thumb-up">
                {" "}
                👍
              </span>
              <p
                className="flow-text grey-text text-darken-1"
                style={{ fontSize: "0.6em" }}
              >
                Lo que llenaste ha sido enviado.{" "}
              </p>
              <p
                className="flow-text grey-text text-darken-1"
                style={{ fontSize: "0.6em" }}
              >
                Revisa tu correo.{" "}
              </p>
            </h4>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-md-6 col-sm-8 mr-auto ml-auto mt-5">
          <button
            style={{
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "10rem",
            }}
            onClick={onLogoutClick}
            className="btn btn-large nextBtn col-10"
          >
            Salir
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckOut;
