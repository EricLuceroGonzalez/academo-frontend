import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from ".././../../actions/authActions";
import theApi from "../../../api/index";
// import FractionDisplay from "../MathJaxComponent";
// import MathJax from "react-mathjax2";
// import SomeMath from "../MathJaxComponent";
import CheckItems from "./CheckItems";

// const texa = `f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi`;
// const tex = `\\large \\int_2^4 \\cos(x)`;
// const array = "\\sum_6^{N} = \\frac{\\sqrt{x - x_i}}{N-1}";

window.MathJax = {
  loader: { load: ["input/tex", "output/chtml"] }
};
class Taller1 extends Component {
  state = {
    checkBoxItem: [
      {
        questionName: "question1",
        question: "Puesto conseguido en una prueba deportiva: 1º, 2º, 3º",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cualitativo Ordinal",
        pts: 0
      },
      {
        questionName: "question2",
        question: "Las encuestas con las opciones: Malo, Regular, Bueno",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cualitativo Ordinal",
        pts: 0
      },
      {
        questionName: "question3",
        question: "Las edades (en años) de todos los del salón de clases",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cuantitativo Discreto",
        pts: 0
      },
      {
        questionName: "question4",
        question: "El peso de todos los del salón de clases",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cuantitativo Continuo",
        pts: 0
      },
      {
        questionName: "question5",
        question: "La cantidad de contenedores que se mueven al día en Panamá",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cuantitativo Discreto",
        pts: 0
      },
      {
        questionName: "question6",
        question: "La cantidad de clientes por día de un restaurante",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cuantitativo Discreto",
        pts: 0
      },
      {
        questionName: "question7",
        question:
          "El tiempo, en segundos, que esperan 100 clientes de McDonalds",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cuantitativo Continuo",
        pts: 0
      },
      {
        questionName: "question8",
        question: "La cantidad de goles de 20 futbolistas profesionales ",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cuantitativo Discreto",
        pts: 0
      },
      {
        questionName: "question9",
        question: "La estatura de 20 futbolistas profesionales ",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cuantitativo Continuo",
        pts: 0
      },
      {
        questionName: "question10",
        question: "El tiempo de transito de los últimos 100 buque en el Canal",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cuantitativo Continuo",
        pts: 0
      },
      {
        questionName: "question11",
        question: "La cantidad de infectados por un virus",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cuantitativo Discreto",
        pts: 0
      },
      {
        questionName: "question12",
        question: "La cantidad de litros de combustible de un tanque",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cuantitativo Continuo",
        pts: 0
      },
      {
        questionName: "question13",
        question: "El grupo sanguíneo de un conjunto de encuestados",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cualitativo Nominal",
        pts: 0
      },
      {
        questionName: "question14",
        question: "La lateralidad de un grupo de encuestados",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cualitativo Nominal",
        pts: 0
      },
      {
        questionName: "question15",
        question: "El genero de un grupo de encuestados",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cualitativo Nominal",
        pts: 0
      },
      {
        questionName: "questionFull1",
        question:
          "La cantidad de segundos transcurridos desde que empezaste esta prueba",
        values: [
          "Cualitativo Nominal",
          "Cualitativo Ordinal",
          "Cuantitativo Continuo",
          "Cuantitativo Discreto"
        ],
        answer: "Cuantitativo Continuo",
        pts: 0
      },
      {
        questionName: "questionFull2",
        question:
          "Es el conjunto de individuos sobre el que estamos interesados, en una característica medible en comun",
        values: ["Datos", "Variable", "Poblacion", "Muestra"],
        answer: "Poblacion",
        pts: 0
      },
      {
        questionName: "questionFull3",
        question:
          "Un subconjunto al que tenemos acceso, y sobre el que se hacen observaciones medibles y representativas.",
        values: ["Promedio", "Media", "Poblacion", "Muestra"],
        answer: "Muestra",
        pts: 0
      },
      {
        questionName: "questionFull4",
        question:
          "Caracteristica observable que puede variar entre los individuos de una población",
        values: ["Desviacion", "Medicion", "Variable", "Muestra"],
        answer: "Variable",
        pts: 0
      },
      {
        questionName: "questionFull5",
        question: "Valor particular de una variable",
        values: ["Poblacion", "Variable", "Muestra", "Dato"],
        answer: "Dato",
        pts: 0
      },
      {
        questionName: "questionFull6",
        question: "Conjunto de datos numéricos discretos",
        values: [
          "Datos Discretos",
          "Datos No Discretos",
          "Datos Continuos",
          "Datos Espureos"
        ],
        answer: "Datos Discretos",
        pts: 0
      },
      {
        questionName: "questionFull7",
        question: "Conjunto de datos numéricos continuos",
        values: [
          "Datos Discretos",
          "Datos No Discretos",
          "Datos Continuos",
          "Datos Espureos"
        ],
        answer: "Datos Continuos",
        pts: 0
      },
      {
        questionName: "questionFull8",
        question:
          "En el grafico de barras se utiliza cuando los datos son de tipo:",
        values: [
          "Datos Discretos",
          "Datos No Discretos",
          "Datos Continuos",
          "Datos Espureos"
        ],
        answer: "Datos Discretos",
        pts: 0
      },
      {
        questionName: "questionFull9",
        question: "En el histograma se utiliza cuando los datos son de tipo:",
        values: [
          "Datos Discretos",
          "Datos No Discretos",
          "Datos Continuos",
          "Datos Espureos"
        ],
        answer: "Datos Continuos",
        pts: 0
      },
      {
        questionName: "questionFull10",
        question:
          "Conjunto de medidas, o cálculos relacionados con encontrar el centro de la distribución de los datos",
        values: [
          "Medidas de dispersion",
          "Medidas no centrales",
          "Medidas de tendencia central",
          "Medias"
        ],
        answer: "Medidas de tendencia central",
        pts: 0
      },
      {
        questionName: "questionFull11",
        question:
          "Conjunto de medidas, o cálculos que indican lo tan alejados que estemos del centro de la distribución de los datos",
        values: [
          "Medidas de dispersion",
          "Medidas no centrales",
          "Medidas de tendencia central",
          "Medias"
        ],
        answer: "Medidas de dispersion",
        pts: 0
      },
      {
        questionName: "questionFull12",
        question:
          "El valor obtenido de la suma de todos los datos divididos entre la cantidad de sumandos",
        values: ["Moda", "Mediana", "Desviacion", "Media"],
        answer: "Media",
        pts: 0
      },
      {
        questionName: "questionFull13",
        question: "También se le llama promedio",
        values: ["Moda", "Mediana", "Desviacion", "Media"],
        answer: "Media",
        pts: 0
      },
      {
        questionName: "questionFull14",
        question:
          "Es el dato que representa la mitad del conjunto. Por debajo de el esta el 50% de los datos y por encima el 50% de los datos.",
        values: ["Moda", "Mediana", "Desviacion", "Media"],
        answer: "Mediana",
        pts: 0
      },
      {
        questionName: "questionFull15",
        question: "Es el valor que mas se repite en el conjunto de datos",
        values: ["Moda", "Mediana", "Desviacion", "Media"],
        answer: "Moda",
        pts: 0
      },
      {
        questionName: "questionFull16",
        question:
          "Calculo que da como resultado la dispersión de cada dato respecto al valor de la media",
        values: ["Moda", "Mediana", "Desviacion", "Media"],
        answer: "Desviacion",
        pts: 0
      },
      {
        questionName: "questionFull17",
        question:
          "Se representa con una s, y cuantifica que tan dispersos están todos los valores alrededor de la media",
        values: [
          "Desviacion Tipica",
          "Mediana",
          "Desviacion",
          "Desviacion Estandar"
        ],
        answer: "Desviacion Estandar",
        pts: 0
      },
      {
        questionName: "questionFull18",
        question:
          "La moda de los valores: 4,6,9,7,7,8,9,9,4,5,6,7,8,4,3,3,4,6,7,4 es:",
        values: ["2", "6", "4", "7"],
        answer: "4",
        pts: 0
      },
      {
        questionName: "questionFull19",
        question:
          "La media de los valores: 4,6,9,7,7,8,9,9,4,5,6,7,8,4,3,3,4,6,7,4 es:",
        values: ["5.50", "5.00", "6.00", "6.04"],
        answer: "6.00",
        pts: 0
      },
      {
        questionName: "questionFull20",
        question:
          "La mediana de los valores: 4,6,9,7,7,8,9,9,4,5,6,7,8,4,3,3,4,6,7,4 es:",
        values: ["0", "5", "4", "6"],
        answer: "6",
        pts: 0
      },
      {
        questionName: "questionFull21",
        question:
          "La mediana de los valores: 4, 3, 1, 5, 2, 3, 1, 6, 1, 4, 6, 3, 5, 5, 5, 6, 4 es:",
        values: ["3", "5", "4", "6"],
        answer: "4",
        pts: 0
      },
      {
        questionName: "questionFull22",
        question:
          "La moda de los valores: 4, 3, 1, 5, 2, 3, 1, 6, 1, 4, 6, 3, 5, 5, 5, 6, 4 es:",
        values: ["3", "5", "4", "6"],
        answer: "5",
        pts: 0
      },
      {
        questionName: "questionFull23",
        question:
          "La media de los valores: 4, 3, 1, 5, 2, 3, 1, 6, 1, 4, 6, 3, 5, 5, 5, 6, 4 es:",
        values: ["3.76", "3.56", "3.79", "3.77"],
        answer: "3.76",
        pts: 0
      }
    ],
    puntos: 0,
    grade: 0
  };
  typeset = () => {
    const math = document.querySelector("#math");
    math.innerHTML = "$$\\frac{a}{1-a^2}$$";
    return math;
  };

  componentDidMount() {
    this.setState({ user: this.props.auth.user.id });
  }

  checkBoxClick = e => {
    const name = e.target.attributes.name.value;
    const theAnswer = e.target.attributes.id.value;
    const theValue = e.target.value;
    if (theAnswer === theValue) {
      this.setState({
        [name]: e.target.value
      });
      this.updatePoints(name);
    } else {
      // console.log(`${theAnswer} neq ${theValue}`);
      this.setState(
        { [name]: e.target.value, puntaje: this.state.puntaje }
        // console.log(`${name} = ${e.target.value}`)
      );
    }
  };

  updatePoints = keyVal => {
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

  renderPuntaje = () => {
    var acumPts = 0;
    this.state.checkBoxItem.map(item => {
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
    let grade = (puntos / this.state.checkBoxItem.length)*100;

    this.setState({ puntos: puntos, grade: grade, examDate: Date.now() });

    theApi
      .postExam({
        id: this.props.auth.user.id,
        points: puntos,
        grade: grade
      })
      .then(res => {
        // console.log(res.data);
        this.props.history.push({
          pathname: "/checkOut"
        });
      })
      .catch(err => {
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
          Tienes 38 preguntas, donde debes elegir la respuesta correcta. Al
          final, y si estas de acuerdo con tus respuestas, debes presionar el
          boton de enviar{" "}
          <p className='shakeThatThing '>
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

Taller1.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Taller1);
