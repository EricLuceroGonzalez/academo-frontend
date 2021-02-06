import React from "react";
import { InlineMath, BlockMath } from "react-katex";

import "./ImageCard.css";
import "./CheckItems.css";

const CheckItems = (props) => {
  const generateCheck = () => {
    if (props.values.length === 0) {
      return <div>...</div>;
    } else {
      const checks = props.values.map((item, k) => {
        return (
          <div className="col-12 checkItem-option" key={k}>
            <label className="ml-2 rad">
              <input
                onClick={(e) => props.wasClick(e)}
                pts={props.pts}
                className="form-check-input"
                type="radio"
                name={props.questionName}
                id={props.answer}
                value={item.isEquation ? item.equation : item.text}
              ></input>
              <i></i>
              <span className="checkItem-option-box">
                {item.isEquation ? (
                  item.isInline ? (
                    <React.Fragment>
                      {item.text} <InlineMath math={`${item.equation}`} />{" "}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {item.text} <BlockMath math={`${item.equation}`} />{" "}
                    </React.Fragment>
                  )
                ) : (
                  item.text
                )}
              </span>
            </label>
          </div>
        );
      });
      return checks;
    }
  };
  return (
    <div className="checkBox col-12 col-sm-8 col-md-8 col-lg-6 ">
      <div className='col-12 topBar row d-flex'>
      <div className="number-box col-2 mr-auto">
      {props.numberQuestion}
    </div>
      <div className="point-box col-4 ml-auto align-items-middle">
        {props.pts > 1 ? `${props.pts} puntos` : `${props.pts} punto`}
      </div>
      </div>
  
      {!!props.image && (
        <div className="image-card-container">
          <div className="col-12">
            <img
              className="main-image"
              src={props.image}
              alt="A problem illustration of below text"
            />
          </div>
        </div>
      )}
      <div className="checkItem-question">
        {props.question}
      </div>
      <div
        className="ml-2 col-12 col-md-12 col-lg-10"
        style={{ textAlign: "left" }}
      >
        {generateCheck()}
      </div>
    </div>
  );
};

export default CheckItems;
// <div className="checkItem-option-box">
