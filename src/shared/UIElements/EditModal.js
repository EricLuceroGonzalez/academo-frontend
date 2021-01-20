import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { useForm } from "../hooks/form-hook";
import Input from "../UIElements/Input";
import Modal from "../UIElements/Modal";
import Button from "../UIElements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_CEDULA,
} from "../utils/validators";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "./LoadingSpinner";
import "./EditModal.css";
import ErrorModal from "./ErrorModal";

const EditModal = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [cedulaIsValid, setCedulaIsValid] = useState(false);
  const [loadedUser, setLoadedUser] = useState("");
  const [showThis, setShowThis] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: { value: "", isValid: false },
      lastName: { value: "", isValid: false },
      email: { value: "", isValid: false },
      identification: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    const fetchedPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/user/user/${auth.userId}`
        );
        setLoadedUser(responseData);
        setFormData(
          {
            firstName: {
              value: responseData.name.firstName,
              isValid: true,
            },
            lastName: {
              value: responseData.name.lastName,
              isValid: true,
            },
            courseClass: {
              value: "",
              isValid: true,
            },
            email: {
              value: responseData.email,
              isValid: true,
            },
            identification: {
              value: responseData.identification,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };

    if (props.show) {
      fetchedPlace();
    }
  }, [sendRequest, auth.userId, setFormData, props.show]);

  const userUpdateSubmit = async (event) => {
    event.preventDefault();
    // HTTP REQUEST to PATH the update:
    try {
      const changes = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/user/${auth.userId}`,
        "PATCH",
        JSON.stringify({
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          email: formState.inputs.email.value,
          courseClass: formState.inputs.courseClass.value,
          identification: formState.inputs.identification.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setShowThis(changes.message);
      setDisableButton(true);
    } catch (err) {}
  };

  useEffect(() => {
    console.log(formState.isValid);
    if (!formState.isValid) {
      setDisableButton(true);
    }
    validateCedula(formState.inputs.identification.value);
  }, [formState.inputs, formState.isValid]);

  const validateCedula = (cedula) => {
    setCedulaIsValid(false);
    let matchPan = /^P$|^(?:PE|N|E|[23456789]|[23456789](?:A|P)?|1[0123]?|1[0123]?(?:A|P)?)$|^(?:PE|N|E|[23456789]|[23456789](?:AV|PI)?|1[0123]?|1[0123]?(?:AV|PI)?)-?$|^(?:PE|N|E|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(?:\d{1,4})-?$ |^(PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)-(\d{1,4})-(\d{1,6})$/i;
    var matched = cedula.match(matchPan);
    var isComplete = false;

    if (matched !== null) {
      matched.splice(0, 1); // remove the first match, it contains the input string.
      if (matched[0] !== undefined) {
        // if matched[0] is set => cedula complete
        isComplete = true;

        if (matched[0].match(/^PE|E|N$/)) {
          matched.splice(0, "0");
        }

        if (matched[0].match(/^(1[0123]?|[23456789])?$/)) {
          matched.splice(1, "");
        }

        if (matched[0].match(/^(1[0123]?|[23456789])(AV|PI)$/)) {
          var tmp = matched[0].match(/(\d+)(\w+)/);

          matched.splice(0, 1);
          matched.splice(0, tmp[1]);
          matched.splice(1, tmp[2]);
        }
      } // matched[0]
    }

    var result = {
      isValid: cedula.length === 0 ? true : matchPan.test(cedula),
      inputString: cedula,
      isComplete: isComplete,
      cedula: isComplete ? matched.splice(0, 4) : null,
    };
    if (result.isValid && result.isComplete) {
      setCedulaIsValid(result.isValid);
    }

    return result;
  };

  const clearHandle = () => {
    clearError();
  };

  return (
    <Modal
      onCancel={props.onClear}
      header="Editar mi información"
      show={props.show}
      footer={
        <div className="col-12 row d-flex mr-auto ml-auto">
          <div className="col-12 col-sm-6 mb-2">
            <Button onClick={props.onClear} inverse size={"small"}>
              <FontAwesomeIcon icon={faChevronCircleLeft} /> ATRÁS
            </Button>
          </div>
          <div className="col-12 col-sm-6">
            <Button
              onClick={userUpdateSubmit}
              disabled={disableButton && !formState.isValid}
              size={"small"}
            >
              ENVIAR <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>
        </div>
      }
    >
      <ErrorModal error={error} onClear={clearHandle} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUser && (
        <div className="col-12 col-sm-8 col-md-4">
          <div>Edita solo los campos que quieras cambiar.</div>
          {showThis !== "" ? (
            <div className="col-12 mr-auto ml-auto mt-4 mb-4 dancingmessage">
              USUARIO EDITADO!{" "}
              <span role="img" aria-label="rocket" style={{ color: "#06d6a2" }}>
                📥
              </span>
            </div>
          ) : (
            " "
          )}

          <Input
            id="firstName"
            element="input"
            validators={[VALIDATOR_MINLENGTH(2)]}
            errorText="Intenta colocar un nombre"
            label="Nombre"
            onInput={inputHandler}
            initialValue={loadedUser.name.firstName}
            initialValid={true}
          />
          <Input
            id="lastName"
            element="input"
            validators={[VALIDATOR_MINLENGTH(2)]}
            errorText="Coloca al menos 3 caracteres"
            label="Apellido"
            onInput={inputHandler}
            initialValue={loadedUser.name.lastName}
            initialValid={true}
          />
          <Input
            id="courseClass"
            element="input"
            validators={[VALIDATOR_MINLENGTH(2)]}
            errorText="Elige un valir"
            label="Curso"
            onInput={inputHandler}
            someOptions={[
              "-----",
              "FÍSICA 1",
              "FÍSICA 2",
              "MATEMÁTICA 1",
              "MATEMÁTICA 2",
            ]}
          />

          <Input
            id="email"
            element="input"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Introduce una dirección de email"
            label="Correo"
            onInput={inputHandler}
            initialValue={loadedUser.email}
            initialValid={true}
          />
          <Input
            id="identification"
            element="input"
            validators={[
              VALIDATOR_MINLENGTH(4),
              VALIDATOR_CEDULA(cedulaIsValid),
            ]}
            errorText="Tu cédula, con guiones"
            label="Cédula"
            onInput={inputHandler}
            initialValue={loadedUser.identification}
            initialValid={true}
          />
        </div>
      )}
    </Modal>
  );
};

export default EditModal;
