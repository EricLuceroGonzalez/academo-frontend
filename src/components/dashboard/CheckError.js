import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const CheckError = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState();
  const history = useHistory();

  useEffect(() => {
    props.auth.isAuthenticated ? setIsLogged(true) : setIsLogged(false);
    props.auth.isAuthenticated
      ? setUserName(props.auth.user.name.firstName)
      : setUserName();
    props.auth.isAuthenticated
      ? console.log(props.auth.user)
      : console.log("--");
  }, [props]);

  const onLogoutClick = (e) => {
    e.preventDefault();
    props.history.push("/dashboard");
  };

  return (
    <React.Fragment>
    <div
      style={{
        marginTop: "56px",
        paddingTop: "60px",
        paddingBottom: "30px",
        height: "99vh",
        width: "100vw",
      }}
      className="container valign-wrapper"
    >
      <div className="row">
        <div className="col-12 col-lg-6 col-md-8 col-sm-10 center-align mr-auto ml-auto">
          <div className="shakeThatThing">
            <span role="img" aria-label="star-dust" style={{ fontSize: "6em" }}>
              {" "}
              ☹️
            </span>
          </div>
          <h4>
            <b className="navThing">Lo sentimos,</b> {userName}
            <p className="flow-text grey-text text-darken-1">
              Hay un error, vuelve a hacer la prueba.{" "}
            </p>
          </h4>
          <button
            style={{
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            onClick={onLogoutClick}
            className="btn btn-large nextBtn col-10"
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};
CheckError.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(CheckError);
