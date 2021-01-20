// import React, { Component } from "react";
import React, { useState, useContext } from "react";
import { NavLink as NabLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler } from "reactstrap";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/auth-context";

const NavBar = () => {
  const auth = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

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
        >
          <img
            src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1599179407/Academo/Identidy/academoLogoC_oxeawu.png"
            alt="academo logo is an A in a circle with an arrow"
            className='navbarLogo'
          ></img>
        </NabLink>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {auth.userId === "5ee903459cd388000465c5a7" ? (
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
            <React.Fragment
              <NabLink
                className="ml-auto navThing link-text user-text"
                to={"/dashboard"}
                activeClassName="activeNavLink"
              >
                <span className="blogoutUser order-success p-1">Mi cuenta</span>
              </NabLink>
              <NabLink
                className="navThing link-text user-text"
                to={"/dashboard"}
                activeClassName="activeNavLink"
              >
                <span className="nav-username order-success p-1">
                  {auth.userName}
                </span>
              </NabLink>
              {/**
                <div
                className="navThing link-text exit-text"
                onClick={auth.logout}
              >
                <span>salir </span>
                <FontAwesomeIcon icon={faSignInAlt} />
              </div>
               */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/**
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
             */}
              <NabLink
                className="ml-auto navThing link-text"
                to={"/login"}
                activeClassName="activeNavLink"
              >
                <span className="blogoutUser order-success p-1">
                  Iniciar sesión
                </span>
                <FontAwesomeIcon className="icon-color" icon={faSignInAlt} />
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
