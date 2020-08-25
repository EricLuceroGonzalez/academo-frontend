import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../UIElements/ErrorModal";
import MiniSpinner from "../../UIElements/MiniSpinner";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import Button from "../../UIElements/Button";
import TestsComponent from "../Courses/TestsComponent";
import TimeClock from "../../UIElements/Time-Clock";
import "./Course.css";
const CourseDashboard = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [courses, setCourses] = useState("");
  const [tests, setTests] = useState([]);
  const [userTests, setUserTests] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const theData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/course/coursesDashboard/${auth.userId}`,
          "GET"
        );
console.log(theData);

        setUserTests(theData.userExistingTests);
        setTests(theData.allTests.tests);
        setCourses(theData.allTests.courseName);
      } catch (err) {
        console.log(err);
      }
    };
    if (isMounted) {
      getData();
    }
    return () => {
      setUserTests([]);
      setIsMounted(false);
    };
  }, [isMounted, sendRequest, auth.userId, error]);

  const renderDashboard = () => {
    let a = tests.map((test, k) => {
      if (userTests) {
        let testEq = userTests.filter((user, k) => user.testId === test._id);
        if (testEq[0]) {
          return (
            <TestsComponent
              key={k}
              id={test._id}
              done={true}
              testGrade={testEq[0].grd}
              evaluation={test.evaluation}
              theTitle={test.testName}
              theText={test.description}
              theContent={test.contents}
              uploadDate={test.uploadDate}
            ></TestsComponent>
          );
        } else {
          return (
            <TestsComponent
              key={k}
              id={test._id}
              done={false}
              testGrade={""}
              evaluation={test.evaluation}
              theTitle={test.testName}
              theText={test.description}
              theContent={test.contents}
              uploadDate={test.uploadDate}
            ></TestsComponent>
          );
        }
      }
      return null;
    });
    return a;
  };

  const errorHandler = () => {
    clearError();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="col-12 loaded">
        {!isLoading && (
          <div className="mr-auto ml-auto">
            <h4 className="course-name">{courses}</h4>
          </div>
        )}
        <div className="col-10 col-md-8 col-lg-6 mr-auto ml-auto">
          <TimeClock />
          <div className="mt-5">
            <h4 className="test-username">
              {!auth.userName ? (
                <MiniSpinner size="sm" color="primary" />
              ) : (
                auth.userName
              )}
              <span role="img" aria-label="star-dust">
                {" "}
                🚀
              </span>
            </h4>
          </div>
          <div>{renderDashboard()}</div>
        </div>
        <div className="button-box">
          <Button onClick={() => history.push("/dashboard")}
          size={'small'}>
            <FontAwesomeIcon icon={faUndoAlt} /> Regresar
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CourseDashboard;
