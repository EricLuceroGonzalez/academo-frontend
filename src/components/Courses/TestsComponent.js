import React, { useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./Test.css";
import ShowTestDone from "../dashboard/showTestDone";
// import theApi from "../../api";

const TestsComponent = (props) => {
  // const [author, setAuthor] = useState();
  // const [testId, setTestId] = useState();
  const history = useHistory();
  useEffect(() => {
    moment.locale("es");
  }, []);

  const goTo = () => {
    history.push(`/${props.evaluation}/${props.theTitle}/${props.id}`);
  };
  return (
    <div
      className="mr-auto ml-auto mt-3"
      onClick={goTo}
      style={{
        boxShadow: "2px 3px 3px black",
        backgroundColor: "rgba(240, 240, 240, 0.95)",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div
        className="col-12 mr-auto"
        style={{
          backgroundColor: "rgba(116, 35, 153,0.95)",
          padding: '0px 40px',
          top: "0px",
        }}
      >
        <div className="row">
          <div className="mr-auto done">
            <ShowTestDone
              grade={props.testGrade}
              done={props.done}
            ></ShowTestDone>
          </div>
          <div className="ml-auto done">
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

        <div className="col-10">
          <h4 className="lightThing">{props.theTitle}</h4>
          <h6 className="lightThing">{props.theContent}</h6>
          <div className="checkOption mt-2" style={{ fontSize: "0.75em" }}>
            <p>{props.theText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

TestsComponent.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(TestsComponent);
