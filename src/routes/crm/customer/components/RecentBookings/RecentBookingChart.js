import React from "react";
import { Doughnut } from "react-chartjs-2";
import { PastelOne9 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

function RecentBookingChart(props) {
  const { data } = props;

  var labels = data.map(dat => dat.name);
  var dataset = data.map(dat => dat.count);

  const chartData = {
    labels,
    datasets: [
      {
        data: dataset,
        backgroundColor: PastelOne9
      }
    ]
  };
  return <Doughnut data={chartData} />;
}

export default RecentBookingChart;
