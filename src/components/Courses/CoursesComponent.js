import React, { Component } from "react";
import { faSuperscript, faSubscript } from "@fortawesome/free-solid-svg-icons";
import CourseComponent from "./CursoComponent";
import { Link } from "react-router-dom";

class CoursesComponent extends Component {
  state = {};

  render() {
    return (
      <div>
        <h2>Courses</h2>
        <Link to={"/courses/estadistica"}>
          <CourseComponent
            theIcon={faSuperscript}
            theTitle={"Estadistica"}
            theText={"the text"}
          ></CourseComponent>
        </Link>
        <Link to={"/courses/mat2"}>
          <CourseComponent
            theIcon={faSubscript}
            theTitle={"Mat 2"}
            theText={"Curso de matematica 2"}
          ></CourseComponent>
        </Link>
      </div>
    );
  }
}

export default CoursesComponent;
