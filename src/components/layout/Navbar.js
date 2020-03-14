// import React, { Component } from "react";
import React, { useState } from "react";
import { NavLink as NabLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, Button } from "reactstrap";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NabLink
          className="navThing"
          exact
          to={"/"}
          activeClassName="activeNavLink"
        >
          Home
        </NabLink>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NabLink
              className="navThing"
              activeClassName="activeNavLink"
              to="/landing"
            >
              Componentes!
            </NabLink>
            <NabLink
              className="navThing"
              activeClassName="activeNavLink"
              to="/materias"
            >
              thirdLink
            </NabLink>
          </Nav>
          <NabLink
            className="navThing"
            to={"/landing"}
            activeClassName="activeNavLink"
          >
            <Button outline color="primary">
              primary
            </Button>
          </NabLink>
          <NabLink to={"/landing"} activeClassName="activeNavLink">
            <Button outline color="warning">
              primary
            </Button>
          </NabLink>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
