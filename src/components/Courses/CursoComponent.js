import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const courseStyle = {
  textAlign: "left",
  boxShadow: "2px 3px 3px black",
  backgroundColor: "rgb(240, 240, 240)"
};
const iconStyle = { fontSize: "2em" };

class CourseComponent extends Component {
  state = {};
  render() {
    return (
      <div
        className="row media col-12 mr-auto ml-auto mt-4 pt-3 pb-3"
        onClick={() => this.props.goToPage}
        style={courseStyle}
      >
        <div className="m-auto col-2">
          <FontAwesomeIcon
            icon={this.props.theIcon}
            style={iconStyle}
          ></FontAwesomeIcon>
        </div>
        <div className="col-10">
          <h4 className="navThing">{this.props.theTitle}</h4>
          <div>{this.props.theText}</div>
        </div>
      </div>
    );
  }
}

export default CourseComponent;
