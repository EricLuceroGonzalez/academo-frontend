import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import theApi from "../../api/index";
import  LoadingSpinner  from "../UIElements/LoadingSpinner";
// import CheckItems from "./CheckItems";
import CheckItems from "../Courses/Estadistica/CheckItems";
import { InlineMath } from "react-katex";
import update from "immutability-helper";
// // import parse from "html-react-parser";
// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
//   htmlparser2,
// } from "react-html-parser";

// window.MathJax = {
//   loader: { load: ["input/tex", "output/chtml"] },
// };
class TallerComponent extends Component {
  state = {
    author: {
      firstName: "",
      lastName: "",
    },
    authorId: "",
    test: "",
    allAns: [],
    ansQuest: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({
      authorId: this.props.auth.user.id,
      author: this.props.auth.user.name,
    });
    theApi
      .getATest(this.props.match.params.Taller)
      .then((res) => {
        this.setState({ test: res.data });
      })
      .catch((err) => console.log(err));
  }

  renderInstrucciones = () => {
    if (this.state.test === "") {
      return <Spinner color="primary" />;
    } else {
      return (
        <div className="instrucciones">
          {this.state.test.instructions}
          <p className="shakeThatThing ">
            <span role="img" aria-label="star-dust">
              {" "}
              🚀
            </span>
          </p>
        </div>
      );
    }
  };

  checkBoxClick = (e) => {
    const name = e.target.attributes.name.value;
    const theAnswer = e.target.id;
    let theValue = e.target.value;

    // CHECK THE ANSWERS
    this.setSelectedAnswer(name, theValue, theAnswer);
  };

  setSelectedAnswer = (question, selection, theAnswer) => {
    this.state.test.questions.map((item, k) => {
      if (item.questionName === question && theAnswer === selection) {
        this.setState((prevState, props) =>
          update(prevState, {
            test: {
              questions: {
                $apply: (questions) =>
                  questions.map((itemCopy, ii) => {
                    if (ii !== k) {
                      return itemCopy;
                    } else {
                      return {
                        ...itemCopy,
                        pts: itemCopy.value,
                      };
                    }
                  }),
              },
            },
          })
        ); // Closing the setState
      } else if (item.questionName === question && theAnswer !== selection) {
        this.setState({
          allAns: [...this.state.allAns, selection],
          ansQuest: [...this.state.ansQuest, question],
        });

        this.setState((prevState, props) =>
          update(prevState, {
            test: {
              questions: {
                $apply: (questions) =>
                  questions.map((itemCopy, ii) => {
                    if (ii !== k) {
                      return itemCopy;
                    } else {
                      return {
                        ...itemCopy,
                        pts: 0,
                      };
                    }
                  }),
              },
            },
          })
        ); // Closing the setState
      }
    });
  };

  renderPuntaje = () => {
    var acumPts = 0;
    this.state.test.questions.map((item) => {
      acumPts = acumPts + item.pts;
      return acumPts;
    });
    return acumPts;
  };

  renderCheckQuestions = () => {
    if (this.state.test.length === 0) {
      return <p>...</p>;
    } else {
      const checkQuestions = this.state.test.questions.map((item, k) => {
        return (
          <CheckItems
            key={k}
            numberQuestion={k + 1}
            wasClick={this.checkBoxClick}
            values={item.options}
            question={
              item.isEquation ? (
                <React.Fragment>
                  {item.question} <InlineMath math={`${item.equation}`} />{" "}
                </React.Fragment>
              ) : (
                item.question
              )
            }
            questionName={item.questionName}
            answer={
              item.answer.isEquation ? item.answer.equation : item.answer.text
            }
            pts={item.pts}
          ></CheckItems>
        );
      });
      return checkQuestions;
    }
  };

  sendForm = async () => {
    let puntos = this.renderPuntaje();
    let sumPts = [];
    sumPts = this.state.test.questions.map((val, i) => (sumPts = val.value));
    let puntaje = sumPts.reduce((a, b) => {
      return a + b;
    });

    let grade = ((puntos / puntaje) * 100).toFixed(2);
    try {
      this.setState({ isLoading: true });
      await theApi.postExam({
        theName: this.props.auth.user.name,
        theId: this.props.auth.user.id,
        totalPts: puntaje,
        testId: this.state.test._id,
        testName: this.state.test.testName,
        grade: grade,
        allAns: this.state.allAns,
        ansQuest: this.state.ansQuest,
      });
      this.setState({ isLoading: false });
      this.props.history.push({
        pathname: "/checkOut",
      });
    } catch (err) {}
  };
  render() {
    const { user } = this.props.auth;
    return (
      <React.Fragment>

        <div
          style={{ margin: "0px auto 35px auto", padding: "55px 0px" }}
          className="pb-2 col-10"
        >
        {this.state.isLoading && <LoadingSpinner asOverlay />}
          <h3 className="theTitle">Nota parcial </h3>
          {this.renderInstrucciones()}
          <p className="theTitle mt-4">
            <b>Estudiante: </b>
            {`${this.state.author.firstName} ${this.state.author.lastName}`}
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
      </React.Fragment>
    );
  }
}

TallerComponent.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(TallerComponent);
