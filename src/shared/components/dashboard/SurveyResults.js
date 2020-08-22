import React, { useEffect, useState } from "react";
import moment from "moment";
import MiniSpinner from "../../UIElements/MiniSpinner";
import "./SurveyResults.css";
import { useHttpClient } from "../../hooks/http-hook";
import PieChart from "./PieChart";

const SurveyResults = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [time, setTime] = useState();
  const [surveyMacro, setSurveyMacro] = useState({
    allSurveys: "",
    surveysFilled: "",
  });
  const [surveysData, setSurveysData] = useState();
  const [isMounted, setIsMounted] = useState(true);
  // Variablesa
  const [personal, setPersonal] = useState({
    genre: "",
    ageRange: "",
  });
  const [academic, setAcademic] = useState({
    firstSemester: { subjects: "", failed: "", approvedPre: null },
    secondSemester: { subjects: "", firstTime: null },
  });
  const [homeConnection, setHomeConnection] = useState({
    conectionType: { data: null, wifi: null, mixed: null },
    equipmentAmount: null,
    equipmentUsers: null,
  });
  const [family, setFamily] = useState({
    students: null,
    habitants: null,
    telejob: null,
    bonosolidario: null,
    water: null,
    covid: null,
  });
  useEffect(() => {
    moment.locale("es");

    const requestSurvey = async () => {
      const surveyRequest = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/user/surveys`,
        "GET"
      );
      setSurveyMacro({
        allSurveys: surveyRequest.users,
        surveysFilled: surveyRequest.userHaveFilled,
      });
      setSurveysData(surveyRequest.allSurveys);
    };
    if (isMounted) {
      requestSurvey();
    }
    return () => {
      setIsMounted(false);
    };
  }, [sendRequest, isMounted]);

  useEffect(() => {
    const intervalTime = setInterval(() => {
      setTime(moment().format("dddd, MMMM DD YYYY, h:mm:ss a"));
    }, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, []);

  useEffect(() => {
    if (surveysData) {
      let a;
      let b;
      a = surveysData.map((item, k) => {
        // console.log(item.personal);
        return item.personal.genre;
      });
      b = surveysData.map((item, k) => {
        // console.log(item.personal);
        return item.personal["ageRange"];
      });
      // console.log(a);

      setPersonal((prevState) => ({
        ...prevState,
        genre: {
          hombres: countFreq(a, "hombre"),
          mujeres: countFreq(a, "mujer"),
        },
        ageRange: {
          "16-17": countFreq(b, "16-17"),
          "18-19": countFreq(b, "18-19"),
          "20-21": countFreq(b, "20-21"),
          "22-23": countFreq(b, "22-23"),
        },
      }));
    }
  }, [surveysData]);

  useEffect(() => {
    if (surveysData) {
      const academicCount = (endPoint) => {
        return surveysData.map((item, k) => {
          return item.academic.firstSemester[endPoint];
        });
      };
      const academicCountB = (endPoint) => {
        return surveysData.map((item, k) => {
          return item.academic.secondSemester[endPoint];
        });
      };
      let subjects = academicCount("subjects");
      let failures = academicCount("failed");
      let approvedPre = academicCount("approvedPre");
      let subjectsB = academicCountB("subjects");
      let firstTime = academicCountB("firstTime");

      setAcademic((prevState) => ({
        ...prevState,
        firstSemester: {
          subjects: {
            "0": countFreq(subjects, "0"),
            "1": countFreq(subjects, "1"),
            "2-3": countFreq(subjects, "2-3"),
            "4-6": countFreq(subjects, "4-6"),
            "6+": countFreq(subjects, "6+"),
          },
          failed: {
            "0": countFreq(failures, "0"),
            "1": countFreq(failures, "1"),
            "2-3": countFreq(failures, "2-3"),
            "4-6": countFreq(failures, "4-6"),
            "6+": countFreq(failures, "6+"),
          },
          approvedPre: { Si: countFreq(approvedPre, true) },
        },
        secondSemester: {
          subjects: {
            "0": countFreq(subjectsB, "0"),
            "1": countFreq(subjectsB, "1"),
            "2-3": countFreq(subjectsB, "2-3"),
            "4-6": countFreq(subjectsB, "4-6"),
            "6+": countFreq(subjectsB, "6+"),
          },
          firstTime: {
            Si: countFreq(firstTime, true),
            No: countFreq(firstTime, false),
          },
        },
      }));
    }
  }, [surveysData]);

  useEffect(() => {
    if (surveysData) {
      const countTypeConnection = (endPoint) => {
        return surveysData.map((item, k) => {
          return item.homeConnection.conectionType[endPoint];
        });
      };

      const countEquipo = (endPoint) => {
        return surveysData.map((item, k) => {
          return item.homeConnection[endPoint];
        });
      };

      let data = countTypeConnection("data");
      let wifi = countTypeConnection("wifi");
      let mixed = countTypeConnection("mixed");
      let amount = countEquipo("equipmentAmount");
      let users = countEquipo("equipmentUsers");

      setHomeConnection((prevState) => ({
        ...prevState,
        conectionType: {
          data: {
            "casi nunca": countFreq(data, "casi nunca"),
            "algunas veces": countFreq(data, "algunas veces"),
            "casi siempre": countFreq(data, "casi siempre"),
            siempre: countFreq(data, "siempre"),
          },
          wifi: {
            "casi nunca": countFreq(wifi, "casi nunca"),
            "algunas veces": countFreq(wifi, "algunas veces"),
            "casi siempre": countFreq(wifi, "casi siempre"),
            siempre: countFreq(wifi, "siempre"),
          },
          mixed: {
            "casi nunca": countFreq(mixed, "casi nunca"),
            "algunas veces": countFreq(mixed, "algunas veces"),
            "casi siempre": countFreq(mixed, "casi siempre"),
            siempre: countFreq(mixed, "siempre"),
          },
        },
        equipmentAmount: {
          "0": countFreq(amount, 0),
          "1": countFreq(amount, 1),
          "2": countFreq(amount, 2),
          "3": countFreq(amount, 3),
          "4": countFreq(amount, 4),
        },
        equipmentUsers: {
          "0": countFreq(users, 0),
          "1": countFreq(users, 1),
          "2": countFreq(users, 2),
          "3": countFreq(users, 3),
          "4": countFreq(users, 4),
        },
      }));
    }
  }, [surveysData]);

  useEffect(() => {
    if (surveysData) {
      let familyData = (endPoint) => {
        return surveysData.map((item, k) => {
          return item.family[endPoint];
        });
      };

      let st = familyData("students");
      let hab = familyData("habitants");
      let telejob = familyData("telejob");
      let bono = familyData("bonosolidario");
      let water = familyData("water");
      let covid = familyData("covid");
      setFamily((prevState) => ({
        ...prevState,
        students: {
          "0": countFreq(st, 0),
          "1": countFreq(st, 1),
          "2": countFreq(st, 2),
          "3": countFreq(st, 3),
          "4": countFreq(st, 4),
        },
        habitants: {
          "0": countFreq(hab, 0),
          "1": countFreq(hab, 1),
          "2": countFreq(hab, 2),
          "3": countFreq(hab, 3),
          "4": countFreq(hab, 4),
        },
        telejob: {
          "0": countFreq(telejob, 0),
          "1": countFreq(telejob, 1),
          "2": countFreq(telejob, 2),
          "3": countFreq(telejob, 3),
          "4": countFreq(telejob, 4),
        },
        bonosolidario: {
          Si: countFreq(bono, true),
          No: countFreq(bono, false),
        },
        water: {
          Si: countFreq(water, true),
          No: countFreq(water, false),
        },
        covid: {
          Si: countFreq(covid, true),
          No: countFreq(covid, false),
        },
      }));
    }
  }, [surveysData]);
  // let plotData = mapFrequency(frequencyData);
  const countFreq = (a, variable) => {
    const aCount = new Map(
      [...new Set(a)].map((x) => [x, a.filter((y) => y === x).length])
    );
    return aCount.get(variable);
  };

  return (
    <React.Fragment>
      <div className="surveyBox">
        <h1>Resultados</h1>
        <div className="col-12 dashboard-content date-format">
          {time ? time : <MiniSpinner />}
        </div>

        <div className="row d-flex col-8 col-md-4 questionMake questionOption">
          <div className="col-12 col-md-4 results">
            Total:<h6>{surveyMacro.allSurveys}</h6>
          </div>
          <div className="col-12 col-md-4 results">
            Completadas: <h6>{surveyMacro.surveysFilled}</h6>
          </div>
          <div className="col-12 col-md-4 results">
            Porcentaje:{" "}
            <h6>
              {(
                (surveyMacro.surveysFilled / surveyMacro.allSurveys) *
                100
              ).toFixed(2)}
              %
            </h6>
          </div>
        </div>
        <div className="col-12 col-md-10 mr-auto ml-auto">
          <div className="row d-flex col-12 questionMake questionOption">
            <div className="col-12 col-md-6">
              <h6>Género</h6>
              {personal.genre ? <PieChart data={personal.genre} /> : ""}
            </div>
            <div className="col-12 col-md-6">
              <h6>Rango de edad</h6>
              {personal.ageRange ? <PieChart data={personal.ageRange} /> : ""}
            </div>
          </div>

          <div className="row d-flex col-12 questionMake questionOption">
            <div className="col-12 col-md-4">
              <h6>Materias matriculadas en el primer semestre</h6>
              <p>
                Elija la cantidad de materias que se aproxima a las matriculadas
                en el primer semestre{" "}
              </p>
              {academic.firstSemester.subjects ? (
                <PieChart data={academic.firstSemester.subjects} />
              ) : (
                ""
              )}
            </div>
            <div className="col-12 col-md-4">
              <h6>Materias no aprobadas en el primer semestre</h6>
              <p>
                Elija la cantidad de materias que no aprobó en el primer
                semestre{" "}
              </p>
              {academic.firstSemester.failed ? (
                <PieChart data={academic.firstSemester.failed} />
              ) : (
                ""
              )}
            </div>
            <div className="col-12 col-md-4">
              <h6>La primera parte de esta asignatura</h6>
              <p>
                La siguiente pregunta se refiere a si usted aprobó la primera
                parte de esta asignatura (matemática 1){" "}
              </p>
              {academic.firstSemester.failed ? (
                <PieChart data={academic.firstSemester.approvedPre} />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="row d-flex col-12 questionMake questionOption">
            <div className="col-12 col-md-6">
              <h6>¿Es primera vez que da esta asignatura?</h6>
              <p>Seleccione 'no' si nunca ha dado esta asignatura.</p>
              {academic.secondSemester.firstTime ? (
                <PieChart data={academic.secondSemester.firstTime} />
              ) : (
                ""
              )}
            </div>
            <div className="col-12 col-md-6">
              <h6>Materias matriculadas en el segundo semestre</h6>
              <p>
                Elija la cantidad de materias que se aproxima a las matriculadas
                en el segundo semestre{" "}
              </p>
              {academic.secondSemester.subjects ? (
                <PieChart data={academic.secondSemester.subjects} />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="col-12 row d-flex questionMake questionOption">
            <div className="col-12 col-md-4">
              <h6>
                Uso y disponibilidad de{" "}
                <span className="underscore-question">Data Celular</span>
              </h6>
              <p>
                Para conectarse a sus clases en linea, durante el segundo
                semestre, elija la frecuencia con la que utilizará la conexión
                mediante{" "}
                <span className="underscore-question">
                  {" "}
                  data o planes pre-pago de teléfonos celulares
                </span>
                .
              </p>
              {homeConnection.conectionType.data ? (
                <PieChart data={homeConnection.conectionType.data} />
              ) : (
                ""
              )}
            </div>
            <div className="col-12 col-md-4">
              <h6>
                Uso y disponibilidad de{" "}
                <span className="underscore-question">Wi-Fi en casa</span>
              </h6>
              <p>
                Para conectarse a sus clases en linea, durante el segundo
                semestre, elija la frecuencia con la que utilizará la conexión
                mediante{" "}
                <span className="underscore-question"> Wi-Fi en casa</span>.
              </p>
              {homeConnection.conectionType.wifi ? (
                <PieChart data={homeConnection.conectionType.wifi} />
              ) : (
                ""
              )}
            </div>

            <div className="col-12 col-md-4">
              <h6>
                Uso y disponibilidad de{" "}
                <span className="underscore-question">
                  Wi-Fi y Data celular
                </span>
              </h6>
              <p>
                Para conectarse a sus clases en linea, durante el segundo
                semestre, elija la frecuencia con la que utilizará (de manera
                alterna y según este disponible en el momento) la conexión
                mediante{" "}
                <span className="underscore-question">
                  {" "}
                  los dos sistemas de las preguntas anteriores
                </span>
                .
              </p>
              {homeConnection.conectionType.mixed ? (
                <PieChart data={homeConnection.conectionType.mixed} />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="col-12 row d-flex questionMake questionOption">
            <div className="col-12 col-md-6">
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
              {homeConnection.equipmentAmount ? (
                <PieChart data={homeConnection.equipmentAmount} />
              ) : (
                ""
              )}
            </div>
            <div className="col-12 col-md-6">
              <h6>Equipo disponible en casa</h6>
              <p>
                Del equipo seleccionado en la pregunta anterior, seleccione, las
                personas que{" "}
                <span className="underscore-question">también lo utilizan</span>{" "}
                durante el dia (en sus clases o tele-trabajo).
              </p>
              {homeConnection.equipmentUsers ? (
                <PieChart data={homeConnection.equipmentUsers} />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="col-12 row d-flex questionMake questionOption">
            <div className="col-12 col-md-4">
              <h6>Otros estudiantes en casa</h6>
              <p>
                <span className="underscore-question">Sin contarse usted</span>,
                selecciones el numero de otros estudiantes que hay en su casa,
                durante este segundo semestre. Ya sea de escuelas, secundaria o
                universidad.
              </p>
              {family.students ? <PieChart data={family.students} /> : ""}
            </div>
            <div className="col-12 col-md-4">
              <h6>Cantidad de habitantes en casa</h6>
              <p>Seleccione el numero aproximado de habitantes en su casa.</p>
              {family.habitants ? <PieChart data={family.habitants} /> : ""}
            </div>
            <div className="col-12 col-md-4">
              <h6>
                Cantidad de personas en{" "}
                <span className="underscore-question">tele-trabajo</span> casa
              </h6>
              <p>
                Entre los habitantes de su casa, Seleccione el numero aproximado
                de personas que están trabajando en la modalidad de
                tele-trabajo.
              </p>
              {family.telejob ? <PieChart data={family.telejob} /> : ""}
            </div>
          </div>

          <div className="col-12 row d-flex questionMake questionOption">
            <div className="col-12 col-md-4">
              {" "}
              <h6>Bono Solidario</h6>
              <p>
                De las siguientes opciones, seleccione si alguien en su casa es
                beneficiario del bono solidario del Gobierno de Panamá
              </p>
              {family.bonosolidario ? (
                <PieChart data={family.bonosolidario} />
              ) : (
                ""
              )}
            </div>
            <div className="col-12 col-md-4">
              {" "}
              <h6>Agua Potable</h6>
              <p>
                Seleccione si en su barrio o casa hay agua potable disponible
                permanentemente.
              </p>
              {family.water ? <PieChart data={family.water} /> : ""}
            </div>
            <div className="col-12 col-md-4">
              {" "}
              <h6>Afectados por la COVID-19</h6>
              <p>
                Seleccione algún habitante de su casa, o muy cerca de ella ha
                habido (o hay) alguna persona que ha padecido la enfermedad de
                la COVID-19
              </p>
              {family.covid ? <PieChart data={family.covid} /> : ""}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SurveyResults;
