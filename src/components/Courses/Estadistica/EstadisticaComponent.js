import React, { Component } from "react";
import TallerComponent from "./EstadisticaTalleres";
import { faDiceOne } from "@fortawesome/free-solid-svg-icons";

class StatisticsComponent extends Component {
  state = {};

  handleClicks = aa => {
    this.props.history.push({
      pathname: `${this.props.location.pathname}/${aa}`
    });
  };

  render() {
    return (
      <div>
        <h3>Statistics</h3>
        <TallerComponent
          handleClick={this.handleClicks}
          id={"taller1"}
          theIcon={faDiceOne}
          theTitle={"Taller "}
          theText={"bbbbbbb"}
        ></TallerComponent>
        <TallerComponent
          id={"taller2"}
          handleClick={this.handleClicks}
          theIcon={faDiceOne}
          theTitle={"Taller "}
          theText={"bbbbbbb"}
        ></TallerComponent>
        {/**
          <TallerComponent
          goTo={() => this.goToCompo("Taller1")}
          theIcon={faDiceOne}
          theTitle={"Taller "}
          theText={"bbbbbbb"}
        ></TallerComponent>
        <TallerComponent
          goTo={() => this.goToCompo("Taller1")}
          theIcon={faDiceOne}
          theTitle={"Taller "}
          theText={"bbbbbbb"}
        ></TallerComponent>
        <TallerComponent
          goTo={() => this.goToCompo("Taller1")}
          theIcon={faDiceOne}
          theTitle={"Taller "}
          theText={"bbbbbbb"}
        ></TallerComponent>
 */}
      </div>
    );
  }
}

export default StatisticsComponent;
