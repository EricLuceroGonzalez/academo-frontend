import React from "react";

import Modal from "./Modal";
import Button from "../UIElements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
// import './ErrorModal.css'

const ErrorModal = (props) => {

  return (
    <Modal
      onCancel={props.onClear}
      header="Ha ocurrido un error!"
      show={!!props.error}
      footer={
        <Button onClick={props.onClear}>
          <FontAwesomeIcon icon={faChevronCircleLeft} />
          {" "}REGRESAR
        </Button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
