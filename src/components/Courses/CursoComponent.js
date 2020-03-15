import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const courseStyle = { border: "1px solid red", textAlign: "left" };
const iconStyle = { fontSize: '2em' };

class CourseComponent extends Component {
  state = {};
  render() {
    return (
      <div
        className="row media col-12 mr-auto ml-auto mt-4"
        onClick={() => this.props.goToPage}
        style={courseStyle}
      >
        <div className="testBorder-g m-auto col-2">
          <FontAwesomeIcon icon={this.props.theIcon} style={iconStyle}></FontAwesomeIcon>
        </div>
        <div className="testBorder-g col-10">
          <h4>{this.props.theTitle}</h4>
          <div>{this.props.theText}</div>
        </div>
      </div>
    );
  }
}

export default CourseComponent;
