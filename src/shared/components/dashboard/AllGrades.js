import React, { useState, useEffect } from "react";

import moment from "moment";
import { CSVLink } from "react-csv";

import LoadingSpinner from "../../UIElements/LoadingSpinner";
import { Button } from "reactstrap";
import { useHttpClient } from "../../hooks/http-hook";
import "./AllGrades.css";
import GradesTable from "./GradesTable";

const AllGrades = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // const [test, setTest] = useState([]);
  // const [allAnswers, setAllAnswers] = useState([]);
  // const [userInfo, setUserInfo] = useState({});
  const [courseRoll, setCourseRoll] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [testLen, setTtestLen] = useState(0);
  const [isData, setIsData] = useState(false);

  const renderCSV = () => {
    if (courseRoll.length === 0) {
      return "";
    } else {
      return (        
        <div className="mt-2 mb-4">
          <CSVLink
            data={courseRoll}
            filename={`${moment().format()}-DataSet.csv`}
            headers={headers}
            separator={","}
            className="btn floatCSV"
            target="_blank"
          >
            Descargar{" "}
            <span role="img" aria-label="memo">
              📝
            </span>
          </CSVLink>
        </div>
      );
    }
  };

  const headers = [
    { label: "Correo", key: "email" },
    { label: "Nombre", key: "name.firstName" },
    { label: "Apellido", key: "name.lastName" },
    { label: "Curso", key: "courseClass" },
    { label: "Visitas", key: "visits" },
    { label: "Creado", key: "date" },
    { label: "Ultima visita", key: "lastEntry" },
    { label: "Notas", key: `testInfo.map( (item) => item.grade)` },
  ];
  const getGradesData = async (subjectName) => {
    // console.log(subjectName);
    setSubjectName(subjectName);
    try {
      let allUsers = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/grade/getAllGrades/${subjectName}`,
        "GET"
      );
      setCourseRoll(allUsers.data);
      setIsData(true);
      setTtestLen(allUsers.testsLength);      
    } catch (err) {
      setIsData(false);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="mr-auto ml-auto grades-box bordeA">
        <h3 className="navThing">Notas!</h3>
        <div className="row d-flex col-12">
          <Button
            className="col-10 col-sm-3 ml-auto mr-auto nextBtn mb-4"
            // onClick={() => getGradesData("Matematica0")}
          >
            Matemática 0
          </Button>
          <Button
            className="col-10 col-sm-3 ml-auto mr-auto nextBtn mb-4"
            // onClick={() => getGradesData("Matematica1")}
          >
            Matemática 1
          </Button>
          <Button
            className="col-10 col-sm-3 ml-auto mr-auto nextBtn mb-4"
            onClick={() => getGradesData("Matemática II")}
          >
            Matemática 2
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
          {isData ? (
            <GradesTable courseAll={courseRoll} testLn={testLen} />
          ) : (
            <h2>nada</h2>
          )}
        </div>
      </div>
      {renderCSV()}
    </React.Fragment>
  );
};

export default AllGrades;
