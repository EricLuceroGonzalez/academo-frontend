import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import './TimeClock.css'

const TimeClock = () => {
  const [time, setTime] = useState();

  useEffect(() => {
    moment.locale("es");
    const theInterval = setInterval(() => {
      setTime(moment().format("dddd, MMMM DD YYYY, h:mm:ss a"));
    }, 1000);

    return () => {
      clearInterval(theInterval)
    }
  }, []);

  return <div className="time-text">{time}</div>;
};

export default TimeClock;
