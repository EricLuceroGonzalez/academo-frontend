import React from "react";
import { InlineMath, BlockMath } from "react-katex";

const CheckItems = (props) => {
  const generateCheck = () => {
    if (props.values.length === 0) {
      return <div>...</div>;
    } else {
      const checks = props.values.map((item, k) => {
        return (
          <div className="checkOption" key={k}>
            <input
              onClick={(e) => props.wasClick(e)}
              pts={props.pts}
              className="form-check-input"
              type="radio"
              name={props.questionName}
              id={props.answer}
              value={item.isEquation ? item.equation : item.text}
            ></input>
            <div
              style={{
                margin: "3px 1px",
                borderRadius: "12px",
                border: "1px solid rgba(100,100,100,0.2)",
                padding: "3px 2px",
              }}
            >
              <label className="ml-2 form-check-label" htmlFor="inlineRadio2">
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
              </label>
            </div>
          </div>
        );
      });
      return checks;
    }
  };

  return (
    <div className="checkBox col-12 col-sm-10 col-lg-6 col-md-10">
      <div className="pts col-3 ml-auto p-1">
        {props.value > 1 ? `${props.value} puntos` : `${props.value} punto`}
      </div>
      <div className="checkQuestion">
        <span className="theNumber">{props.numberQuestion}</span>
        {") "}
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
