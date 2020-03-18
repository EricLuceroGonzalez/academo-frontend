import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const courseStyle = {
  textAlign: "left",
  padding: '10px 0px',
  boxShadow: "2px 3px 3px black",
  backgroundColor: "rgba(240, 240, 240, 0.85)"
};
// const iconStyle = { fontSize: "1em" };

class TallerComponent extends Component {
  state = {};
  render() {
    return (
      <div
        className="row media col-10 col-md-6 col-lg-4 mr-auto ml-auto mt-4"
        // onClick={this.props.onClick}
        onClick={() => this.props.handleClick(this.props.id)}
        style={courseStyle}
      >
        <div className="m-auto col-2 shakeThatThing">
        <span
          role="img"
          aria-label="star-dust"
          style={{ fontSize: "2em" }}
        >
          {" "}
          🚀
        </span>
      </div>

        <div className="col-10">
          <h4 className='lightThing'>{this.props.theTitle}</h4>
          <div className='checkOption mt-2 col-10'>{this.props.theText}</div>
        </div>
      </div>
    );
  }
}

export default TallerComponent;
