import React, { Component } from "react";
import TallerComponent from "../Estadistica/EstadisticaTalleres";
import {
  faDiceOne
} from "@fortawesome/free-solid-svg-icons";

class MathTwoComponent extends Component {
  state = {};
  
  goToCompo = e => {
    console.log("goToCompo");
    console.log(`qACheck: ${e}`);
    
    console.log(e.target);
    this.props.history.push({
      pathname: "/"
    });
  };

  render() {
    return (
      <div>
        <h3>MathTwo</h3>
        <div>
          <TallerComponent
            goTo={this.goToCompo('Taller1')}
            theIcon={faDiceOne}
            theTitle={"aa"}
            theText={"bbbbbbb"}
          ></TallerComponent>

          <TallerComponent
            goTo={this.goToCompo}
            theIcon={faDiceOne}
            theTitle={"aa"}
            theText={"bbbbbbb"}
          ></TallerComponent>
          <TallerComponent
          goTo={this.goToCompo}
          theIcon={faDiceOne}
          theTitle={"aa"}
          theText={"bbbbbbb"}
        ></TallerComponent>
        </div>
      </div>
    );
  }
}

export default MathTwoComponent;
