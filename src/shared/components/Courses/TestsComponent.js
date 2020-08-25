import React, { useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import ShowTestDone from "../dashboard/showTestDone";
import "./Test-List.css";

const TestsComponent = (props) => {
  const history = useHistory();

  useEffect(() => {
    moment.locale("es");
  }, []);

  return (
    <div
      className="mr-auto ml-auto mt-3 test-box"
      onClick={() => {
        history.push(`/${props.evaluation}/${props.theTitle}/${props.id}`);
      }}
    >
      <div
        className="col-12 mr-auto border-top"
      >
        <div className="row">
          <div className="mr-auto done">
            <ShowTestDone
              grade={props.testGrade}
              done={props.done}
            ></ShowTestDone>
          </div>
          <div className="ml-auto done-date">
            {moment(props.uploadDate).startOf("hour").fromNow()}
          </div>
        </div>
      </div>
      <div className="row col-12 mr-auto ml-auto">
        <div className="m-auto col-2 shakeThatThing">
          <span
            role="img"
            aria-label="star-dust"
            style={{
              fontSize: "1.5em",
            }}
          >
            {" "}
            🚀
          </span>
        </div>

        <div className="col-10 ml-auto mr-auto">
          <h4 className="test-title">{props.theTitle}</h4>
          <h6 className="test-content">{props.theContent}</h6>
          <div className="checkOption mt-2">
            <p>{props.theText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsComponent;
