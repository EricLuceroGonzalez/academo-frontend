import React from "react";

import "./MiniSpinner.css";

const MiniSpinner = () => {
  return (
    // <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
    <span className="mini-lds-dual-ring  mr-auto ml-auto"></span>
    // <p></p>
    // </div>
  );
};

export default MiniSpinner;
