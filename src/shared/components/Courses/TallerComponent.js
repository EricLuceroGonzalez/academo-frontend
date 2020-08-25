import React, { useEffect, useState, useContext } from "react";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";
import LoadingSpinner from "../UIElements/LoadingSpinner";
// import CheckItems from "./CheckItems";
import CheckItems from "../dashboard/CheckItems";
import { InlineMath, BlockMath } from "react-katex";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../UIElements/ErrorModal";
import "./Test.css";
import Button from "../../UIElements/Button";
import TimeClock from '../../UIElements/Time-Clock';

const TallerComponent = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [test, setTest] = useState("");
  const [badAns, setBadAns] = useState([]);
  const [badQuest, setBadQuest] = useState([]);
  const [goodAns, setGoodAns] = useState([]);
  const [goodQuest, setGoodQuest] = useState([]);

  const [allPts, setAllPts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    const getTest = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/test/getATest/${props.match.params.id}`,
          "GET"
        );
        setTest(data.test);
      } catch (err) {}
    };
    getTest();
  }, [sendRequest, auth.userId, props.match.params]);

  // useEffect(() => {
  //   allPts.map((item, k) => {
  //     if (typeof item === "undefined") {
  //       item = 0;
  //     }
  //   });
  // }, [allPts]);
  const renderInstrucciones = () => {
    if (!test) {
      return <div>...</div>;
    } else {
      return (
        <div className="col-10 col-md-4 instruct-box">
          <div className="instrucciones-label col-4">Instrucciones</div>
          <div className='col-10 mr-auto ml-auto'>{test.instructions}
            </div>
        </div>
      );
    }
  };

  const checkBoxClick = (e) => {
    const name = e.target.attributes.name.value;
    const theAnswer = e.target.id;
    let theValue = e.target.value;

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
      // find that question on test array
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
        const newQuest = [...badQuest, question];
        const newAns = [...badAns, selection];
        updatePts(0, k);
        setBadAns(newAns);
        setBadQuest(newQuest);
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
      if (item.pts !== item.value && item.pts !== 0) {
      } else if (item.pts !== item.value && item.pts === 0) {
        acumPts = acumPts + 0;
      } else {
        acumPts = acumPts + item.pts;
      }
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
            image={item.image}
            numberQuestion={k + 1}
            wasClick={checkBoxClick}
            value={item.value}
            values={item.options}
            question={
              item.isEquation ? (
                item.isInline ? (
                  <React.Fragment>
                    {item.question} <InlineMath math={`${item.equation}`} />{" "}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {item.question} <BlockMath math={`${item.equation}`} />{" "}
                  </React.Fragment>
                )
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

    if (allPts.includes(undefined)) {
      setErrorMessage("Hay respuestas sin marcar.");
      return;
    } else {
      let sumPts = [];
      sumPts = test.questions.map((val, i) => (sumPts = val.value));
      let puntaje = sumPts.reduce((a, b) => {
        return a + b;
      });
      let grade = ((puntos / puntaje) * 100).toFixed(2);
      try {
        const testInfo = {
          theId: auth.userId,
          totalPts: puntaje,
          testId: test._id,
          testName: test.testName,
          grade: grade,
          allPts: allPts,
          badAns: badAns,
          badQuest: badQuest,
          goodAns: goodAns,
          goodQuest: goodQuest,
        };
        await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/test/test",
          "POST",
          JSON.stringify(testInfo),
          { "Content-Type": "application/json" }
        );
        history.push("/checkOut");
      } catch (err) {}
    }
  };
  const errorHandle = () => {
    setErrorMessage("");
    clearError();
  };

  return (
    <React.Fragment>
      <div className="pb-2 col-12 test-header">
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error || errorMessage} onClear={errorHandle} />
        <h4 className="header-title">
          {test ? test.testName : "cargando titulo..."}{" "}
        </h4>
        <TimeClock />
        {renderInstrucciones()}
        <h6 className="col-8 col-md-4 test-userName">{auth.userName}</h6>

        <div className='col-12'>{renderCheckQuestions()}</div>

        <Button onClick={sendForm}>
          ENVIAR
          <span role="img" aria-label="star-dust">
            {" "}
            🚀
          </span>{" "}
        </Button>
      </div>
    </React.Fragment>
  );
};

export default TallerComponent;
