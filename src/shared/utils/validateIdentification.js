import React, { useState, useEffect } from 'react';


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

  export default validateCedula;