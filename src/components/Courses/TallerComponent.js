import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import theApi from "../../api/index";
import LoadingSpinner from "../UIElements/LoadingSpinner";
// import CheckItems from "./CheckItems";
import CheckItems from "../Courses/Estadistica/CheckItems";
import { InlineMath } from "react-katex";
import { useHistory } from "react-router-dom";
// // import parse from "html-react-parser";
// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
//   htmlparser2,
// } from "react-html-parser";

// window.MathJax = {
//   loader: { load: ["input/tex", "output/chtml"] },
// };
const TallerComponent = (props) => {
  // state = {
  //   author: {
  //     firstName: "",
  //     lastName: "",
  //   },
  //   authorId: "",
  //   test: "",
  //   allAns: [],
  //   ansQuest: [],
  //   isLoading: false,
  // };

  const [author, setAuthor] = useState();
  const [authorId, setAuthorId] = useState();
  const [test, setTest] = useState("");
  const [allAns, setAllAns] = useState([]);
  const [goodAns, setGoodAns] = useState([]);
  const [goodQuest, setGoodQuest] = useState([]);
  const [allQuest, setAllQuest] = useState([]);
  const [allPts, setAllPts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setAuthorId(props.auth.user.id);
    setAuthor(props.auth.user.name);

    const getTest = async () => {
      // console.log("here");

      try {
        const data = await theApi.getATest(props.match.params.id);
        setIsLoading(false);
        setTest(data.data.test);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getTest();
  }, [props]);

  // const componentDidMount = async () => {
  //   // this.setState({
  //   //   authorId: this.props.auth.user.id,
  //   //   author: this.props.auth.user.name,
  //   // });
  //   // console.log(this.props.match.params);
  // };

  const renderInstrucciones = () => {
    if (!test) {
      return <Spinner color="primary" />;
    } else {
      // console.log(test);

      return (
        <div className="instrucciones">
          {test.instructions}
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

  const checkBoxClick = (e) => {
    const name = e.target.attributes.name.value;
    const theAnswer = e.target.id;
    let theValue = e.target.value;
    // console.log(`name: ${name} \n ans: ${theAnswer} \n sel: ${theValue}`);

    // CHECK THE ANSWERS
    setSelectedAnswer(name, theValue, theAnswer);
  };

  const updatePts = async (value, index) => {
    let ptsCopy = [...allPts];
    ptsCopy[index] = value;
    setAllPts(ptsCopy);
  };

  const setSelectedAnswer = async (question, selection, theAnswer) => {
    await test.questions.map((item, k) => {
      if (item.questionName === question && theAnswer === selection) {
        // Save the answer and question
        const newQuest = [...goodQuest, question];
        const newAns = [...goodAns, selection];

        updatePts(item.value, k);
        setGoodAns(newAns);
        setGoodQuest(newQuest);

        test.questions.map((item, ii) => {
          if (ii === k) {
            test.questions[k].pts = item.value;
          }
          return "";
        });
      } else if (item.questionName === question && theAnswer !== selection) {
        const newQuest = [...allQuest, question];
        const newAns = [...allAns, selection];
        updatePts(0, k);
        setAllAns(newAns);
        setAllQuest(newQuest);
        test.questions.map((item, ii) => {
          if (ii === k) {
            test.questions[k].pts = 0;
          }
          return "";
        });
      }
      return "";
    });
  };

  const renderPuntaje = () => {
    var acumPts = 0;
    test.questions.map((item) => {
      acumPts = acumPts + item.pts;
      return acumPts;
    });
    return acumPts;
  };

  const renderCheckQuestions = () => {
    if (test) {
      const checkQuestions = test.questions.map((item, k) => {
        return (
          <CheckItems
            key={k}
            numberQuestion={k + 1}
            wasClick={checkBoxClick}
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

  const sendForm = async () => {
    let puntos = renderPuntaje();
    let sumPts = [];
    sumPts = test.questions.map((val, i) => (sumPts = val.value));
    let puntaje = sumPts.reduce((a, b) => {
      return a + b;
    });

    let grade = ((puntos / puntaje) * 100).toFixed(2);

    try {
      setIsLoading(true);
      await theApi.postExam({
        theName: author,
        theId: authorId,
        totalPts: puntaje,
        testId: test._id,
        testName: test.testName,
        grade: grade,
        allAns: allAns,
        allPts: allPts,
        ansQuest: allQuest,
        goodAns: goodAns,
        goodQuest: goodQuest,
      });
      setIsLoading(false);
      history.push({
        pathname: "/checkOut",
      });
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <div
        style={{ margin: "0px auto 35px auto", padding: "55px 0px" }}
        className="pb-2 col-10"
      >
        <h3 className="theTitle">
          {test ? test.testName : "cargando titulo..."}{" "}
        </h3>
        {renderInstrucciones()}
        <p className="theTitle mt-4">
          <b>Estudiante: </b>
          {!author ? "..." : `${author.firstName} ${author.lastName}`}
        </p>

        <div>{renderCheckQuestions()}</div>

        <Button
          className="col-8 col-md-4 ml-auto mr-auto nextBtn mb-4"
          onClick={sendForm}
        >
          ENVIAR
          <span role="img" aria-label="star-dust">
            {" "}
            🚀
          </span>{" "}
          {!isLoading ? "" : <Spinner type="grow" color="warning" />}
        </Button>
      </div>
    </React.Fragment>
  );
};

TallerComponent.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(TallerComponent);
