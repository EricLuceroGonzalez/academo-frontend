import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomeComponent extends Component {
  state = {};
  render() {
    return (
      <div
        className="mr-auto ml-auto col-lg-8 col-md-10 col-12"
        style={{ marginTop: "6em" }}
      >
        <Link to={"/resources/a"}>
          <div>aabbbbbCC</div>
        </Link>
      </div>
    );
  }
}

export default HomeComponent;
