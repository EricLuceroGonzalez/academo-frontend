import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class CheckOut extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div
        style={{ marginTop: "56px", paddingTop: "60px",paddingBottom: "60px", height: "100%" }}
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
              <b className='navThing'>Gracias,</b> {user.name.split(" ")[0]}{" "}
              <span role="img" aria-label="face-mask">
                {" "}
                😷
              </span>
              <p className="flow-text grey-text text-darken-1">
                Lo que llenaste ha sido enviado.{" "}
              </p>
              <div style={{ fontSize: "0.85em", marginTop: "80%" }}
              className='navThing'>
                {" "}
                Recuerda lavarte las manos.👏
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
              Salir
            </button>
          </div>
        </div>
      </div>
    );
  }
}
CheckOut.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(CheckOut);
