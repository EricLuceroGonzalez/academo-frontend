import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import theApi from "../../api";
import TestsComponent from "../Courses/TestsComponent";
const CourseDashboard = (props) => {
  const [author, setAuthor] = useState();
  const [time, setTime] = useState();
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);
  const [userTests, setUserTests] = useState();

  useEffect(() => {
    moment.locale("es");
    setAuthor(props.auth.user.name);

    const getData = async () => {
      try {
        const theData = await theApi.getCourseDash(props.auth.user.id);
        setCourses(theData.data.allTests.courseName);
        setTests(theData.data.allTests.tests);
        setUserTests(theData.data.usrTests);
      } catch (err) {
        console.log(`Error at get: ${err}`);
      }
    };
    getData();
  }, [props]);

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
        <Spinner
          style={{ width: "3rem", height: "3rem", color: "rgb(116, 35, 153)" }}
          type="grow"
        />
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
              ></TestsComponent>
            );
          }
        }
      });
      return a;
    }
  };

  return (
    <React.Fragment>
      {courses ? (
        <div className="mr-auto ml-auto navThing">{courses}</div>
      ) : (
        <Spinner size="sm" color="primary" />
      )}
      <div
        className="container valign-wrapper"
        style={{
          height: "80vh",
          width: "100vw",
        }}
      >
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
              {!author ? (
                <Spinner size="sm" color="primary" />
              ) : (
                <span className="navThing">{author.firstName}</span>
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
    </React.Fragment>
  );
};

CourseDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(CourseDashboard);
