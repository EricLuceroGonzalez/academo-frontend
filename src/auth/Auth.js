import React, { useContext, useState } from "react";

import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
import { useForm } from "../shared/hooks/form-hook";
import Input from "../shared/UIElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../shared/utils/validators";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import ErrorModal from "../shared/UIElements/ErrorModal";
import Card from "../shared/UIElements/Card";
import Button from "../shared/UIElements/Button";
import "./Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
  const auth = useContext(AuthContext);
  // LOGIN or SIGNUP state mode
  const [isLoginMode, setIsLoginMode] = useState(true);
  // is Loading is managed by hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  // Initialize state with form-hook
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const switchModeHandler = () => {
    //   If we are on SIGNUP, add the name field and data to STATE
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          lastName: {
            value: "",
            isValid: false,
          },
          firstName: {
            value: "",
            isValid: false,
          },
          identification: {
            value: "",
            isValid: false,
          },
          password2: { value: "", isValid: false },
          subject: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/user/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData.name, responseData.userId, responseData.token);
        history.push("/dashboard");
      } catch (err) {

      }
    } else {
      try {
        const registerData = {
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          password2: formState.inputs.password2.value,
          identification: formState.inputs.identification.value,
          subject: formState.inputs.subject.value,
        };

        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/user/signup",
          "POST",
          JSON.stringify(registerData),
          { "Content-Type": "application/json" }
        );
        // Change the state of Context
        auth.login(responseData.name, responseData.userId, responseData.token);
        history.push("/dashboard");
      } catch (err) {
      }
    }
  };

  const errorHandler = () => {
    clearError();
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <div className="auth-view">
        <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}
          <h4 className="auth-title">
            {" "}
            {!isLoginMode ? "CREAR CUENTA" : "INICIAR SESIÓN"}
          </h4>
          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                element="input"
                id="lastName"
                type="text"
                label="Apellido"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Introduce al menos un apellido"
                onInput={inputHandler}
              />
            )}
            {!isLoginMode && (
              <Input
                element="input"
                id="firstName"
                type="text"
                label="Nombre"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Introduce al menos un nombre"
                onInput={inputHandler}
              />
            )}
            {!isLoginMode && (
              <Input
                element="input"
                id="identification"
                type="text"
                label="Cedula"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Introduce tu cédula o pasaporte"
                onInput={inputHandler}
              />
            )}
            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Correo incorrecto"
              onInput={inputHandler}
            ></Input>
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Debe tener al menos 6 caracteres."
              onInput={inputHandler}
            ></Input>
            {!isLoginMode && (
              <Input
                element="input"
                id="password2"
                type="password"
                label="Confirmar Password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Debe tener al menos 6 caracteres."
                onInput={inputHandler}
              ></Input>
            )}
            {!isLoginMode && (
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
            )}

            <div className="mt-5">
              <Button type="submit" disabled={!formState.isValid}>
                {!isLoginMode ? "CREAR CUENTA" : "INICIAR SESIÓN "}
                {!isLoginMode ? "" : <FontAwesomeIcon icon={faSignInAlt} />}
              </Button>
            </div>
          </form>
          <div className="mt-3">
            <Button inverse onClick={switchModeHandler}>
              {isLoginMode ? "CREAR CUENTA" : "INICIAR SESIÓN"}
            </Button>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};
export default Auth;
