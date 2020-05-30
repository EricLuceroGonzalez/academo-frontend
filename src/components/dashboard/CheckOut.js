import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
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
    props.auth.isAuthenticated
      ? console.log(props.auth.user)
      : console.log("--");
  }, [props]);

  return (
    <React.Fragment>
      <div
        style={{
          marginTop: "56px",
          paddingTop: "60px",
          paddingBottom: "60px",
          height: "99vh",
          width: "100vw",
        }}
        className="container valign-wrapper"
      >
        <div className="row">
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
              <p className="flow-text grey-text text-darken-1">
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
      </div>
      <div className="col-12 col-lg-6 col-md-8 col-sm-10 center-align mr-auto ml-auto">
        <button
          style={{
            borderRadius: "3px",
            letterSpacing: "1.5px",
            // marginTop: "1rem",
            bottom: "160px",
          }}
          onClick={onLogoutClick}
          className="btn btn-large nextBtn col-10"
        >
          Salir
        </button>
      </div>
    </React.Fragment>
  );
};
CheckOut.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(CheckOut);
