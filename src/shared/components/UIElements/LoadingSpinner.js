import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
    <div className="lds-dual-ring  mr-auto ml-auto"></div>
    </div>
  );
};

export default LoadingSpinner;
