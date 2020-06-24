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

const TableOfGrades = (props) => {
  const [test, setTest] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);

  useEffect(() => {
    const getGradesData = async () => {
      const getData = await theApi.getUserGrades(props.auth.user.id);
      setTest(getData.data.testInfo);
      setAllAnswers(getData.data.testAnswers);
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
      const array = test.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <div className="mt-5">
              <table
                className="table table-striped col-12 ml-auto mr-auto table-sm"
                style={{
                  backgroundColor: "rgba(225,224,227,1)",
                  fontSize: "0.65em",
                }}
                key={i}
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
                    <th>Calificacion</th>
                    <th>Puntos totales</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
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
                </tbody>
              </table>
            </div>

            <div>
              <table
                className="table table-striped col-12 ml-auto mr-auto table-sm"
                style={{
                  backgroundColor: "rgba(225,224,177,0.6)",
                  fontSize: "0.65em",
                }}
                key={i}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "rgba(155,74,177,0.75)",
                      color: "white",
                    }}
                  >
                    <th>Item</th>
                    <th>Respuesta</th>
                    <th>Puntos totales</th>
                  </tr>
                </thead>
                <tbody>{renderAns(item, i)}</tbody>
              </table>
            </div>
          </React.Fragment>
        );
      });

      return array;
    }
  };

  const renderAns = (propy, indx) => {
    let testAns;
    let ansArry = [];

    if (allAnswers[indx]) {
      testAns = allAnswers[indx];

      for (let i = 0; i < testAns.amount; i++) {

        if (propy.allPts[i]) {

          ansArry.push(
            <tr
              key={i}
              style={{
                backgroundColor: "#dcffe4",
              }}
            >
              <td>{i + 1}</td>
              {testAns.answers[i].isEquation ? (
                <td>
                  {testAns.answers[i].text}{" "}
                  <InlineMath math={`${testAns.answers[i].equation}`} />{" "}
                </td>
              ) : (
                <td> {testAns.answers[i].text}</td>
              )}
              <td>
                {propy.allPts[i] ? propy.allPts[i] : "0"}{" "}
                {propy.allPts[i] > 1 ? " puntos" : "punto"}
              </td>
            </tr>
          );
        } else {
          ansArry.push(
            <tr
              key={i}
              style={{
                backgroundColor: "#ffdce0",
              }}
            >
              <td>{i + 1}</td>
              <td> - </td>
              <td>0 puntos</td>
            </tr>
          );
        }
      }
      return ansArry;
    }
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
