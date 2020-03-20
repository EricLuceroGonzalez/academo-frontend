import React, { Component } from "react";
import theApi from "../../api/index";
import { Spinner } from "reactstrap";
import moment from "moment";

class GetGrades extends Component {
  state = { allGrades: [] };

  componentDidMount() {
    theApi
      .getGrades()
      .then(res => {
        // console.log({ mensaje: "Get all data", response: res.data });
        console.log(res.data);
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
        var fecha = "";
        if (item.testInfo.length !== 0) {
          item.testInfo.length > 1
            ? (nota = item.testInfo[item.testInfo.length - 1].grade)
            : (nota = item.testInfo[0].grade);
          item.testInfo.length > 1
            ? (fecha = item.testInfo[item.testInfo.length - 1].examDate)
            : (fecha = item.testInfo[0].examDate);
        } else {
          nota = "No registrado";
          fecha = "No registrado";
        }

        return (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{item.name}</td>
            <td>
              {nota !== "No registrado" ? nota.toFixed(1) : "No registrado"}
            </td>
            <td>{item.email}</td>
            <td>{moment(fecha).format('MMMM Do YYYY, h:mm:ss a')}</td>
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
          style={{ margin: "10px 15px", fontFamily: "Poppins-Light" }}
        >
          <table
            className="table table-striped col-12 ml-auto mr-auto "
            style={{
              backgroundColor: "rgba(225,224,227,1)",
              fontSize: "0.65em"
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "rgba(155,74,177,1)",
                  color: "white",
                  fontFamily: "Montserrat-ExtraBold"
                }}
              >
                <th>#</th>
                <th>Nombre</th>
                <th>Nota</th>
                <th>Correo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody
              style={{
                fontFamily: "Montserrat-ExtraBold"
                // backgroundColor: "rgba(155,74,177,1)"
              }}
            >
              {this.renderGrades()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default GetGrades;