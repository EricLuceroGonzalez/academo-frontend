import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import theApi from "../../api";
import TestsComponent from "../Courses/TestsComponent";

const CourseDashboard = (props) => {
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);
  const [author, setAuthor] = useState();
  // const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    setAuthor(props.auth.user.name);
    const getData = async () => {
      try {
        const theData = await theApi.getCourseDash(props.auth.user.id);
        setCourses(theData.data[0].courseName);
        setTests(theData.data[0].tests);
      } catch (err) {
        console.log(`Error at get: ${err}`);
      }
    };

    getData();
  }, [props]);

  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };

  const renderDashboard = () => {
    if (courses.length === 0) {
      return <Spinner style={{ width: '3rem', height: '3rem', color: 'rgb(116, 35, 153)' }} type="grow" />;
    } else {
      let a = tests.map((test, k) => {
        return (
          <TestsComponent
            key={k}
            // handleClick={handleClicks}
            id={test._id}
            evaluation={test.evaluation}
            theTitle={test.testName}
            theText={test.description}
            theContent={test.contents}
          ></TestsComponent>
        );
      });
      return a;
    }
  };

  return (
    <React.Fragment>
      {courses ? (
        <div
          className="mr-auto ml-auto navThing"
          style={{
            fontSize: "2em",
            textShadow: "2px 3px 3px black",
            paddingTop: "50px",
            marginBottom: "57px",
          }}
        >
          {courses}
        </div>
      ) : (
        <Spinner size="sm" color="primary" />
      )}
      <div
        className="container valign-wrapper"
        style={{
          height: "99vh",
          width: "100vw",
          // marginTop: "56px",
          // paddingTop: "60px",
          // paddingBottom: "30px",
          // height: "100%",
        }}
      >
        <div className="row">
          <div className="col-12 col-lg-8 col-md-8 col-sm-10 center-align mr-auto ml-auto">
            <h4>
              <b>Hola,</b>{" "}
              {!author ? <Spinner size="sm" color="primary" /> : `${author.firstName}`}
              <span role="img" aria-label="star-dust">
                {" "}
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
            // marginTop: "1rem",
            bottom: "50px",
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
