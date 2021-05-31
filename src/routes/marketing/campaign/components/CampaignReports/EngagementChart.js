import React from "react";
import BgCard from "Components/BgCard";
// Chart component
import { Doughnut } from "react-chartjs-2";
//List components
/*
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 283,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  profileTabs: {
    width: "100%",
    padding: 0,
  },
}));

*/

function EngagementChart(props) {
  //const classes = useStyles();
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
        backgroundColor: ["#a1fa57", "#57d8fa", "#fa5779", "#fada57"],
      },
    ],
  };

  return (
    <BgCard heading="Engagement Overview">
          <Doughnut data={chartData} />
        
    </BgCard>
  );
}

export default EngagementChart;
