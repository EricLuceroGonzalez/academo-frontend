import React, { useState, useEffect } from "react";
// Redux:
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import moment from "moment";
import { CSVLink } from "react-csv";

import theApi from "./../../api/index";

const TableOfGrades = (props) => {
  const [test, setTest] = useState();

  useEffect(() => {
    const getGradesData = async () => {
      const getData = await theApi.getUserGrades(props.auth.user.id);
      setTest(getData.data.response);
    };

    getGradesData();
  }, [props]);

  const renderCSV = () => {};
  const renderGrades = () => {
    if (test) {
      test.map((item, i) => {
        // console.log(item);
        console.log(`${item.grade} de ${item.totalPts}`);

        return (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{item.testName}</td>
            <td>
              {item.grade} de {item.totalPts}
            </td>
            <td>a</td>
            {/**            <td>{moment(item.examDate).format("LLLL")}</td> */}
          </tr>
        );
      });
    }
  };
  return (
    <div
      style={{
        paddingTop: "60px",
        paddingBottom: "60px",
        height: "86vh",
      }}
      className="container valign-wrapper"
    >
      <h1 className="navThing">Notas</h1>
      <div
        className="table-responsive ml-auto mr-auto col-12"
        style={{ margin: "10px 5px", fontFamily: "Poppins-Light" }}
      >
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
              <th>#</th>
              <th>Nombre</th>
              <th>Nota</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>{renderGrades()}</tbody>
        </table>
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
