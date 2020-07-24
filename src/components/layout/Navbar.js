// import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import { useHistory, NavLink as NabLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser, logoutUser } from "../../actions/authActions";
import "./Navbar.css";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const history = useHistory();

  useEffect(() => {
    props.auth.isAuthenticated ? setIsLogged(true) : setIsLogged(false);

    if (props.auth.isAuthenticated) {
      setUserName(props.auth.user.name.firstName);
    } else {
      setUserName("");
    }

    if (props.auth.isAuthenticated && props.auth.user.id === "5ee903459cd388000465c5a7") {
      console.log(`Hello: ${props.auth.user.name.firstName}`);

      setUserId(props.auth.user.id);
    }
  }, [props]);

  const toggle = () => setIsOpen(!isOpen);

  const logoutCourse = () => {
    props.logoutUser();
    history.push("/");
  };

  return (
    <div className="mb-2 pb-2">
      <Navbar
        color="light"
        light
        expand="xs"
        fixed="top"
        style={{ boxShadow: "2px 1px 2px black" }}
      >
        <NabLink
          className="navThing"
          exact
          to={"/"}
          activeClassName="activeNavLink"
        >
          <span role="img" aria-label="star-dust">
            {" "}
            🚀
          </span>
          Academo
        </NabLink>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NabLink
              className="navThing link-text"
              activeClassName="activeNavLink"
              to="/dashboard"
            >
              Cursos
            </NabLink>
          </Nav>
          {userId === "5ee903459cd388000465c5a7" ? (
            <NabLink
              className="navThing link-text user-text"
              to={"/getAllGrades"}
              activeClassName="activeNavLink"
            >
              <span className="blogoutUser order-success p-1">ver notas</span>
            </NabLink>
          ) : (
            ""
          )}

          {isLogged ? (
            <React.Fragment>
              <NabLink
                className="navThing link-text user-text"
                to={"/notas"}
                activeClassName="activeNavLink"
              >
                <span className="blogoutUser order-success p-1">
                  {userName.split(" ")[0]}
                </span>
              </NabLink>
              <div
                className="navThing link-text exit-text"
                onClick={logoutCourse}
                // activeClassName="activeNavLink"
                // to={"/"}
              >
                <span>salir </span>
                <span role="img" aria-label="star-dust">
                  🚀
                </span>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NabLink
                className="navThing link-text"
                to={"/register"}
                activeClassName="activeNavLink"
              >
                <span className="blogoutUser order-success p-1">registro</span>
              </NabLink>
              <NabLink
                className="navThing link-text"
                to={"/login"}
                activeClassName="activeNavLink"
              >
                <span className="p-1">login </span>
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
