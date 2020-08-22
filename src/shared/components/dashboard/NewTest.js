import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faPlusCircle,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import { InlineMath, BlockMath } from "react-katex";
import { VALIDATOR_REQUIRE } from "../../utils/validators";
import { useForm } from "../../hooks/form-hook";
import InputForTest from "../../UIElements/InputForTest";
import Card from "../../UIElements/Card";
import "../UIElements/CheckBox.css";
import Button from "../../UIElements/Button";
import "./NewTest.css";
import CheckItems from "./CheckItems";

const NewTest = () => {
  const [questIsEquation, setQuestIsEquation] = useState(false);
  const [questIsInLine, setQuestIsInLine] = useState(true);
  const [ansIsEquation, setAnsIsEquation] = useState(false);
  const [ansIsInLine, setAnsIsInLine] = useState(true);
  const [optionIsEquation, setOptionIsEquation] = useState(false);
  const [addOptionDisable, setAddOptionDisable] = useState(false);
  const [addQuestionDisable, setAddQuestionDisable] = useState(false);
  const [optionIsInLine, setOptionIsInLine] = useState(false);
  const [question, setQuestion] = useState(ls.get("questions") || []);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log("QUESTIONS:");
    console.log(question);
  }, [question]);

  const [formState, inputHandler, setFormData] = useForm(
    {
      question: { value: "", isValid: false },
      options: { value: "", isValid: false },
      questionEquation: { value: "", isValid: false },
      questionPoints: { value: "", isValid: false },
      answerText: { value: "", isValid: false },
      answerEquation: { value: "", isValid: false },
      optionText: { value: "", isValid: false },
      optionEquation: { value: "", isValid: false },
      evaluation: { value: "", isValid: false },
      contents: { value: "", isValid: false },
      description: { value: "", isValid: false },
      instructions: { value: "", isValid: false },
      testName: { value: "", isValid: false },
    },
    false
  );

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

  const AddQuestion = () => {
    console.log("Add Question");

    question.push({
      isInline: questIsInLine,
      isEquation: questIsEquation,
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
    ClearFormState();
    ls.set("questions", question);
    setAddQuestionDisable(true);
    setTimeout(() => {
      setAddQuestionDisable(false);
    }, 500);

    console.log(question);
    console.log("---------------------");
    console.log(formState);
  };

  const ClearFormState = () => {
    setOptions([]);
    setFormData(
      {
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
        console.log(item);

        return (
          <CheckItems
            key={k}
            image={item.image}
            numberQuestion={k + 1}
            wasClick={() => {
              console.log(`Ans cliek ${item.questionName}`);
            }}
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
      return checkQuestions;
    }
  };
  const renderQuesstions = () => {
    return question.map((item, k) => {
      return (
        <div
          key={k}
          onClick={() => {
            formState.inputs.question.value = "JNNNN";
            console.log(`${item.questionName}, k = ${k}`);
          }}
          className="col-2 editQuestion"
        >
          {k + 1}
        </div>
      );
    });
  };

  const submitThisTest = () => {
    console.log("submitThisTest");
  };
  return (
    <React.Fragment>
      <div className="newTest-view">
        <h3>NewTest</h3>
        <Card className="newTest-box">
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
                isEquation
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
          <div className="bordeA row d-flex justify-content-around">
            {renderQuesstions()}
          </div>
          <div>{renderCheckQuestions()}</div>
          <div className="col-10 testName-box">
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
                isEquation
              </label>
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
            <InputForTest
            element="textarea"
            id="testName"
            type="text"
            label="Test Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Introduce al menos un apellido"
            onInput={inputHandler}
          />

          </div>
          <div>
            <Button
            disabled={!question.length <4}
              onClick={() => {
                submitThisTest();
              }}
            >
              ENVIAR <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewTest;
