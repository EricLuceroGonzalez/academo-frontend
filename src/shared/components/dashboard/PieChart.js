import React, { useEffect, useState } from "react";
import Chart from "chart.js";

const PieChart = (props) => {
  const [dataValues, setDataValues] = useState(Object.values(props.data));
  const [dataLabels, setDataLabels] = useState(Object.keys(props.data));
  const [canvasRef, setCanvasRef] = useState(React.createRef());

  useEffect(() => {
    // console.log(Object.keys(props.data.genre));
    // console.log(Object.values(props.data.genre));

    new Chart(canvasRef.current, {
      type: "doughnut",
      options: {
        maintainAspectRatio: false,
      },
      data: {
        datasets: [
          {
            data: dataValues,
            label: dataLabels,
            backgroundColor: [
              "#7d64ff",
              "#4934B3",
              "#FF8F7D",
              "#FFE94A",
              "#57FFB3",
            ],
          },
        ],
        labels: dataLabels,
      },
    });

    return () => {
      setDataValues("");
      setDataLabels("");
      setCanvasRef("");
    };
  }, [canvasRef, dataValues, dataLabels]);
  return (
    <React.Fragment>
      <div className="pr-4 pl-4 mr-auto ml-auto mt-2 mb-2">
        <div>
          <canvas ref={canvasRef} width="250" height="250"></canvas>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PieChart;
