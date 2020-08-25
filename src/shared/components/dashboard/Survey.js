import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import ls from "local-storage";
import "./Survey.css";
import {
  faInfoCircle,
  faPaperPlane,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../UIElements/Button";
import ErrorModal from "../../UIElements/ErrorModal";
import { useAuth } from "../../hooks/auth-hook";
import { AuthContext } from "../../context/auth-context";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../UIElements/LoadingSpinner";

const Survey = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useAuth(AuthContext);
  const [toggleSurvey, setToggleSurvey] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const [personal, setPersonal] = useState(
    ls.get("personal") || {
      genre: "",
      ageRange: "",
    }
  );
  const [academic, setAcademic] = useState(
    ls.get("academic") || {
      firstSemester: { subjects: "", failed: "", approvedPre: true },
      secondSemester: { subjects: "", firstTime: true },
    }
  );
  const [homeConnection, setHomeConnection] = useState(
    ls.get("homeConnection") || {
      conectionType: { data: false, wifi: false, mixed: false },
      equipmentAmount: 0,
      equipmentUsers: 0,
    }
  );
  const [family, setFamily] = useState(
    ls.get("family") || {
      students: 0,
      habitants: 0,
      telejob: 0,
      bonosolidario: false,
      water: true,
      covid: false,
    }
  );

  useEffect(() => {
    if (personal.genre === "") {
      setButtonDisable(true);
    }
    if (personal.ageRange === "") {
      setButtonDisable(true);
    }
    if (academic.firstSemester.subjects === "") {
      setButtonDisable(true);
    }
    if (academic.secondSemester.subjects === "") {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [personal, academic]);

  // Persist data trough localStorage
  useEffect(() => {
    ls.set("personal", personal);
  }, [personal]);
  useEffect(() => {
    ls.set("academic", academic);
  }, [academic]);
  useEffect(() => {
    ls.set("homeConnection", homeConnection);
  }, [homeConnection]);
  useEffect(() => {
    ls.set("family", family);
  }, [family]);

  const submitSurvey = async () => {
    if (personal.genre === "") {
      setErrorMessage("Debes seleccionar un genero");
    }
    if (personal.ageRange === "") {
      setErrorMessage("Debes seleccionar un rango de edad");
    }
    if (academic.firstSemester.subjects === "") {
      setErrorMessage(
        "Debes seleccionar la cantidad de materias del primer semestre"
      );
    }
    if (academic.secondSemester.subjects === "") {
      setErrorMessage(
        "Debes seleccionar la cantidad de materias del segundo semestre"
      );
    } else {
      setButtonDisable(false);
    }

    try {
      // Clean localStorage
      ls.remove("academic");
      ls.remove("family");
      ls.remove("homeConnection");
      ls.remove("personal");
      const surveyData = {
        filledBy: auth.userId,
        personal: {
          genre: personal.genre,
          ageRange: personal.ageRange,
        },
        academic: {
          firstSemester: {
            subjects: academic.firstSemester.subjects,
            failed: academic.firstSemester.failed,
            approvedPre: academic.firstSemester.approvedPre,
          },
          secondSemester: {
            subjects: academic.secondSemester.subjects,
            firstTime: academic.secondSemester.firstTime,
          },
        },
        homeConnection: {
          conectionType: {
            data: homeConnection.conectionType.data,
            wifi: homeConnection.conectionType.wifi,
            mixed: homeConnection.conectionType.mixed,
          },
          equipmentAmount: homeConnection.equipmentAmount,
          equipmentUsers: homeConnection.equipmentUsers,
        },
        family: {
          students: family.students,
          habitants: family.habitants,
          telejob: family.telejob,
          bonosolidario: family.bonosolidario,
          water: family.water,
          covid: family.covid,
        },
      };
      setButtonDisable(true);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/user/postSurvey",
        "POST",
        JSON.stringify(surveyData),
        { "Content-Type": "application/json" }
      );
      history.push("/dashboard");
    } catch (err) {
      setButtonDisable(false);
      setErrorMessage(err);
    }
    history.push("/dashboard");
  };

  const errorHandler = () => {
    clearError();
    setErrorMessage(false);
  };
  return (
    <div className="col-12 col-sm-8 col-md-6 mr-auto ml-auto allquestion">
      <ErrorModal error={error || errorMessage} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div>
        <h2>Encuesta</h2>
        <div className="info-box col-12 row d-flex align-items-middle">
          <div className="col-12 info-logo">
            <FontAwesomeIcon icon={faInfoCircle} />{" "}
          </div>
          <div className="col-12 mr-auto ml-auto info-text">
            La siguiente encuesta es aplicada con el fin de conocer a los
            estudiantes del curso y su situación actual, que claramente influye
            en su desempeño en el mismo.
            <br></br>
            La encuesta tiene la características que se numeran a continuación:
            <ol>
              <li>
                <span className="underscore-question">
                  SOLO LA PUEDES LLENAR UNA VEZ
                </span>
                <span role="img" aria-label="star-dust">
                  ☝️
                </span>
              </li>
              <li>
                Son 18 preguntas de selección
                <span role="img" aria-label="star-dust">
                  {" "}
                  🧮
                </span>
              </li>
              <li>
                Las respuestas son anónimas
                <span role="img" aria-label="star-dust">
                  {" "}
                  🕵️
                </span>
              </li>
              <li>
                Usa la honestidad, para reflejar datos verdaderos.
                <span role="img" aria-label="star-dust">
                  {" "}
                  🙂
                </span>
              </li>
              <li>
                Son preguntas sencillas y rápidas
                <span role="img" aria-label="star-dust">
                  {" "}
                  🥤
                </span>
              </li>
              <li>
                Los ajustes durante el semestre pueden estar basados en ellas
                <span role="img" aria-label="star-dust">
                  {" "}
                  🔧
                </span>
              </li>
              <li>
                Se responde con información que tenemos a mano
                <span role="img" aria-label="star-dust">
                  {" "}
                  🖐️
                </span>
              </li>
              <li>
                El sistema guarda las respuestas, sin hacer referencia al autor.
                Es decir, es 100% anónimo y de uso personal.
                <span role="img" aria-label="star-dust">
                  {" "}
                  🔒
                </span>
              </li>
              <li>
                Es necesario completarla para acceder al contenido de la pagina.
                <span role="img" aria-label="star-dust">
                  {" "}
                  🕮
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
      {!toggleSurvey && (
        <div>
          <Button inverse onClick={() => setToggleSurvey(true)}>
            VER ENCUESTA <FontAwesomeIcon icon={faChevronCircleRight} />
          </Button>
        </div>
      )}
      {toggleSurvey && (
        <React.Fragment>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>Género</h6>
              <p>Selecciones su género</p>
            </div>
            <div
              className={`col-4 questionBox ${
                personal.genre === "hombre" ? "question-selected" : ""
              }`}
              onClick={() => {
                setPersonal((prevState) => ({
                  ...prevState,
                  genre: "hombre",
                }));
              }}
            >
              hombre
            </div>
            <div
              className={`col-4 questionBox
          ${personal.genre === "mujer" ? "question-selected" : ""}`}
              onClick={() => {
                setPersonal((prevState) => ({
                  ...prevState,
                  genre: "mujer",
                }));
              }}
            >
              mujer
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>Rango de edad</h6>
              <p>
                Elija su rango de edad de acuerdo a los siguientes intervalos
              </p>
            </div>
            <div
              className={`col-2 questionBox           ${
                personal.ageRange === "16-17" ? "question-selected" : ""
              }
          `}
              onClick={() => {
                setPersonal((prevState) => ({
                  ...prevState,
                  ageRange: "16-17",
                }));
              }}
            >
              16-17
            </div>
            <div
              className={`col-2 questionBox ${
                personal.ageRange === "18-19" ? "question-selected" : ""
              }`}
              onClick={() => {
                setPersonal((prevState) => ({
                  ...prevState,
                  ageRange: "18-19",
                }));
              }}
            >
              18-19
            </div>
            <div
              className={`col-2 questionBox ${
                personal.ageRange === "20-21" ? "question-selected" : ""
              }`}
              onClick={() => {
                setPersonal((prevState) => ({
                  ...prevState,
                  ageRange: "20-21",
                }));
              }}
            >
              20-21
            </div>
            <div
              className={`col-2 questionBox ${
                personal.ageRange === "22-23" ? "question-selected" : ""
              }`}
              onClick={() => {
                setPersonal((prevState) => ({
                  ...prevState,
                  ageRange: "22-23",
                }));
              }}
            >
              22-23
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>Materias matriculadas en el primer semestre</h6>
              <p>
                Elija la cantidad de materias que se aproxima a las matriculadas
                en el primer semestre{" "}
              </p>
            </div>
            <div
              className={`col-2 questionBox
          ${
            academic.firstSemester.subjects === "0" ? "question-selected" : ""
          }`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: {
                    subjects: "0",
                    failed: academic.firstSemester.failed,
                    approvedPre: academic.firstSemester.approvedPre,
                  },
                  secondSemester: academic.secondSemester,
                }));
              }}
            >
              0
            </div>
            <div
              className={`col-2 questionBox
          ${
            academic.firstSemester.subjects === "1" ? "question-selected" : ""
          }`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: {
                    subjects: "1",
                    failed: academic.firstSemester.failed,
                    approvedPre: academic.firstSemester.approvedPre,
                  },
                  secondSemester: academic.secondSemester,
                }));
              }}
            >
              1
            </div>
            <div
              className={`col-2 questionBox
          ${
            academic.firstSemester.subjects === "2-3" ? "question-selected" : ""
          }`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: {
                    subjects: "2-3",
                    failed: academic.firstSemester.failed,
                    approvedPre: academic.firstSemester.approvedPre,
                  },
                  secondSemester: academic.secondSemester,
                }));
              }}
            >
              2-3
            </div>
            <div
              className={`col-2 questionBox
          ${
            academic.firstSemester.subjects === "4-6" ? "question-selected" : ""
          }`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: {
                    subjects: "4-6",
                    failed: academic.firstSemester.failed,
                    approvedPre: academic.firstSemester.approvedPre,
                  },
                  secondSemester: academic.secondSemester,
                }));
              }}
            >
              4-6
            </div>
            <div
              className={`col-2 questionBox
          ${
            academic.firstSemester.subjects === "6+" ? "question-selected" : ""
          }`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: {
                    subjects: "6+",
                    failed: academic.firstSemester.failed,
                    approvedPre: academic.firstSemester.approvedPre,
                  },
                  secondSemester: academic.secondSemester,
                }));
              }}
            >
              6+
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>Materias no aprobadas en el primer semestre</h6>
              <p>
                Elija la cantidad de materias que no aprobó en el primer
                semestre{" "}
              </p>
            </div>
            <div
              className={`col-2 questionBox
        ${academic.firstSemester.failed === "0" ? "question-selected" : ""}`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: {
                    subjects: academic.firstSemester.subjects,
                    failed: "0",
                    approvedPre: academic.firstSemester.approvedPre,
                  },
                  secondSemester: academic.secondSemester,
                }));
              }}
            >
              0
            </div>
            <div
              className={`col-2 questionBox
          ${academic.firstSemester.failed === "1" ? "question-selected" : ""}`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: {
                    subjects: academic.firstSemester.subjects,
                    failed: "1",
                    approvedPre: academic.firstSemester.approvedPre,
                  },
                  secondSemester: academic.secondSemester,
                }));
              }}
            >
              1
            </div>
            <div
              className={`col-2 questionBox
          ${
            academic.firstSemester.failed === "2-3" ? "question-selected" : ""
          }`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: {
                    subjects: academic.firstSemester.subjects,
                    failed: "2-3",
                    approvedPre: academic.firstSemester.approvedPre,
                  },
                  secondSemester: academic.secondSemester,
                }));
              }}
            >
              2-3
            </div>
            <div
              className={`col-2 questionBox
          ${
            academic.firstSemester.failed === "4-6" ? "question-selected" : ""
          }`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: {
                    subjects: academic.firstSemester.subjects,
                    failed: "4-6",
                    approvedPre: academic.firstSemester.approvedPre,
                  },
                  secondSemester: academic.secondSemester,
                }));
              }}
            >
              4-6
            </div>
            <div
              className={`col-2 questionBox
          ${academic.firstSemester.failed === "6+" ? "question-selected" : ""}`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: {
                    subjects: academic.firstSemester.subjects,
                    failed: "6+",
                    approvedPre: academic.firstSemester.approvedPre,
                  },
                  secondSemester: academic.secondSemester,
                }));
              }}
            >
              6+
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>La primera parte de esta asignatura</h6>
              <p>
                La siguiente pregunta se refiere a si usted aprobó la primera
                parte de esta asignatura (matemática 1){" "}
              </p>
            </div>
            <div
              className={`col-2 questionBox
          ${academic.firstSemester.approvedPre ? "question-selected" : ""}`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: {
                    subjects: academic.firstSemester.subjects,
                    failed: academic.firstSemester.failed,
                    approvedPre: true,
                  },
                  secondSemester: academic.secondSemester,
                }));
              }}
            >
              Sí
            </div>
            <div
              className={`col-2 questionBox
          ${!academic.firstSemester.approvedPre ? "question-selected" : ""}`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: {
                    subjects: academic.firstSemester.subjects,
                    failed: academic.firstSemester.failed,
                    approvedPre: false,
                  },
                  secondSemester: academic.secondSemester,
                }));
              }}
            >
              No
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>¿Es primera vez que da esta asignatura?</h6>
              <p>Seleccione 'no' si nunca ha dado esta asignatura.</p>
            </div>
            <div
              className={`col-2 questionBox
          ${academic.secondSemester.firstTime ? "question-selected" : ""}`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: academic.firstSemester,
                  secondSemester: {
                    subjects: academic.secondSemester.subjects,
                    firstTime: true,
                  },
                }));
              }}
            >
              Sí
            </div>
            <div
              className={`col-2 questionBox
          ${!academic.secondSemester.firstTime ? "question-selected" : ""}`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: academic.firstSemester,
                  secondSemester: {
                    subjects: academic.secondSemester.subjects,
                    firstTime: false,
                  },
                }));
              }}
            >
              No
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>Materias matriculadas en el segundo semestre</h6>
              <p>
                Elija la cantidad de materias que se aproxima a las matriculadas
                en el segundo semestre{" "}
              </p>
            </div>
            <div
              className={`col-2 questionBox
          ${
            academic.secondSemester.subjects === "1" ? "question-selected" : ""
          }`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: academic.firstSemester,
                  secondSemester: {
                    subjects: "1",
                    firstTime: academic.secondSemester.firstTime,
                  },
                }));
              }}
            >
              1
            </div>
            <div
              className={`col-2 questionBox
          ${
            academic.secondSemester.subjects === "2-3"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: academic.firstSemester,
                  secondSemester: {
                    subjects: "2-3",
                    firstTime: academic.secondSemester.firstTime,
                  },
                }));
              }}
            >
              2-3
            </div>
            <div
              className={`col-2 questionBox
          ${
            academic.secondSemester.subjects === "4-6"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: academic.firstSemester,
                  secondSemester: {
                    subjects: "4-6",
                    firstTime: academic.secondSemester.firstTime,
                  },
                }));
              }}
            >
              4-6
            </div>
            <div
              className={`col-2 questionBox
          ${
            academic.secondSemester.subjects === "6+" ? "question-selected" : ""
          }`}
              onClick={() => {
                setAcademic((prevState) => ({
                  ...prevState,
                  firstSemester: academic.firstSemester,
                  secondSemester: {
                    subjects: "6+",
                    firstTime: academic.secondSemester.firstTime,
                  },
                }));
              }}
            >
              6+
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>
                Uso y disponibilidad de{" "}
                <span className="underscore-question">Data Celular</span>
              </h6>
              <p>
                Para conectarse a sus clases en linea, durante el segundo
                semestre, elija la frecuencia con la que utilizara la conexión
                mediante{" "}
                <span className="underscore-question">
                  {" "}
                  data o planes pre-pago de teléfonos celulares
                </span>
                .
              </p>
            </div>
            <div
              className={`col-3 questionBox
          ${
            homeConnection.conectionType.data === "casi nunca"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  conectionType: {
                    data: "casi nunca",
                    wifi: homeConnection.conectionType.wifi,
                    mixed: homeConnection.conectionType.mixed,
                  },
                }));
              }}
            >
              casi nunca
            </div>
            <div
              className={`col-3 questionBox
          ${
            homeConnection.conectionType.data === "algunas veces"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  conectionType: {
                    data: "algunas veces",
                    wifi: homeConnection.conectionType.wifi,
                    mixed: homeConnection.conectionType.mixed,
                  },
                }));
              }}
            >
              algunas veces
            </div>
            <div
              className={`col-3 questionBox
          ${
            homeConnection.conectionType.data === "casi siempre"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  conectionType: {
                    data: "casi siempre",
                    wifi: homeConnection.conectionType.wifi,
                    mixed: homeConnection.conectionType.mixed,
                  },
                }));
              }}
            >
              casi siempre
            </div>
            <div
              className={`col-3 questionBox
          ${
            homeConnection.conectionType.data === "siempre"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  conectionType: {
                    data: "siempre",
                    wifi: homeConnection.conectionType.wifi,
                    mixed: homeConnection.conectionType.mixed,
                  },
                }));
              }}
            >
              siempre
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>
                Uso y disponibilidad de{" "}
                <span className="underscore-question">Wi-Fi en casa</span>
              </h6>
              <p>
                Para conectarse a sus clases en linea, durante el segundo
                semestre, elija la frecuencia con la que utilizara la conexión
                mediante{" "}
                <span className="underscore-question"> Wi-Fi en casa</span>.
              </p>
            </div>
            <div
              className={`col-3 questionBox
          ${
            homeConnection.conectionType.wifi === "casi nunca"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  conectionType: {
                    data: homeConnection.conectionType.data,
                    wifi: "casi nunca",
                    mixed: homeConnection.conectionType.mixed,
                  },
                }));
              }}
            >
              casi nunca
            </div>
            <div
              className={`col-3 questionBox
          ${
            homeConnection.conectionType.wifi === "algunas veces"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  conectionType: {
                    data: homeConnection.conectionType.data,
                    wifi: "algunas veces",
                    mixed: homeConnection.conectionType.mixed,
                  },
                }));
              }}
            >
              algunas veces
            </div>
            <div
              className={`col-3 questionBox
          ${
            homeConnection.conectionType.wifi === "casi siempre"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  conectionType: {
                    data: homeConnection.conectionType.data,
                    wifi: "casi siempre",
                    mixed: homeConnection.conectionType.mixed,
                  },
                }));
              }}
            >
              casi siempre
            </div>
            <div
              className={`col-3 questionBox
          ${
            homeConnection.conectionType.wifi === "siempre"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  conectionType: {
                    data: homeConnection.conectionType.data,
                    wifi: "siempre",
                    mixed: homeConnection.conectionType.mixed,
                  },
                }));
              }}
            >
              siempre
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>
                Uso y disponibilidad de{" "}
                <span className="underscore-question">
                  Wi-Fi y Data celular
                </span>
              </h6>
              <p>
                Para conectarse a sus clases en linea, durante el segundo
                semestre, elija la frecuencia con la que utilizara (de manera
                alterna y según este disponible en el momento) la conexión
                mediante{" "}
                <span className="underscore-question">
                  {" "}
                  los dos sistemas de las preguntas anteriores
                </span>
                .
              </p>
            </div>
            <div
              className={`col-3 questionBox
          ${
            homeConnection.conectionType.mixed === "casi nunca"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  conectionType: {
                    data: homeConnection.conectionType.data,
                    mixed: "casi nunca",
                    wifi: homeConnection.conectionType.wifi,
                  },
                }));
              }}
            >
              casi nunca
            </div>
            <div
              className={`col-3 questionBox
          ${
            homeConnection.conectionType.mixed === "algunas veces"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  conectionType: {
                    data: homeConnection.conectionType.data,
                    mixed: "algunas veces",
                    wifi: homeConnection.conectionType.wifi,
                  },
                }));
              }}
            >
              algunas veces
            </div>
            <div
              className={`col-3 questionBox
          ${
            homeConnection.conectionType.mixed === "casi siempre"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  conectionType: {
                    data: homeConnection.conectionType.data,
                    mixed: "casi siempre",
                    wifi: homeConnection.conectionType.wifi,
                  },
                }));
              }}
            >
              casi siempre
            </div>
            <div
              className={`col-3 questionBox
          ${
            homeConnection.conectionType.mixed === "siempre"
              ? "question-selected"
              : ""
          }`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  conectionType: {
                    data: homeConnection.conectionType.data,
                    mixed: "siempre",
                    wifi: homeConnection.conectionType.wifi,
                  },
                }));
              }}
            >
              siempre
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>Equipo disponible en casa</h6>
              <p>
                Para conectarse a sus clases en linea, durante el segundo
                semestre, elija la{" "}
                <span className="underscore-question">
                  cantidad de equipo disponible en casa
                </span>{" "}
                (computadora o teléfono, etc) que tiene a disposición para
                conectarse. .
              </p>
            </div>
            <div
              className={`col-2 questionBox
          ${homeConnection.equipmentAmount === 0 ? "question-selected" : " "}`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  equipmentAmount: 0,
                }));
              }}
            >
              0
            </div>
            <div
              className={`col-2 questionBox
          ${homeConnection.equipmentAmount === 1 ? "question-selected" : " "}`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  equipmentAmount: 1,
                }));
              }}
            >
              1
            </div>
            <div
              className={`col-2 questionBox
          ${homeConnection.equipmentAmount === 2 ? "question-selected" : " "}`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  equipmentAmount: 2,
                }));
              }}
            >
              2
            </div>
            <div
              className={`col-2 questionBox
          ${homeConnection.equipmentAmount === 3 ? "question-selected" : " "}`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  equipmentAmount: 3,
                }));
              }}
            >
              3
            </div>
            <div
              className={`col-2 questionBox
          ${homeConnection.equipmentAmount === 4 ? "question-selected" : " "}`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  equipmentAmount: 4,
                }));
              }}
            >
              4
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>Equipo disponible en casa</h6>
              <p>
                Del equipo seleccionado en la pregunta anterior, seleccione, las
                personas que tambien lo utilizan durante el dia (en sus clases o
                teletrabajo).
              </p>
            </div>
            <div
              className={`col-2 questionBox
          ${homeConnection.equipmentUsers === 0 ? "question-selected" : " "}`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  equipmentUsers: 0,
                }));
              }}
            >
              0
            </div>
            <div
              className={`col-2 questionBox
          ${homeConnection.equipmentUsers === 1 ? "question-selected" : " "}`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  equipmentUsers: 1,
                }));
              }}
            >
              1
            </div>
            <div
              className={`col-2 questionBox
          ${homeConnection.equipmentUsers === 2 ? "question-selected" : " "}`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  equipmentUsers: 2,
                }));
              }}
            >
              2
            </div>
            <div
              className={`col-2 questionBox
          ${homeConnection.equipmentUsers === 3 ? "question-selected" : " "}`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  equipmentUsers: 3,
                }));
              }}
            >
              3
            </div>
            <div
              className={`col-2 questionBox
          ${homeConnection.equipmentUsers === 4 ? "question-selected" : " "}`}
              onClick={() => {
                setHomeConnection((prevState) => ({
                  ...prevState,
                  equipmentUsers: 4,
                }));
              }}
            >
              4
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>Otros estudiantes en casa</h6>
              <p>
                <span className="underscore-question">Sin contarse usted</span>,
                selecciones el numero de otros estudiantes que hay en su casa,
                durante este segundo semestre. Ya sea de escuelas, secundaria o
                universidad.
              </p>
            </div>
            <div
              className={`col-2 questionBox
          ${family.students === 0 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  students: 0,
                }));
              }}
            >
              0
            </div>
            <div
              className={`col-2 questionBox
          ${family.students === 1 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  students: 1,
                }));
              }}
            >
              1
            </div>
            <div
              className={`col-2 questionBox
          ${family.students === 2 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  students: 2,
                }));
              }}
            >
              2
            </div>
            <div
              className={`col-2 questionBox
          ${family.students === 3 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  students: 3,
                }));
              }}
            >
              3
            </div>
            <div
              className={`col-2 questionBox
          ${family.students === 4 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  students: 4,
                }));
              }}
            >
              4
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>Cantidad de habitantes en casa</h6>
              <p>Seleccione el numero aproximado de habitantes en su casa.</p>
            </div>
            <div
              className={`col-2 questionBox
          ${family.habitants === 0 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  habitants: 0,
                }));
              }}
            >
              0
            </div>
            <div
              className={`col-2 questionBox
          ${family.habitants === 1 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  habitants: 1,
                }));
              }}
            >
              1
            </div>
            <div
              className={`col-2 questionBox
          ${family.habitants === 2 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  habitants: 2,
                }));
              }}
            >
              2
            </div>
            <div
              className={`col-2 questionBox
          ${family.habitants === 3 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  habitants: 3,
                }));
              }}
            >
              3
            </div>
            <div
              className={`col-2 questionBox
          ${family.habitants === 4 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  habitants: 4,
                }));
              }}
            >
              4
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>
                Cantidad de personas en{" "}
                <span className="underscore-question">teletrabajo</span> casa
              </h6>
              <p>
                Entre los habitantes de su casa, Seleccione el numero aproximado
                de personas que están trabajando en la modalidad de teletrabajo.
              </p>
            </div>
            <div
              className={`col-2 questionBox
          ${family.telejob === 0 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  telejob: 0,
                }));
              }}
            >
              0
            </div>
            <div
              className={`col-2 questionBox
          ${family.telejob === 1 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  telejob: 1,
                }));
              }}
            >
              1
            </div>
            <div
              className={`col-2 questionBox
          ${family.telejob === 2 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  telejob: 2,
                }));
              }}
            >
              2
            </div>
            <div
              className={`col-2 questionBox
          ${family.telejob === 3 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  telejob: 3,
                }));
              }}
            >
              3
            </div>
            <div
              className={`col-2 questionBox
          ${family.telejob === 4 ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  telejob: 4,
                }));
              }}
            >
              4
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>Bono Solidario</h6>
              <p>
                De las siguientes opciones, seleccione si alguien en su casa es
                beneficiario del bono solidario del Gobierno de Panamá
              </p>
            </div>
            <div
              className={`col-2 questionBox
          ${family.bonosolidario ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  bonosolidario: true,
                }));
              }}
            >
              Sí
            </div>
            <div
              className={`col-2 questionBox
          ${!family.bonosolidario ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  bonosolidario: false,
                }));
              }}
            >
              No
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>Agua Potable</h6>
              <p>
                Seleccione si en su barrio o casa hay agua potable disponible
                permanentemente.
              </p>
            </div>
            <div
              className={`col-2 questionBox
          ${family.water ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  water: true,
                }));
              }}
            >
              Sí
            </div>
            <div
              className={`col-2 questionBox
          ${!family.water ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  water: false,
                }));
              }}
            >
              No
            </div>
          </div>
          <div className="row d-flex col-12 justify-content-around mt-1 questionOption">
            <div className="col-12 questionMake">
              <h6>Afectados por la COVID-19</h6>
              <p>
                Seleccione algún habitante de su casa, o muy cerca de ella ha
                habido (o hay) alguna persona que ha padecido la enfermedad de
                la COVID-19
              </p>
            </div>
            <div
              className={`col-2 questionBox
          ${family.covid ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  covid: true,
                }));
              }}
            >
              Sí
            </div>
            <div
              className={`col-2 questionBox
          ${!family.covid ? "question-selected" : " "}`}
              onClick={() => {
                setFamily((prevState) => ({
                  ...prevState,
                  covid: false,
                }));
              }}
            >
              No
            </div>
          </div>
        </React.Fragment>
      )}
      <div>
        <Button inverse onClick={submitSurvey} disabled={buttonDisable}>
          ENVIAR <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </div>
    </div>
  );
};

export default Survey;
