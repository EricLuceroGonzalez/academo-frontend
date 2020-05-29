import React, { Component } from "react";
import { InlineMath } from "react-katex";
// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
//   htmlparser2,
// } from "react-html-parser";

class CheckItems extends Component {
  state = {
    answ: this.props.answer,
  };

  generateCheck = () => {
    if (this.props.values.length === 0) {
      return <div>...</div>;
    } else {
      const checks = this.props.values.map((item, k) => {
        return (
          <div className="form-check form-check-inline checkOption" key={k}>
            <input
              onClick={(e) => this.props.wasClick(e)}
              pts={this.props.pts}
              className="form-check-input"
              type="radio"
              name={this.props.questionName}
              id={this.props.answer}
              value={item.isEquation ? item.equation : item.text}
            ></input>
            <label className="form-check-label" htmlFor="inlineRadio2">
              {item.isEquation ? (
                <React.Fragment>
                  {item.text} <InlineMath math={`${item.equation}`} />{" "}
                </React.Fragment>
              ) : (
                item.text
              )}
            </label>
          </div>
        );
      });
      return checks;
    }
  };
  render() {
    return (
      <div className="checkBox col-12 col-sm-8 col-lg-6 col-md-6">
        <p className="checkQuestion">
          <span className="theNumber">{this.props.numberQuestion}</span>
          {") "}
          {this.props.question} 
          {this.props.contents}
        </p>
        <div
          className=" col-lg-6 col-10 col-md-8"
          style={{ textAlign: "left" }}
        >
          {this.generateCheck()}
        </div>
      </div>
    );
  }
}

export default CheckItems;
