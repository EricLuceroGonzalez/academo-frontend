// import React, { Component } from "react";
import React, { useState, useEffect, useContext } from "react";
import { useHistory, NavLink as NabLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
import { useAuth } from "../../hooks/auth-hook";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/auth-context";

const NavBar = (props) => {
  const auth = useContext(AuthContext);
  const { token, login, logout, userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState();
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

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

          {auth.isLoggedIn ? (
            <React.Fragment>
              <NabLink
                className="ml-auto navThing link-text user-text"
                to={"/dashboard"}
                activeClassName="activeNavLink"
              >
                <span className="blogoutUser order-success p-1">
                  Mi cuenta
                </span>
              </NabLink>
              <NabLink
                className="navThing link-text user-text"
                to={"/notas"}
                activeClassName="activeNavLink"
              >
                <span className="nav-username order-success p-1">
                  {auth.userName}
                </span>
              </NabLink>
              <div
                className="navThing link-text exit-text"
                onClick={auth.logout}
              >
                <span>salir </span>
                <FontAwesomeIcon icon={faSignInAlt} />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
            <NabLink
            className="ml-auto navThing link-text"
            to={"/login"}
            activeClassName="activeNavLink"
          >
          <FontAwesomeIcon className='icon-color' icon={faQuestionCircle} />
            <span className="blogoutUser order-success p-1">
            ¿Qué es Academo?
            </span>
          </NabLink>
              <NabLink
                className="navThing link-text"
                to={"/login"}
                activeClassName="activeNavLink"
              >
                <FontAwesomeIcon className='icon-color' icon={faSignInAlt} />
                <span className="blogoutUser order-success p-1">
                  Iniciar sesión
                </span>
              </NabLink>
            </React.Fragment>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
//
