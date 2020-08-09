import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import "moment/locale/es";
import { Spinner } from "reactstrap";
import { AuthContext } from "../../context/auth-context";
import TestsComponent from "../Courses/TestsComponent";
import "./Course.css";

const CourseDashboard = (props) => {
  const auth = useContext(AuthContext);
  const [author, setAuthor] = useState();
  const [time, setTime] = useState();
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);
  const [userTests, setUserTests] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    moment.locale("es");
    const getData = async () => {
      try {
        //   const theData = await theApi.getCourseDash(props.auth.user.id);
        //   setCourses(theData.data.allTests.courseName);
        //   setTests(theData.data.allTests.tests);
        //   setUserTests(theData.data.usrTests);
        //   setIsLoading(false)
      } catch (err) {
        console.log(`Error at get: ${err}`);
      }
    };
    // getData();
  }, []);

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("dddd, MMMM DD YYYY, h:mm:ss a"));
    }, 1000);
  }, []);

  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };

  const renderDashboard = () => {
    if (courses.length === 0) {
      return (
        <div>
          <Spinner
            style={{
              margin: "35% 35%",
              width: "4rem",
              height: "4rem",
              color: "rgb(106, 35, 153)",
            }}
            type="grow"
          />
        </div>
      );
    } else {
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
    }
  };

  return (
    <React.Fragment>
      {!isLoading ? (
        <div className="mr-auto ml-auto navThing">{courses}</div>
      ) : (
        <Spinner size="sm" color="primary" />
      )}

      <div className={isLoading ? "loading" : "loaded"}>
        <div className="container">
          <div className="row">
            <div className="col-11 col-lg-8 col-md-8 col-sm-10 center-align mr-auto ml-auto">
              <div
                style={{
                  color: "gray",
                  fontFamily: "monospace",
                  textAlign: "center",
                  fontSize: "0.75em",
                }}
              >
                <p>{time}</p>
              </div>
              <h4>
                {!auth.userName ? (
                  <Spinner size="sm" color="primary" />
                ) : (
                  <span className="navThing">{auth.userName}</span>
                )}
                <span role="img" aria-label="star-dust">
                  🚀
                </span>
              </h4>
              <div>{renderDashboard()}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8 col-md-8 col-sm-10 center-align mr-auto ml-auto">
          <button
            style={{
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
              // bottom: "50px",
            }}
            onClick={onLogoutClick}
            className="btn btn-large nextBtn col-10"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CourseDashboard;
