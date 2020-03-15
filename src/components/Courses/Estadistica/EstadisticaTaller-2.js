import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from ".././../../actions/authActions";

class Taller2 extends Component {
  state = {};
  render() {
    const { user } = this.props.auth;
    return <div>Taller2
    <b>Hey there,</b> {user.name.split(" ")[0]}
    </div>;
  }
}

Taller2.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(mapStateToProps, { logoutUser })(Taller2);
