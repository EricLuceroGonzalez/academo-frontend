import React, { useState, useEffect } from "react";

const ShowTestDone = (props) => {
  const [isDone, setIsDone] = useState(false);
  const [grade, setGrade] = useState();

  useEffect(() => {
    setGrade(props.grade);
    setIsDone(props.done);
  }, [props]);

  return (
    <React.Fragment>
      <span className={`dot ${isDone ? "dot-ok" : "dot-no"}`}></span>
      <span className='testDone-grade'>{!isDone ? " " : `Nota:  ${grade}`}</span>
    </React.Fragment>
  );
};

export default ShowTestDone;
