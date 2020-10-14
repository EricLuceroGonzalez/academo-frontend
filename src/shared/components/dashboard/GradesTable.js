import React from "react";
import "./AllGrades.css";
const GradesTable = (props) => {
  const renderGrades = (params) => {
    let grades = [];
    for (let i = 0; i < props.testLn; i++) {
      if (params[i]) {
        grades.push(
          <td
            key={i}
            className={
              params[i].grade > 80
                ? "got-AB"
                : params[i].grade > 70
                ? "got-C"
                : "got-F"
            }
          >
            {params[i].grade}
          </td>
        );
      } else {
        grades.push(
          <td key={i} className="no-grade">
            ---
          </td>
        );
      }
    }
    return grades;
  };
  const renderRoll = () => {
    if (props.courseAll.length) {
      let allRoll;
      allRoll = props.courseAll.map((item, k) => (
        <tr
          key={k}
          style={{
            backgroundColor: "rgb(255,254,247)",
            color: "black",
            fontFamily: "monospace",
            fontSize: "0.75em",
          }}
        >
          <td>{k + 1}</td>
          <td>{item.email}</td>
          <td>
            {item.name.firstName} {item.name.lastName}
          </td>
          <td
            className={
              item.testInfo.length > props.testLn - 3
                ? "got-AB"
                : item.testInfo.length > props.testLn - 6
                ? "got-C"
                : item.testInfo.length === 0
                ? "no-grade"
                : "got-F"
            }
          >
            {item.testInfo.length}
          </td>

          {renderGrades(item.testInfo)}
        </tr>
      ));
      return allRoll;
    }
  };

  return (
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
          <th># ({props.testLn})</th>
          <th colSpan={props.testLn}>Taller</th>
        </tr>
      </thead>
      <tbody>{renderRoll()}</tbody>
    </table>
  );
};

export default GradesTable;
