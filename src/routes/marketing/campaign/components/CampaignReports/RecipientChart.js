import React from "react";

// Chart component
import { Doughnut } from "react-chartjs-2";

function RecipientChart(props) {
  const { stat } = props;

  const chartData = {
    labels: ["Soft Bounce", "Hard Bounce", "Delivered", "Unsubscribed"],
    datasets: [
      {
        data: [10, 20, 30, 40],
        backgroundColor: ["#8D99AE", "#D0CFCF", "#565254", "#2E4052"]
      }
    ]
  };

  return <Doughnut data={chartData} />;
}

export default RecipientChart;
