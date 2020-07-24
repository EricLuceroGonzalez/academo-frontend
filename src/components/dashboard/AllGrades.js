import React, { useState, useEffect } from "react";
// Redux:
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import moment from "moment";
import { CSVLink } from "react-csv";

import theApi from "./../../api/index";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { Button } from "reactstrap";


const headers = [
  { label: "Correo", key: "email" },
  { label: "Nombre", key: "name.firstName" },
  { label: "Apellido", key: "name.lastName" },
  { label: "Correo", key: "email" },
  { label: "Fecha", key: "testInfo[0].examDate" }
];


const AllGrades = (props) => {
  const [test, setTest] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courseRoll, setCourseRoll] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectId, setSubjectId] = useState("");

  useEffect(() => {
    console.log(`subjectId: ${subjectId.length}`);
  }, [subjectId]);

  const renderCSV =() => {
    if (courseRoll.length === 0) {
      return <div>Nothing</div>;
    } else {
      return (
        <div className="mt-2 mb-4">
          <CSVLink
            data={courseRoll}
            filename={"00-estadistica-DataSet.csv"}
            headers={headers}
            separator={","}
            className="btn floatCSV"
            target="_blank"
          >
            Descargar
            <span role="img" aria-label="memo">
              📝
            </span>
          </CSVLink>
        </div>
      );
    }
  }

  const getGradesData = async (subjectName) => {
    setIsLoading(true);
    let thisSubject;
    let subject;
    try {
      const getData = await theApi.getAllGrades();

      if (subjectName === "Matematica0") {
        subject = await theApi.getACourse("5ed12f21fe88dd3e7a06b31e");
        setSubjectId(subject.data.tests);

        thisSubject = getData.data.filter(
          (item) => item.subject === "5ed12f21fe88dd3e7a06b31e"
        );
      } else {
        subject = await theApi.getACourse("5ed12ebcfe88dd3e7a06b31d ");
        setSubjectId(subject.data.tests);
        thisSubject = getData.data.filter(
          (item) => item.subject === "5ed12ebcfe88dd3e7a06b31d"
        );
      }

      setCourseRoll(thisSubject);
      setIsLoading(false);
    } catch (err) {
      console.log(`ERROR: ${err}`);

      setIsLoading(false);
    }
  };

  const renderRoll = () => {
    if (courseRoll.length) {
      return courseRoll.map((item, k) => (
        <tr
          key={k}
          style={{
            backgroundColor: "rgb(255,254,247)",
            color: "blacl",
            fontFamily: "monospace",
            fontSize: "0.75em",
          }}
        >
          {console.log("-----------------------")}
          <td>{k + 1}</td>
          <td>{item.email}</td>
          <td>
            {item.name.firstName} {item.name.lastName}
          </td>
          <td>{item.testInfo.length}</td>
          {subjectId.map((i, indx) => {
            if (item.testInfo[indx]) {
              return <td>{item.testInfo[indx].grade}</td>;
            } else {
              return <td>NaN</td>;
            }
          })}
        </tr>
      ));
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "60px",
          minHeight: "100vh",
          height: "100%",
          minWidth: "100vh",
          width: "100%",
        }}
        className="container valign-wrapper"
      >
        <h3 className="navThing">Notas!</h3>
        <div className="row d-flex">
          <Button
            className="col-10 col-sm-4 ml-auto mr-auto nextBtn mb-4"
            onClick={() => getGradesData("Matematica0")}
          >
            Matemática 0
          </Button>
          <Button
            className="col-10 col-sm-4 ml-auto mr-auto nextBtn mb-4"
            onClick={() => getGradesData("Matematica1")}
          >
            Matemática 1
          </Button>
        </div>
        <div>
          <h4
            style={{
              marginTop: "80px",
              fontFamily: "Poppins-ExtraBold",
              backgroundColor: "rgba(155,74,177,0.5)",
              color: "white",
            }}
          >
            {subjectName}
          </h4>
          {subjectId ? (
            <table className="table table-bordered col-12 ml-auto mr-auto table-sm">
              <thead>
                <tr
                  style={{
                    backgroundColor: "rgba(155,74,177,0.75)",
                    color: "white",
                    fontFamily: "Poppins-ExtraBold",
                  }}
                >
                  <th></th>
                  <th>Correo</th>
                  <th>Nombre</th>
                  <th>Realizados</th>
                  <th colSpan={subjectId.length}>Talleres</th>
                </tr>
              </thead>
              <tbody>{renderRoll()}</tbody>
            </table>
          ) : (
            ""
          )}
        </div>
      </div>
      {renderCSV()}
    </React.Fragment>
  );
};

AllGrades.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { registerUser })(AllGrades);
