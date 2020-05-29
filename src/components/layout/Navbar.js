// import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import { useHistory, NavLink as NabLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser, logoutUser } from "../../actions/authActions";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggle = () => setIsOpen(!isOpen);
  
  const logoutCourse = () => {
    props.logoutUser();
    history.push('/')
  };
  
  return (
    <div className="mb-2">
      <Navbar color="light" light expand="sm" fixed="top">
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
              to="/dashboard"
            >
              Cursos
            </NabLink>
          </Nav>
          {isLogged ? (
            <React.Fragment>
              <NabLink
                className="navThing"
                to={"/register"}
                activeClassName="activeNavLink"
              >
                <span className="border blogoutUser order-success p-1">
                  {userName}
                </span>
              </NabLink>
              <NabLink
                className="navThing"
                onClick={logoutCourse}
                activeClassName="activeNavLink"
                to={"/"}
              >
                <span className="border border-info p-1">salir </span>
              </NabLink>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NabLink
                className="navThing"
                to={"/register"}
                activeClassName="activeNavLink"
              >
                <span className="border blogoutUser order-success p-1">
                  registro
                </span>
              </NabLink>
              <NabLink
                className="navThing"
                to={"/login"}
                activeClassName="activeNavLink"
              >
                <span className="border border-info p-1">login </span>
              </NabLink>
            </React.Fragment>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

// export default NavBar;
NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { setCurrentUser, logoutUser })(NavBar);
//
