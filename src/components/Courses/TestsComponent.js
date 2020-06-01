import React from "react";
import { useHistory } from "react-router-dom";

const TestsComponent = (props) => {
  const history = useHistory();

  const goTo = () => {
    history.push(`/${props.evaluation}/${props.theTitle}/${props.id}`);
  };
  return (
    <div
      className="mr-auto ml-auto mt-3"
      onClick={goTo}
      style={{
        boxShadow: "2px 3px 3px black",
        backgroundColor: "rgba(240, 240, 240, 0.85)",
        cursor: "pointer",
      }}
    >
      <div
        className="col-12 mr-auto"
        style={{
          backgroundColor: "rgba(116, 35, 153,0.5)",
          top: "0px",
          border: "1px solid",
        }}
      >
        {props.state ? (
          <div className="mr-auto">
            <span role="img" aria-label="cross-mark">
              {" "}
              ✔️
            </span>
            hecho
          </div>
        ) : (
          <span role="img" aria-label="cross-mark">
            {" "}
            ❌
          </span>
        )}
      </div>
      <div className="row col-12 mr-auto ml-auto">
        <div className="m-auto col-2 shakeThatThing">
          <span role="img" aria-label="star-dust">
            {" "}
            🚀
          </span>
        </div>

        <div className="col-10">
          <h4 className="lightThing">{props.theTitle}</h4>
          <h6 className="lightThing">{props.theContent}</h6>
          <div className="checkOption mt-2"
          style={{fontSize: '0.75em'}}>
            <p>{props.theText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsComponent;
