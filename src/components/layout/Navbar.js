// import React, { Component } from "react";
import React, { useState } from "react";
import { NavLink as NabLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className='mb-2'>
      <Navbar color="light" light expand="md" fixed="top">
        <NabLink
          className="navThing"
          exact
          to={"/"}
          activeClassName="activeNavLink"
        >
          Academo
        </NabLink>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NabLink
              className="navThing"
              activeClassName="activeNavLink"
              to="/courses"
            >
              Cursos
            </NabLink>
            <NabLink
              className="navThing"
              activeClassName="activeNavLink"
              to="/about"
            >
              about
            </NabLink>
          </Nav>
          <NabLink
            className="navThing"
            to={"/register"}
            activeClassName="activeNavLink"
          >
            <span className="border border-success p-2">registro</span>
          </NabLink>
          <NabLink
            className="navThing"
            to={"/login"}
            activeClassName="activeNavLink"
          >
            <span className="border border-info p-2">login </span>
          </NabLink>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
// NavBar.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   auth: state.auth
// });
// export default connect(mapStateToProps, { logoutUser })(NavBar);
