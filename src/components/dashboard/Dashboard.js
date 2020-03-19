import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div
        style={{
          marginTop: "56px",
          paddingTop: "60px",
          paddingBottom: "30px",
          height: "100%"
        }}
        className="container valign-wrapper"
      >
        <div className="row">
          <div className="col-12 col-lg-6 col-md-8 col-sm-10 center-align mr-auto ml-auto">
            <h4>
              <b>Hola,</b> {user.name.split(" ")[0]}{" "}
              <span role="img" aria-label="face-mask">
                {" "}
                😷
              </span>
              <p className="flow-text grey-text text-darken-1">
                Tu sesión está abierta.{" "}
              </p>
              <div style={{ fontSize: "0.55em", marginTop: "80%" }}>
                <span style={{ fontFamily: "monospace" }}>
                  {" "}
                  Tienes 60 minutos{" "}
                </span>
                para terminar los deberes. Recuerda lavarte las manos.👏
              </div>
            </h4>
            <button
              style={{
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large nextBtn col-10"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
