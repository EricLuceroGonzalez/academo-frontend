import React, { useState, useEffect } from "react";
// Redux:
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import moment from "moment";
import { CSVLink } from "react-csv";

import theApi from "./../../api/index";
import { Spinner } from "reactstrap";
import { InlineMath } from "react-katex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const TableOfGrades = (props) => {
  const [test, setTest] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);

  useEffect(() => {
    const getGradesData = async () => {
      const getData = await theApi.getUserGrades(props.auth.user.id);
      setTest(getData.data.testInfo);
      setAllAnswers(getData.data.testAnswers);
      console.log(getData.data);
    };
    getGradesData();
  }, [props]);

  const renderCSV = () => {};

  const renderAnswers = () => {
    if (test.length === 0) {
      return (
        <table
          className="table table-striped col-12 ml-auto mr-auto table-sm"
          style={{
            backgroundColor: "rgba(225,224,227,1)",
            fontSize: "0.65em",
          }}
        >
          <thead>
            <tr>
              <td>
                <Spinner
                  className="mr-auto ml-auto"
                  size="sm"
                  type="grow"
                  color="primary"
                />
              </td>
              <td>
                <Spinner
                  className="mr-auto ml-auto"
                  size="sm"
                  type="grow"
                  color="primary"
                />
              </td>
              <td>
                <Spinner
                  className="mr-auto ml-auto"
                  size="sm"
                  type="grow"
                  color="primary"
                />
              </td>
              <td>
                <Spinner
                  className="mr-auto ml-auto"
                  size="sm"
                  type="grow"
                  color="primary"
                />
              </td>
            </tr>
          </thead>
        </table>
      );
    } else {
      return (
        <React.Fragment>
          <div className="mt-5">
            <table
              className="table table-striped col-12 ml-auto mr-auto table-sm"
              style={{
                backgroundColor: "rgba(225,224,227,1)",
                fontSize: "0.65em",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "rgba(155,74,177,1)",
                    color: "white",
                    fontFamily: "Montserrat-ExtraBold",
                  }}
                >
                  <th> </th>
                  <th>Correctas</th>
                  <th>Calificación</th>
                  <th>Puntos totales</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>{renderAllTest()}</tbody>
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
        <tr
          key={i}
          style={{
            color: "rgba(155,74,177,1)",
            fontFamily: "Montserrat-ExtraBold",
            fontSize: "1.15em",
          }}
        >
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

  const renderTableAnswers =  () => {
    if (allAnswers.length > 0) {
      let thisMap = test.map( (item, indx) => {
        return (
          <div key={indx}>
            <h4
              style={{
                marginTop: "80px",
                fontFamily: "Poppins-ExtraBold",
                backgroundColor: "rgba(155,74,177,0.5)",
                color: "white",
              }}
            >
              {allAnswers[indx].name}
            </h4>
            <table
              className="table table-striped col-12 ml-auto mr-auto table-sm"
              key={indx + 2}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "rgba(155,74,177,0.75)",
                    color: "white",
                    fontFamily: "Poppins-ExtraBold",
                  }}
                >
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
    } else {
      return (
        <div>
          <table className="table table-striped col-12 ml-auto mr-auto table-sm">
            <thead>
              <tr
                style={{
                  backgroundColor: "rgba(155,74,177,0.75)",
                  color: "white",
                  fontFamily: "Poppins-ExtraBold",
                }}
              >
                <th></th>
                <th>Item</th>
                <th>Respuesta</th>
                <th>Puntos totales</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Spinner className="mr-auto ml-auto" size="md" type="grow" />
                </td>
                <td>
                  <Spinner className="mr-auto ml-auto" size="md" type="grow" />
                </td>
                <td>
                  <Spinner className="mr-auto ml-auto" size="md" type="grow" />
                </td>
                <td>
                  <Spinner className="mr-auto ml-auto" size="md" type="grow" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  };

  const renderAns = (index) => {
    let testAns;
    console.log(`index: ${index}`);

    testAns = allAnswers[index];
    let userPoints = test[index].allPts;
    let userAnswer = test[index].allAns;
    let thisShit = testAns.answers.map((itm, k) => {
      if (userPoints[k]) {
        return (
          <tr
            key={k}
            style={{
              backgroundColor: "#dcffe4",
              fontFamily: "Poppins-Light",
            }}
          >
            <td>
              {" "}
              <FontAwesomeIcon
                style={{ color: "#99ffb1" }}
                icon={faCheck}
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

  return (
    <div
      style={{
        paddingTop: "60px",
        paddingBottom: "60px",
        height: "100%",
      }}
      className="container valign-wrapper"
    >
      <h3 className="navThing">Notas</h3>
      <div
        className="table-responsive ml-auto mr-auto col-12"
        style={{ margin: "10px 5px", fontFamily: "Poppins-Light" }}
      >
        {renderAnswers()}
      </div>
      <div
        className="table-responsive ml-auto mr-auto col-12"
        style={{ fontSize: "0.65em" }}
      >
        {renderTableAnswers()}
      </div>
      {renderCSV()}
    </div>
  );
};

TableOfGrades.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { registerUser })(TableOfGrades);
