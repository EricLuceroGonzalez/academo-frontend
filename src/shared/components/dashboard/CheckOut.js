import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import Button from "../../UIElements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import TimeClock from "../../UIElements/Time-Clock";
// import { useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";
// import LoadingSpinner from "../UIElements/LoadingSpinner";

const CheckOut = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  // const [isLogged, setIsLogged] = useState(false);
  // const [userName, setUserName] = useState();
  // const history = useHistory();

  // useEffect(() => {
  //   auth.userId ? setIsLogged(true) : setIsLogged(false);
  //   auth.userId ? setUserName(auth.userName) : setUserName();
  // }, [auth]);

  return (
    <React.Fragment>
      <div
        style={{
          height: "89vh",
          width: "99vw",
        }}
        // className="container"
      >
        <div className="mb-5">
          <div className="col-12 col-lg-6 col-md-8 col-sm-10 center-align mr-auto ml-auto">
            <div className="shakeThatThing">
              <span
                role="img"
                aria-label="star-dust"
                style={{ fontSize: "6em" }}
              >
                {" "}
                🚀
              </span>
            </div>
            <h4>
              <b className="navThing">Gracias,</b> {auth.userName}
              <span role="img" aria-label="thumb-up">
                {" "}
                👍
              </span>
              <p
                className="flow-text grey-text text-darken-1"
                style={{ fontSize: "0.6em" }}
              >
                Lo que llenaste ha sido enviado.{" "}
              </p>
              <p
                className="flow-text grey-text text-darken-1"
                style={{ fontSize: "0.6em" }}
              >
                Revisa tu correo.{" "}
              </p>
            </h4>
            <TimeClock />
          </div>
        </div>
        <div className="col-12 col-lg-4 col-md-6 col-sm-8 mr-auto ml-auto mt-5 row d-flex justify-content-around">
          <div className="col-6">
            {" "}
            <Button
              onClick={() => {
                history.push("/dashboard");
              }}
              size={'small'}
              inverse
            >
              <FontAwesomeIcon icon={faUndoAlt} /> Regresar
            </Button>
          </div>
          <div className="col-6">
            {" "}
            <Button
              onClick={() => auth.logout()}
              size={'small'}
            >
              Salir
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckOut;
