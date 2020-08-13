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
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from "../utils/validators";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "./LoadingSpinner";
import "./EditModal.css";

const EditModal = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
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
              disabled={disableButton}
              size={"small"}
            >
              ENVIAR <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>
        </div>
      }
    >
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUser && (
        <div>
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
            errorText="Please enter some valid description (min. 5 characters)"
            label="Nombre"
            onInput={inputHandler}
            initialValue={loadedUser.name.firstName}
            initialValid={true}
          />
          <Input
            id="lastName"
            element="input"
            validators={[VALIDATOR_MINLENGTH(2)]}
            errorText="Please enter some valid description (min. 5 characters)"
            label="Apellido"
            onInput={inputHandler}
            initialValue={loadedUser.name.lastName}
            initialValid={true}
          />
          <Input
            id="email"
            element="input"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter some valid description (min. 5 characters)"
            label="Correo"
            onInput={inputHandler}
            initialValue={loadedUser.email}
            initialValid={true}
          />
          <Input
            id="identification"
            element="input"
            validators={[VALIDATOR_MINLENGTH(2)]}
            errorText="Please enter some valid description (min. 5 characters)"
            label="Identificación"
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
