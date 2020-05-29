import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from ".././../../actions/authActions";
import theApi from "../../../api/index";
import CheckItems from "./CheckItems";
import { InlineMath } from "react-katex";

window.MathJax = {
  loader: { load: ["input/tex", "output/chtml"] },
};
class Taller3 extends Component {
  state = {
    checkBoxItem: [
      {
        questionName: "question1",
        question: <InlineMath math="x^2" />,
        values: [
          <InlineMath math=" x^2 + 2x + \frac{2}{x}" />,
          <InlineMath math="x^2" />,
          <InlineMath math="2x" />,
          <InlineMath math="\frac{2}{x}" />,
        ],
        selected: "",
        answer: <InlineMath math="2x" />,
        pts: 0,
      },
      {
        questionName: "question2",
        question: "Las encuestas con las opciones: Malo, Regular, Bueno",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto",
        ],
        selected: "",
        answer: "Cualitativo Ordinal",
        pts: 0,
      },
      {
        questionName: "question3",
        question: "Las edades (en años) de todos los del salón de clases",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto",
        ],
        selected: "",
        answer: "Cuantitativo Discreto",
        pts: 0,
      },
      {
        questionName: "question4",
        question: "El peso de todos los del salón de clases",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto",
        ],
        selected: "",
        answer: "Cuantitativo Continuo",
        pts: 0,
      },
      {
        questionName: "question4",
        question: "El peso de todos los del salón de clases",
        values: [],
        selected: "",
        answer: "Cuantitativo Continuo",
        pts: 0,
      },
    ],
    puntos: 0,
    grade: 0,
  };
  //   typeset = () => {
  //     const math = document.querySelector("#math");
  //     math.innerHTML = "$$\\frac{a}{1-a^2}$$";
  //     return math;
  //   };

  componentDidMount() {
    this.setState({ user: this.props.auth.user.id });
  }
  // on Clicks --> Add points
  checkBoxClick = (e) => {
    const name = e.target.attributes.name.value;
    let theAnswer;
    let theValue;
    var thisAns = this.state.checkBoxItem.filter(
      (item) => item.questionName === name
    );

    if (typeof thisAns[0].question === "string") {
      theAnswer = thisAns[0].answer;
      theValue = e.target.value;
    } else {
      console.log("No String");
      theAnswer = thisAns[0].answer.props.math;
      theValue = e.target._wrapperState.initialValue.props.math;
    }
    console.log(`name: ${name}\nanswer: ${theAnswer}\nvalue: ${theValue}`);
    if (theAnswer === theValue) {
      this.setState({
        [name]: e.target.value,
      });
      this.updatePoints(name);
    } else {
      this.setState(
        { [name]: e.target.value, puntaje: this.state.puntaje }
        // console.log(`${name} = ${e.target.value}`)
      );
    }
    this.setSelectedAnswer(name, theValue)
  };

  updatePoints = (keyVal) => {
    console.log(keyVal);

    this.state.checkBoxItem.map((item, k) => {
      if (item.questionName === keyVal) {
        this.renderPuntaje();

        const correctPoints = 1;
        // Copy the state
        var stateCopy = Object.assign({}, this.state);
        stateCopy.checkBoxItem[k] = Object.assign(
          {},
          stateCopy.checkBoxItem[k]
        );
        stateCopy.checkBoxItem[k].pts === 0
          ? (stateCopy.checkBoxItem[k].pts += correctPoints)
          : (stateCopy.checkBoxItem[k].pts = correctPoints);
        this.setState(stateCopy);
      }
      return null;
    });
  };

  setSelectedAnswer = (question, sel)  => {

    this.state.checkBoxItem.map((item, k) => {
      if (item.questionName === question) {

        // const selected = sel;
        // Copy the state
        var stateCopy = Object.assign({}, this.state);
        stateCopy.checkBoxItem[k] = Object.assign(
          {},
          stateCopy.checkBoxItem[k]
        );
        stateCopy.checkBoxItem[k].selected === ''
          ? (stateCopy.checkBoxItem[k].selected = sel)
          : (stateCopy.checkBoxItem[k].selected = sel);
          ;
        this.setState(stateCopy);
        console.log(`value selected: ${stateCopy.checkBoxItem[k].selected}`);
      }
      return null;
    });

  }

  renderPuntaje = () => {
    var acumPts = 0;
    this.state.checkBoxItem.map((item) => {
      acumPts = acumPts + item.pts;
      return acumPts;
    });
    // // console.log(`pts: ${acumPts}`);

    return acumPts;
  };
  renderCheckQuestions = () => {
    if (this.state.checkBoxItem.length === 0) {
      return <p>...</p>;
    } else {
      const checkQuestions = this.state.checkBoxItem.map((item, k) => {
        return (
          <CheckItems
            key={k}
            numberQuestion={k + 1}
            wasClick={this.checkBoxClick}
            values={item.values}
            question={item.question}
            questionName={item.questionName}
            answer={item.answer}
            pts={item.pts}
          ></CheckItems>
        );
      });
      return checkQuestions;
    }
  };
  sendForm = () => {
    let puntos = this.renderPuntaje();
    let grade = (puntos / this.state.checkBoxItem.length) * 100;

    this.setState({ puntos: puntos, grade: grade, examDate: Date.now() });
    console.log(this.props.auth.user);

    theApi
      .postExam({
        theName: this.props.auth.user.name,
        theId: this.props.auth.user.id,
        points: puntos,
        grade: grade,
      })
      .then((res) => {
        // console.log(res.data);
        this.props.history.push({
          pathname: "/checkOut",
        });
      })
      .catch((err) => {
        this.props.history.push("/checkError");
        // console.log(this.state);
        // console.log(err);
      });
  };
  print() {
    // console.log(this.state);
  }
  render() {
    const { user } = this.props.auth;
    return (
      <div
        style={{ margin: "0px auto 35px auto", padding: "55px 0px" }}
        className="pb-2 col-10"
      >
        <h3 className="theTitle">Nota parcial </h3>
        <div className="instrucciones">
          Tienes {this.state.checkBoxItem.length} preguntas, donde debes elegir
          la respuesta correcta. Al final, y si estas de acuerdo con tus
          respuestas, debes presionar el boton de enviar{" "}
          <p className="shakeThatThing ">
            <span role="img" aria-label="star-dust">
              {" "}
              🚀
            </span>
          </p>
        </div>
        <p className="theTitle mt-4">
          <b>Estudiante: </b>
          {user.name.split(" ")[0]}
        </p>
        <div>{this.renderCheckQuestions()}</div>
        <Button
          className="col-8 col-md-4 ml-auto mr-auto nextBtn mb-4"
          onClick={this.sendForm}
        >
          ENVIAR
          <span role="img" aria-label="star-dust">
            {" "}
            🚀
          </span>
        </Button>
      </div>
    );
  }
}

Taller3.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Taller3);
