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
  }, [props]);

  const onLogoutClick = (e) => {
    e.preventDefault();
    history.push("/dashboard");
  };

  return (
    <React.Fragment>
      <div
        style={{
          height: "89vh",
          width: "99vw",
        }}
      >
        <div>
          <div className="col-12 col-lg-6 col-md-8 col-sm-10 center-align mr-auto ml-auto mb-5">
            <div className="shakeThatThing">
              <span
                role="img"
                aria-label="disappointed_relieved"
                style={{ fontSize: "6em" }}
              >
                {" "}
                😥
              </span>
            </div>
            <div>
              <b className="navThing">Lo sentimos,</b> {userName}
              <p className="flow-text grey-text text-darken-1">
                Hay un error, vuelve a hacer la prueba.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-10 col-md-4 mr-auto ml-auto mt-5">
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
