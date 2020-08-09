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
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [time, setTime] = useState();
  const [theInterval, setTheInterval] = useState();
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    moment.locale("es");

    const requestUser = async () => {
      const userRequest = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/user/info/${auth.userId}`,
        "GET"
      );

      await setUserInfo(userRequest);
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

  return (
    <React.Fragment>
      <div className="dashboard-container">
        <div className="row d-flex col-12 col-lg-6 bordeB">
          <h4>Bienvenido</h4>
          <div className="col-12 bordeA">
            Usuario:{" "}
            <span className="navThing">
              {userInfo.name
                ? `${userInfo.name.firstName} ${userInfo.name.lastName}`
                : auth.userName}
            </span>
          </div>
          <div className="col-12 bordeA">
            Correo:{" "}
            <span className="date-format">
              {userInfo.email ? userInfo.email : <MiniSpinner />}
            </span>
          </div>
          <div className="col-12 bordeA date-format">
            {time ? time : <MiniSpinner />}
          </div>
          <div className="col-12 bordeA">
            Visitas:{" "}
            <span className="date-format">
              {userInfo.visits ? userInfo.visits : <MiniSpinner />}
            </span>
          </div>
          <div className="col-12 bordeA">
            Ultima conexión:{" "}
            <span className="date-format">
              {userInfo.lastEntry ? (
                moment(userInfo.lastEntry).calendar()
              ) : (
                <MiniSpinner />
              )}
            </span>
          </div>
          <div className="col-12 bordeA">
            Parciales realizados: <span className="date-format">(?/3)</span>
          </div>
          <div className="col-12 bordeA">
            Exámenes realizados: <span className="date-format">(?/3)</span>
          </div>
          {!userInfo.submitSurvey && (
            <React.Fragment>
              <div className="col-12 survey-box">
                Llena la encuesta para poder acceder{" "}
                <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                <Link to={"/encuesta"}>
                <Button size={"small"} inverse>
                  Ir a la encuesta
                </Button>
                </Link>
              </div>
            </React.Fragment>
          )}
          <div className="mt-5">
            <div className="col-12 mt-2">
              <Button size={"small"} inverse onClick={auth.logout}>
                Ir a exámenes
              </Button>
            </div>
            <div className="col-12 mt-2">
              <Button size={"small"} inverse onClick={auth.logout}>
                Ir a los talleres
              </Button>
            </div>
            <div className="col-12 mt-2">
              <Button size={"small"} inverse onClick={auth.logout}>
                Mis soluciones
              </Button>
            </div>
          </div>
        </div>
        <div className="dashboard-button mr-auto ml-auto">
          <Button size={"small"} inverse onClick={auth.logout}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
