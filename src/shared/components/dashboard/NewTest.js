import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPaperPlane,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import { InlineMath, BlockMath } from "react-katex";
import { VALIDATOR_REQUIRE } from "../../utils/validators";
import { useForm } from "../../hooks/form-hook";
import InputForTest from "../../UIElements/InputForTest";
import Card from "../../UIElements/Card";
import Button from "../../UIElements/Button";
import CheckItems from "./CheckItems";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import ErrorModal from "../../UIElements/ErrorModal";
import "../../UIElements/CheckBox.css";
import "./NewTest.css";
import { useHistory } from "react-router-dom";
import Input from "../../UIElements/Input";

const NewTest = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const [questIsEquation, setQuestIsEquation] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [evaluationType, setEvaluationType] = useState("");
  const [questIsInLine, setQuestIsInLine] = useState(true);
  const [ansIsEquation, setAnsIsEquation] = useState(false);
  const [ansIsInLine, setAnsIsInLine] = useState(true);
  const [optionIsEquation, setOptionIsEquation] = useState(false);
  const [addOptionDisable, setAddOptionDisable] = useState(false);
  const [addQuestionDisable, setAddQuestionDisable] = useState(false);
  const [optionIsInLine, setOptionIsInLine] = useState(true);
  const [disabledSentButton, setDisabledSentButton] = useState(true);
  const [question, setQuestion] = useState(ls.get("questions") || []);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    ls.set("questions", question);
    if (question.length > 0) {
      console.log("QUESTIONS:");
      console.log(question);
    }

    if (options.length > 0) {
      console.log("OPTIONS :");
      console.log(options);
    }
  }, [options, question]);

  const [formState, inputHandler, setFormData] = useForm(
    {
      question: { value: "", isValid: false },
      options: { value: "", isValid: false },
      questionEquation: { value: "", isValid: false },
      questionImage: { value: "", isValid: false },
      questionPoints: { value: "", isValid: false },
      answerText: { value: "", isValid: false },
      answerEquation: { value: "", isValid: false },
      optionText: { value: "", isValid: false },
      optionEquation: { value: "", isValid: false },
      contents: { value: "", isValid: false },
      description: { value: "", isValid: false },
      instructions: { value: "", isValid: false },
      testName: { value: "", isValid: false },
      subject: { value: "", isValid: false },
    },
    false
  );
  useEffect(
    () => {      
      if (formState.inputs.subject) {
        
if (formState.inputs.subject.value === 'Física II') {
  setCourseName('6007d846171d200004b52397')
}
if (formState.inputs.subject.value === 'Matemática II') {
  setCourseName('5f310a910689020004a5a097')
}
      }

      
    },[formState])
  useEffect(() => {
    if (evaluationType) {
      if (evaluationType !== "" && question.length > 1) {
        console.log("here");

        setDisabledSentButton(false);
      }
      console.log("here!!");
    }

    // return () => {
    //   setQuestion([]);
    // };
  }, [question.length, evaluationType, formState]);

  const AddOption = () => {
    console.log("\nAdd Option");
    options.push({
      isInline: optionIsInLine,
      isEquation: optionIsEquation,
      equation: formState.inputs.optionEquation.value,
      text: formState.inputs.optionText.value,
    });
    setAddOptionDisable(true);
    setTimeout(() => {
      setAddOptionDisable(false);
    }, 500);
    console.log(options);
  };

  const AddQuestion = async () => {
    console.log("Add Question");

    question.push({
      isInline: questIsInLine,
      isEquation: questIsEquation,
      questionImage: formState.inputs.questionImage.value,
      equation: formState.inputs.questionEquation.value,
      questionName: `question${question.length + 1}`,
      question: formState.inputs.question.value,
      answer: {
        isInline: ansIsInLine,
        isEquation: ansIsEquation,
        equation: formState.inputs.answerEquation.value,
        text: formState.inputs.answerText.value,
      },
      pts: formState.inputs.questionPoints.value,
      options: options,
    });
    setOptions([]);
    setAddQuestionDisable(true);
    setTimeout(() => {
      setAddQuestionDisable(false);
    }, 500);

    console.log(question);
    console.log("---------------------");
    console.log(formState);
  };

  const ClearFormState = async () => {
    setOptions([]);
    await ls.remove("questions");
    setFormData(
      {
        questionImage: { value: "", isValid: false },
        question: { value: "", isValid: false },
        options: { value: "", isValid: false },
        questionEquation: { value: "", isValid: false },
        questionPoints: { value: "", isValid: false },
        answerText: { value: "", isValid: false },
        answerEquation: { value: "", isValid: false },
        optionText: { value: "", isValid: false },
        optionEquation: { value: "", isValid: false },
      },
      false
    );
  };

  const renderCheckQuestions = () => {
    if (question) {
      const checkQuestions = question.map((item, k) => {
        return (
          <CheckItems
            key={k}
            image={item.image}
            numberQuestion={k + 1}
            value={item.pts}
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
      // console.log(checkQuestions);

      return checkQuestions;
    }
  };
  const renderQuesstions = () => {
    return question.map((item, k) => {
      return (
        <div
          key={k}
          onClick={() => {
            console.log(`${item.questionName}, k = ${k}`);
          }}
          className="col-2 editQuestion"
        >
          {k + 1}
        </div>
      );
    });
  };

  const submitThisTest = async () => {
    // console.log("submitThisTest");
    // console.log(question);
    // console.log(typeof(courseName));
    
    const test = {
      questions: question,
      evaluation: evaluationType,
      contents: formState.inputs.contents.value,
      description: formState.inputs.description.value,
      instructions: formState.inputs.instructions.value,
      testName: formState.inputs.testName.value,
      subject: courseName,
    };
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/test/newTest",
        "POST",
        JSON.stringify(test),
        { "Content-Type": "application/json" }
      );
      await ClearFormState();
      await history.push("/dashboard");
    } catch (err) {}
  };

  const errorHandler = () => {
    clearError();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}

      <div className="newTest-view">
        <h3>NewTest</h3>
        <Card className="newTest-box">
          <div className="col-12 col-sm-4">
            <input
              className="checkIt"
              type="checkbox"
              id="inlineCheckbox0"
              value="option0"
              onClick={() => {
                setHasImage(!hasImage);
              }}
            />
            <label
              className="form-check-label checkMark"
              htmlFor="inlineCheckbox0"
            >
              has Image
            </label>
          </div>

          {hasImage && (
            <div>
              <InputForTest
                element="input"
                id="questionImage"
                type="text"
                label="Image link"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Introduce al menos un valor"
                onInput={inputHandler}
              />
              <div className="image-card-container">
                <div className="col-10">
                  <img
                    className="main-image"
                    src={formState.inputs.questionImage.value}
                    alt="This is a terrible description!"
                  />
                </div>
              </div>
            </div>
          )}
               <div className="col-4 col-sm-4">
              <InputForTest
                element="input"
                id="questionPoints"
                type="number"
                label="Pts"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Introduce al menos un apellido"
                onInput={inputHandler}
              />
            </div>
          <InputForTest
            element="input"
            id="question"
            type="text"
            label="Question"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Introduce al menos un apellido"
            onInput={inputHandler}
          />

          <div className="row d-flex mt-2">
      
            <div className="col-12 col-sm-4 mt-3">
              <input
                className="checkIt"
                type="checkbox"
                id="inlineCheckbox1"
                value="option1"
                onClick={() => {
                  setQuestIsEquation(!questIsEquation);
                }}
              />
              <label
                className="form-check-label checkMark"
                htmlFor="inlineCheckbox1"
              >
                Q isEquation?
              </label>
            </div>
            <div className="col-12 col-sm-4 mt-3">
              <input
                className="checkIt"
                type="checkbox"
                checked={questIsInLine}
                id="inlineCheckbox2"
                value="option1"
                onClick={() => {
                  setQuestIsInLine(!questIsInLine);
                }}
                onChange={() => {
                  setQuestIsInLine(!questIsInLine);
                }}
              />
              <label
                className="form-check-label checkMark"
                htmlFor="inlineCheckbox2"
              >
                IsInLine
              </label>
            </div>
          </div>
          {questIsEquation && (
            <div>
              <InputForTest
                element="input"
                id="questionEquation"
                type="text"
                label="Question Equation"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Introduce al menos un apellido"
                onInput={inputHandler}
              />
            </div>
          )}
          <hr></hr>
          <h6>Answer</h6>
          <div className="col-12 row d-flex mt-2">
            <div className="col-4 col-sm-4 mt-4">
              <input
                className="checkIt"
                type="checkbox"
                id="inlineCheckbox3"
                value="option3"
                onClick={() => {
                  setAnsIsEquation(!ansIsEquation);
                }}
              />
              <label
                className="form-check-label checkMark"
                htmlFor="inlineCheckbox3"
              >
                isEquation
              </label>
            </div>
            <div className="col-4 col-sm-4 mt-4">
              <input
                className="checkIt"
                type="checkbox"
                checked={ansIsInLine}
                id="inlineCheckbox4"
                value="option1"
                onClick={() => {
                  setAnsIsInLine(!ansIsInLine);
                }}
                onChange={() => {
                  setAnsIsInLine(!ansIsInLine);
                }}
              />
              <label
                className="form-check-label checkMark"
                htmlFor="inlineCheckbox4"
              >
                IsInLine
              </label>
            </div>
            <div className="col-4 col-sm-4 mt-4 row d-flex justify-content-around">
              {formState.inputs.answerText.value &&
                formState.inputs.answerText.value ===
                  formState.inputs.optionText.value && (
                  <div className="good-check">
                    Txt: <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                )}
              {formState.inputs.answerEquation.value !== "" &&
                formState.inputs.answerEquation.value ===
                  formState.inputs.optionEquation.value && (
                  <div className="good-check">
                    Eqn: <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                )}
            </div>
          </div>
          <InputForTest
            element="input"
            id="answerText"
            type="text"
            label="Text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Introduce al menos un apellido"
            onInput={inputHandler}
          />

          {ansIsEquation && (
            <div>
              <InputForTest
                element="input"
                id="answerEquation"
                type="text"
                label="Answer Equation"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Introduce al menos un apellido"
                onInput={inputHandler}
              />
            </div>
          )}
          <hr></hr>
          <h5>Option</h5>
          <div className="col-12 row d-flex mt-2">
            <div className="col-4 col-sm-4 mt-4">
              <input
                className="checkIt"
                type="checkbox"
                id="inlineCheckbox5"
                value="option3"
                onClick={() => {
                  setOptionIsEquation(!optionIsEquation);
                }}
              />
              <label
                className="form-check-label checkMark"
                htmlFor="inlineCheckbox5"
              >
                isEquation
              </label>
            </div>
            <div className="col-4 col-sm-4 mt-4">
              <input
                className="checkIt"
                type="checkbox"
                id="inlineCheckbox6"
                defaultChecked={optionIsInLine}
                value="option1"
                onClick={() => {
                  setOptionIsInLine(!optionIsInLine);
                }}
              />
              <label
                className="form-check-label checkMark"
                htmlFor="inlineCheckbox6"
              >
                IsInLine
              </label>
            </div>
          </div>
          <InputForTest
            element="input"
            id="optionText"
            type="text"
            label="Text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Introduce al menos un apellido"
            onInput={inputHandler}
          />
          {optionIsEquation && (
            <div>
              <InputForTest
                element="input"
                id="optionEquation"
                type="text"
                label="Option Equation"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Introduce al menos un apellido"
                onInput={inputHandler}
              />
            </div>
          )}
          <div className="col-12 mt-4 d-flex align-items-end">
            <div>
              <Button
                size={"small"}
                inverse
                disabled={
                  addOptionDisable || !formState.inputs.optionText.isValid
                }
                onClick={() => {
                  AddOption();
                }}
              >
                Add Option <FontAwesomeIcon icon={faPlusCircle} />{" "}
              </Button>
            </div>
          </div>
          <div className="col-12 mt-4 d-flex justify-content-center">
            <div>
              <Button
                size={"small"}
                disabled={addQuestionDisable || options.length === 0}
                onClick={() => {
                  AddQuestion();
                }}
              >
                Add Question <FontAwesomeIcon icon={faPlusCircle} />{" "}
              </Button>
            </div>
          </div>
        </Card>

        <div className="newQuestion-box">
          <div className="row d-flex justify-content-around">
            {renderQuesstions()}
          </div>
          <div>{renderCheckQuestions()}</div>

          <div className="col-10 testName-box">
            <div className="row d-flex">
              <div className="col-12 col-sm-4 mt-3">
                <input
                  className="checkIt"
                  type="checkbox"
                  id="inlineCheckbox7"
                  value="option1"
                  onClick={() => {
                    setEvaluationType("taller");
                  }}
                />
                <label
                  className="form-check-label checkMark"
                  htmlFor="inlineCheckbox7"
                >
                  Taller
                </label>
              </div>
              <div className="col-12 col-sm-4 mt-3">
                <input
                  className="checkIt"
                  type="checkbox"
                  id="inlineCheckbox8"
                  value={evaluationType}
                  onClick={() => {
                    setEvaluationType("parcial");
                  }}
                />
                <label
                  className="form-check-label checkMark"
                  htmlFor="inlineCheckbox8"
                >
                  Parcial
                </label>
              </div>
              <div
                className={`col-12 col-sm-4 mt-3 ${
                  evaluationType === "taller" ? "red-text" : "green-text"
                }`}
              >
                {evaluationType}
              </div>
            </div>
            <InputForTest
              element="input"
              id="contents"
              type="text"
              label="Contents"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Introduce al menos un apellido"
              onInput={inputHandler}
            />
            <InputForTest
              element="input"
              id="testName"
              type="text"
              label="Test Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Introduce al menos un apellido"
              onInput={inputHandler}
            />
            <InputForTest
              element="input"
              id="description"
              type="text"
              label="Description"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Introduce al menos un apellido"
              onInput={inputHandler}
            />
            <InputForTest
              element="textarea"
              id="instructions"
              type="text"
              label="Instructions"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Introduce al menos un apellido"
              onInput={inputHandler}
            />

<div className='mt-5'>
<Input
                id="subject"
                element="select"
                type="select"
                name="subject"
                label="Materia"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Seleccione su asignatura"
                onInput={inputHandler}
              ></Input>
</div>
          </div>
          <div>
            <Button
              onClick={() => {
                console.log(question);
              }}
            >
              VER <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
            <Button
              disabled={disabledSentButton}
              onClick={() => {
                submitThisTest();
              }}
            >
              ENVIAR <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>
        </div>
        <div className="col-10 col-md-6 danger-zone">
          <Button
            danger
            onClick={() => {
              ls.remove("questions");
              ClearFormState();
            }}
          >
            clear all
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewTest;
