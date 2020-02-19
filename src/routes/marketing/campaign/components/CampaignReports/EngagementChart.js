import React from "react";
import BgCard from "Components/BgCard";

// Chart component
import { Doughnut } from "react-chartjs-2";

function EngagementChart(props) {
  const { stat } = props;

  const chartData = {
    labels: ["Soft Bounce", "Hard Bounce", "Delivered", "Unsubscribed"],
    datasets: [
      {
        data: [10, 20, 30, 40],
        backgroundColor: ["#a1fa57", "#57d8fa", "#fa5779", "#fada57"]
      }
    ]
  };

  return (
    <BgCard heading="Engagement Overview">
      <Doughnut data={chartData} />
    </BgCard>
  );
}

export default EngagementChart;
