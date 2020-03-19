import React, { Component } from "react";
import { faSubscript, faPercentage } from "@fortawesome/free-solid-svg-icons";
import CourseComponent from "./CursoComponent";
import { Link } from "react-router-dom";

class CoursesComponent extends Component {
  state = {};

  render() {
    return (
      <div style={{height: "100vh", paddingTop: '80px', paddingBottom:'30px'}}
      className='col-10 col-lg-6 mr-auto ml-auto'>
        <Link to={"/courses/estadistica"}>
          <CourseComponent
            theIcon={faPercentage}
            theTitle={"Estadística"}
            theText={"Entra para realizar la prueba de estadística"}
          ></CourseComponent>
        </Link>
        <Link to={"/courses"}>
          <CourseComponent
            theIcon={faSubscript}
            theTitle={"Mat 2"}
            theText={"Curso de matematica II"}
          ></CourseComponent>
        </Link>
      </div>
    );
  }
}

export default CoursesComponent;
