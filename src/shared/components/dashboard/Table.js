import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
// import { CSVLink } from "react-csv";
import { InlineMath } from "react-katex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import ErrorModal from "../../UIElements/ErrorModal";
import "./GradeTable.css";

const TableOfGrades = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [test, setTest] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const getGradesData = async () => {
      try {
        const userRequest = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/grade/getUserGrades/${auth.userId}`,
          "GET"
        );

        setTest(userRequest.testInfo);
        setAllAnswers(userRequest.testAnswers);
      } catch (err) {}
    };

    if (isMounted) {
      getGradesData();
    }
  }, [sendRequest, auth.userId, isMounted]);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  // const renderCSV = () => {};

  const renderAnswers = () => {
    if (test.length > 0) {
      return (
        <React.Fragment>
          <div className="mt-5">
            <table className="table table-striped col-12 table-sm table-shadow">
              <thead>
                <tr className="answersTable-head">
                  <th> </th>
                  <th>Correctas</th>
                  <th>Calificación</th>
                  <th>Puntos totales</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody className="answersTable-body">{renderAllTest()}</tbody>
            </table>
          </div>
        </React.Fragment>
      );
    }
    // return array;
  };

  const renderAllTest = () => {
    const array = test.map((item, i) => {
      return (
        <tr key={i} className="answersTable-row">
          <td>{item.testName}</td>
          <td>{item.goodAns.length}</td>
          <td>{item.grade}</td>
          <td>
            {item.pts}
            {item.totalPts}
          </td>
          <td style={{ fontSize: "0.65em" }}>
            {moment(item.examDate).format("llll")}
          </td>
        </tr>
      );
    });
    return array;
  };

  const renderTableAnswers = () => {
    if (allAnswers.length > 0) {
      let thisMap = test.map((item, indx) => {
        return (
          <div key={indx}>
            <h4 className="eachAnswers-title">{allAnswers[indx].name}</h4>
            <table
              className="table col-12 ml-auto mr-auto table-sm table-shadow"
              key={indx + 2}
            >
              <thead>
                <tr className="eachAnswers-header">
                  <th></th>
                  <th>Item</th>
                  <th>Respuesta</th>
                  <th>Puntos totales</th>
                </tr>
              </thead>
              <tbody>{renderAns(indx)}</tbody>
            </table>
          </div>
        );
      });
      return thisMap;
    }
  };

  const renderAns = (index) => {
    let testAns;
    console.log(`index: ${index}`);

    testAns = allAnswers[index];
    let userPoints = test[index].allPts;
    let userAnswer = test[index].badAns;
    let thisShit = testAns.answers.map((itm, k) => {
      if (userPoints[k]) {
        return (
          <tr key={k} className="eachAnswers-row-good">
            <td>
              {" "}
              <FontAwesomeIcon
                style={{ color: "#7d64ff", fontSize:'1.23rem' }}
                icon={faCheckCircle}
              ></FontAwesomeIcon>{" "}
            </td>
            <td>{k + 1}</td>
            {testAns.answers[k].isEquation ? (
              <td>
                {testAns.answers[k].text}{" "}
                <InlineMath math={`${testAns.answers[k].equation}`} />{" "}
              </td>
            ) : (
              <td> {testAns.answers[k].text}</td>
            )}
            <td>
              {userPoints[k] ? userPoints[k] : "0"}{" "}
              {userPoints[k] > 1 ? " puntos" : "punto"}
            </td>
          </tr>
        );
      }
      if (userPoints[k] === 0) {
        return (
          <tr key={k} className="eachAnswers-row-bad">
            <td>
              {" "}
              <FontAwesomeIcon
                style={{ color: "#7d64ff", fontSize:'1.23rem' }}
                icon={faTimesCircle}
              ></FontAwesomeIcon>{" "}
            </td>
            <td>{k + 1}</td>
            {testAns.answers[k].isEquation ? (
              <td>
                <InlineMath math={`${userAnswer.shift()}`} />
              </td>
            ) : (
              <td> {userAnswer.shift()}</td>
            )}
            <td>0 puntos</td>
          </tr>
        );
      } else {
        return (
          <tr
            key={k}
            style={{
              backgroundColor: "#ffdce0",
              fontFamily: "Poppins-Light",
            }}
          >
            <td>
              {" "}
              <FontAwesomeIcon
                style={{ color: "#ff99a5" }}
                icon={faTimes}
              ></FontAwesomeIcon>{" "}
            </td>
            <td>{k + 1}</td>
            <td> -- </td>
            <td>0 puntos</td>
          </tr>
        );
      }
    });
    return thisShit;
  };

  const clearModal = () => {
    clearError();
  };
  return (
    <div className="testTable-box col-12 col-md-8 col-lg-6">
      <ErrorModal error={error} onClear={clearModal} />
      {isLoading && <LoadingSpinner asOverlay />}
      <h5 className="testTable-title">Notas</h5>
      <div className="table-responsive col-12">{renderAnswers()}</div>
      <div className="table-responsive testTable-each col-12">
        {renderTableAnswers()}
      </div>
      {/*renderCSV()*/}
    </div>
  );
};

export default TableOfGrades;
