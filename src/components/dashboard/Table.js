import React, { useState, useEffect } from "react";
// Redux:
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import moment from "moment";
import { CSVLink } from "react-csv";

import theApi from "./../../api/index";
import { Spinner } from "reactstrap";

const TableOfGrades = (props) => {
  const [test, setTest] = useState([]);

  useEffect(() => {
    const getGradesData = async () => {
      const getData = await theApi.getUserGrades(props.auth.user.id);
      setTest(getData.data.response);
    };

    getGradesData();
  }, [props]);

  const renderCSV = () => {};

  const renderGrades = () => {
    if (test.length === 0) {
      return (
        <table
          className="table table-striped col-12 ml-auto mr-auto table-sm"
          style={{
            backgroundColor: "rgba(225,224,227,1)",
            fontSize: "0.65em"
          }}
        >
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
        </table>
      );
    } else {
      const array = test.map((item, i) => {
        console.log(item);
        console.log(item.testName);
        console.log(item.grade);
        console.log(`${item.grade} de ${item.totalPts}`);
        return (
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
                <th>Nombre</th>
                <th>Calificacion</th>
                <th>Puntos totales</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item.testName}</td>
                <td>{item.grade}</td>
                <td>
                  {item.pts}
                  {item.totalPts}
                </td>
                <td>{moment(item.examDate).format("ll ll")}</td>
              </tr>
            </tbody>
          </table>
        );
      });
      return array;
    }
  };

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
        console.log(item);
        console.log(item.testName);
        console.log(item.grade);
        console.log(`${item.grade} de ${item.totalPts}`);
        return (
          <React.Fragment>
            <div className='mt-5'>
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
                    <th>Nombre</th>
                    <th>Calificacion</th>
                    <th>Puntos totales</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item.testName}</td>
                    <td>{item.grade}</td>
                    <td>
                      {item.pts}
                      {item.totalPts}
                    </td>
                    <td>{moment(item.examDate).format("ll ll")}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
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
                      backgroundColor: "rgba(155,174,177,1)",
                      color: "white",
                      fontFamily: "Montserrat-ExtraBold",
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
    console.log(`propy: ${propy}`);
    console.log(propy.allPts);

    console.log(`indx: ${indx}`);
    const ansArry = propy.allPts.map((item, ii) => {
      return (
        <tr
          key={ii}
          style={{
            backgroundColor: !item ? "#ffdce0" : "#dcffe4",
          }}
        >
          <td>{ii + 1}</td>
          <td> {item ? propy.goodAns : "-"}</td>
          <td>
            {item ? item : "0"} {item > 1 ? " puntos" : "punto"}
          </td>
        </tr>
      );

      //   });
    });
    return ansArry;
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
      <h1 className="navThing">Notas</h1>
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
