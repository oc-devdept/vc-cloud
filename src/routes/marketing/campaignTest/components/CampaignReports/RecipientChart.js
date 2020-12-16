import React from "react";
import BgCard from "Components/BgCard";

// Chart component
import { Doughnut } from "react-chartjs-2";

function RecipientChart(props) {
  const { stats } = props;
  let chartLabels = [];
  let cData = [];
  for (let i = 0; i < stats.length; i++) {
    chartLabels.push(stats[i].label);
    cData.push(stats[i].field);
  }
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        data: cData,
        backgroundColor: ["#8D99AE", "#D0CFCF", "#565254", "#2E4052"]
      }
    ]
  };
  return (
    <BgCard heading="Sending Overview">
      <Doughnut data={chartData} />
    </BgCard>
  );
  //return <Doughnut data={chartData} />;
}

export default RecipientChart;
