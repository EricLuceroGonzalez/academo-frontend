import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import "moment/locale/es";
import { AuthContext } from "../../context/auth-context";
import MiniSpinner from "../../UIElements/MiniSpinner";
import "./Course.css";
import Button from "../../UIElements/Button";
import "./Dashboard.css";
import { useHttpClient } from "../../hooks/http-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTimesCircle,
  faCheckCircle,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import ErrorModal from "../../UIElements/ErrorModal";
import EditModal from "../../UIElements/EditModal";
import { VALIDATOR_MINLENGTH } from "../../utils/validators";

const Dashboard = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userInfo, setUserInfo] = useState({});
  const [errorMsg, setErrorMsg] = useState();
  const [time, setTime] = useState();
  const [isMounted, setIsMounted] = useState(true);
  const [editInfo, setEditInfo] = useState(false);

  useEffect(() => {
    moment.locale("es");

    const requestUser = async () => {
      const userRequest = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/user/info/${auth.userId}`,
        "GET"
      );

      setUserInfo(userRequest);
    };
    if (isMounted) {
      requestUser();
    }

    return () => {
      setIsMounted(false);
    };
  }, [auth.userId, sendRequest, isMounted]);

  useEffect(() => {
    const intervalTime = setInterval(() => {
      setTime(moment().format("dddd, MMMM DD YYYY, h:mm:ss a"));
    }, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, []);
  const errorHandler = () => {
    clearError();
    setErrorMsg(false);
  };

  const editShow = () => {
    setEditInfo(!editInfo);
  };
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error || errorMsg} onClear={errorHandler} />
      <EditModal
        show={editInfo}
        onClear={editShow}
        user={auth.userId}
        request={editInfo}
      />
      <div className="dashboard-container">
        <h4>Dashboard</h4>
        <div className="col-12 dashboard-content">
          Usuario:{" "}
          <span>
            {userInfo.name
              ? `${userInfo.name.firstName} ${userInfo.name.lastName}`
              : auth.userName}
          </span>
        </div>
        <div className="col-12 dashboard-content">
          Correo:{" "}
          <span className="date-format">
            {userInfo.email ? userInfo.email : <MiniSpinner />}
          </span>
        </div>
        <div className="col-12 dashboard-content date-format">
          {time ? time : <MiniSpinner />}
        </div>
        <div className="col-12 dashboard-content">
          Visitas:{" "}
          <span className="date-format">
            {userInfo.visits ? userInfo.visits : <MiniSpinner />}
          </span>
        </div>
        <div className="col-12 dashboard-content">
          Ultima conexión:{" "}
          <span className="date-format">
            {userInfo.lastEntry ? (
              moment(userInfo.lastEntry).calendar()
            ) : (
              <MiniSpinner />
            )}
          </span>
        </div>
        <div className="col-12 dashboard-content">
          {userInfo.submitSurvey ? "Ya ha" : "No ha"} llenado la encuesta{" "}
          <span className="date-format">
            {userInfo.submitSurvey ? (
              <FontAwesomeIcon className="good-check" icon={faCheckCircle} />
            ) : (
              <FontAwesomeIcon className="bad-check" icon={faTimesCircle} />
            )}
          </span>
        </div>
        <div className="col-12 dashboard-content">
          Talleres realizados: <span className="date-format">(?/3)</span>
        </div>
        <div className="col-12 dashboard-content">
          Exámenes realizados: <span className="date-format">(?/3)</span>
        </div>
        {!userInfo.submitSurvey && (
          <React.Fragment>
            <div className="row d-flex col-12 col-md-6 survey-box">
              <FontAwesomeIcon
                className="col-12"
                style={{ fontSize: "1.25rem" }}
                icon={faExclamationCircle}
              />{" "}
              <div className="col-12">
                {" "}
                Llena la encuesta para poder acceder{" "}
              </div>
              <div className="col-12">
                {" "}
                <Link to={"/encuesta"}>
                  <Button size={"small"} inverse>
                    Ir a la encuesta
                  </Button>
                </Link>
              </div>
            </div>
          </React.Fragment>
        )}
        {userInfo.submitSurvey && (
          <div className="mt-5">
            <div className="col-12 mt-2">
              <Button
                size={"small"}
                inverse
                onClick={() =>
                  setErrorMsg("Por el momento no hay actividades.")
                }
              >
                Ir a exámenes
              </Button>
            </div>
            <div className="col-12 mt-2">
              <Button
                size={"small"}
                inverse
                onClick={() =>
                  setErrorMsg("Por el momento no hay actividades.")
                }
              >
                Ir a los talleres
              </Button>
            </div>
            <div className="col-12 mt-2">
              <Button
                size={"small"}
                inverse
                onClick={() =>
                  setErrorMsg("Por el momento no hay actividades.")
                }
              >
                Mis soluciones
              </Button>
            </div>
          </div>
        )}
        <div className="col-12 mt-3">
          <Button size={"small"} inverse onClick={editShow}>
            Editar <FontAwesomeIcon icon={faUserEdit} />
          </Button>
        </div>
        <div className="col-12 mt-3">
          <Button size={"small"} inverse onClick={auth.logout}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
