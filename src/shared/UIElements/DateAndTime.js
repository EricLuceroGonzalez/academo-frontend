import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es";

import MiniSpinner from "../UIElements/MiniSpinner";

const DateAndTime = () => {
  const [time, setTime] = useState();

  // Refresh time every 1000 ms
  useEffect(() => {
    moment.locale("es");
    setInterval(() => {
      setTime(moment().format("dddd, MMMM DD YYYY, h:mm:ss a"));
    }, 1000);
  }, []);

  return (
    <p
      style={{
        color: "rgb(59, 89, 152)",
        fontFamily: "monospace",
        textAlign: "left",
        fontSize: "0.75em",
      }}
    >
      {time ? time : <MiniSpinner />}
    </p>
  );
};

export default DateAndTime;
