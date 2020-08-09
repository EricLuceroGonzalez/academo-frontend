import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
  if (props.floating) {
    return (
      <Link
        className={`button ${props.inverse && "button--inverse"} 
        ${props.floating && "button--float"}`}
        to={props.toBack}
      >
        {props.children}
      </Link>
    );
  }
  // If have href prop
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.whatsapp && "button--whatsapp"}`}
        href={props.href}
        disabled={props.disabled}
      >
        {props.children}
      </a>
    );
  }
  // If have to prop
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button ${props.animate} button--${props.size || "default"} ${
        props.inverse && "button--inverse"
      } ${props.danger && "button--danger"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
