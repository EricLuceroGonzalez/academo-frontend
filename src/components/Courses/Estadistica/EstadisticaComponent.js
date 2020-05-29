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
      <div
        style={{
          height: "100vh",
          margin: "0px auto 35px auto",
          padding: "65px 0px 50px 0px"
        }}
      >
        <h3 className='navThing'>Estadística</h3>
        <TallerComponent
          handleClick={this.handleClicks}
          id={"taller1"}
          theIcon={faDiceOne}
          theTitle={"Examen Parcial "}
          theText={"Contesta las siguientes preguntas correctamente. Los puntos acumulados en esta prueba sumaran una nota parcial."}
        ></TallerComponent>
                  <TallerComponent
          id={"taller3"}
          handleClick={this.handleClicks}
          theIcon={faDiceOne}
          theTitle={"Taller 2"}
          theText={"Contesta las siguientes preguntas correctamente. Los puntos acumulados en esta prueba sumaran una nota parcial."}
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
