import React, { Component } from "react";
import theApi from "../../api/index";
import { Spinner } from "reactstrap";

class GetGrades extends Component {
  state = { allGrades: [] };

  componentDidMount() {
    theApi
      .getGrades()
      .then(res => {
        // console.log({ mensaje: "Get all data", response: res.data });
        // console.log(res.data);
        // console.log(res.data[0]);
        this.setState({ allGrades: res.data });
      })
      .catch(err => console.log(`GET - ERROR: ${err}`));
  }

  renderGrades = () => {
    if (this.state.allGrades.length === 0) {
      return (
        <tr>
          <td>
            <Spinner className="mr-auto ml-auto" type="grow" color="primary" />
          </td>
          <td>
            <Spinner className="mr-auto ml-auto" type="grow" color="primary" />
          </td>
          <td>
            <Spinner className="mr-auto ml-auto" type="grow" color="primary" />
          </td>
          <td>
            <Spinner className="mr-auto ml-auto" type="grow" color="primary" />
          </td>
          <td>
            <Spinner className="mr-auto ml-auto" type="grow" color="primary" />
          </td>
        </tr>
      );
    } else {
      const table = this.state.allGrades.map((item, i) => {
        // console.log(`------------- ${i} ------------`);
        var nota = "";
        if (item.testInfo.length !== 0) {
          item.testInfo.length > 1
            ? (nota = item.testInfo[item.testInfo.length - 1].grade)
            : (nota = item.testInfo[0].grade);
        } else {
          nota = "No registrado";
        }

        return (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>
              {nota !== "No registrado" ? nota.toFixed(1) : "No registrado"}
            </td>
          </tr>
        );
      });
      return table;
    }
  };
  render() {
    return (
      <div
        style={{
          marginTop: "56px",
          paddingTop: "60px",
          paddingBottom: "60px",
          height: "100%"
        }}
        className="container valign-wrapper"
      >
        <h1 className="navThing">Notas</h1>
        <div
          className="table-responsive ml-auto mr-auto"
          style={{ margin: "90px 15px", fontFamily: "Poppins-Light" }}
        >
          <table className="table table-striped col-6">
            <thead>
              <tr
                style={{
                  fontSize: "0.85em",
                  backgroundColor: "rgba(155,74,177,1)",
                  color: "white",
                  fontFamily: "Montserrat-ExtraBold"
                }}
              >
                <th>#</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "0.65em" }}>{this.renderGrades()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default GetGrades;
