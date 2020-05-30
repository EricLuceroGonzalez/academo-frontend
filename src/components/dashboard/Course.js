import React, { Component } from "react";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import theApi from "../../api";
import TestsComponent from "../Courses/TestsComponent";

class CourseDashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  state = { courses: [], tests: [] };

  componentDidMount() {
    //   Bring this user courses:
    // console.log("    //   Bring this user courses:");
    // console.log(this.props);

    theApi
      .getCourseDash(this.props.auth.user.id)
      .then((res) => {
        this.setState({
          courses: res.data[0].courseName,
          tests: res.data[0].tests,
        });
      })
      .catch((err) => console.log(`Error at get: ${err}`));
  }

  renderDashboard = () => {
    if (this.state.courses.length === 0) {
      return <Spinner color="primary" />;
    } else {
      let a = this.state.tests.map((test, k) => {
        // console.log(`k: ${k}`);
        // console.log(test.testName);
        return (
          <TestsComponent
            key={k}
            handleClick={this.handleClicks}
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

  handleClicks = (aa) => {
    // console.log(aa);
    // console.log(this.props.location);

    // this.props.history.push({
    //   pathname: `${this.props.location.pathname}/${aa}`
    // });
  };

  render() {
    const { user } = this.props.auth;
    return (
      <React.Fragment>
        {this.state.courses ? (
          <div
            className="mr-auto ml-auto navThing"
            style={{
              fontSize: "2em",
              textShadow: "2px 3px 3px black",
              paddingTop: '50px',
              marginBottom: "57px",
            }}
          >
            {this.state.courses}
          </div>
        ) : (
          <Spinner color="primary" />
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
                <b>Hola,</b> {user.name.firstName.split(" ")[0]}{" "}
                <span role="img" aria-label="star-dust">
                  {" "}
                  🚀
                </span>
              </h4>
              <div>{this.renderDashboard()}</div>

            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8 col-md-8 col-sm-10 center-align mr-auto ml-auto">
        <button
        style={{
          borderRadius: "3px",
          letterSpacing: "1.5px",
          // marginTop: "1rem",
          bottom: '50px'
        }}
        onClick={this.onLogoutClick}
        className="btn btn-large nextBtn col-10"
      >
        Cerrar sesión
      </button>
        </div>
      </React.Fragment>
    );
  }
}

CourseDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(CourseDashboard);
