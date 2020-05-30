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
          <div className="checkOption" key={k}>
            <input
              onClick={(e) => this.props.wasClick(e)}
              pts={this.props.pts}
              className="form-check-input"
              type="radio"
              name={this.props.questionName}
              id={this.props.answer}
              value={item.isEquation ? item.equation : item.text}
            ></input>
            <div
              style={{
                margin: "3px 1px",
                border: "1px solid rgba(100,100,100,0.1)",
                padding: "3px 2px",
              }}
            >
              <label className="ml-2 form-check-label" htmlFor="inlineRadio2">
                {item.isEquation ? (
                  <React.Fragment>
                    {item.text} <InlineMath math={`${item.equation}`} />{" "}
                  </React.Fragment>
                ) : (
                  item.text
                )}
              </label>
            </div>
          </div>
        );
      });
      return checks;
    }
  };
  render() {
    return (
      <div className="checkBox col-12 col-sm-10 col-lg-6 col-md-10">
        <p className="checkQuestion">
          <span className="theNumber">{this.props.numberQuestion}</span>
          {") "}
          {this.props.question}
        </p>
        <div
          className="ml-2 col-12 col-md-12 col-lg-10"
          style={{ textAlign: "left" }}
        >
          {this.generateCheck()}
        </div>
      </div>
    );
  }
}

export default CheckItems;
