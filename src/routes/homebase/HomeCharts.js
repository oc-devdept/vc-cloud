import React from "react";
import { connect } from "react-redux";
import { Bar } from 'react-chartjs-2';
import ChartConfig from "Constants/chart-config";
import RctSectionLoader from "Components/RctSectionLoader";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
// Charts

// Action
// import { getDealStage } from "Ducks/widget";
import { getDealsByProduct } from "Ducks/widget";


const options = {
    legend: {
        display: false
    },
    scales: {
        yAxes: [
            {
                ticks: {
                    fontColor: ChartConfig.axesColor,
                    beginAtZero: true,
                    min: 0
                }
            }
        ],
        xAxes: [{
            barThickness: 50
        }]
    },
    responsive: true,
    maintainAspectRatio: false,
};

class HomeCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMonth: new Date(),
        }
    }

    handleMonthChange = (date) => {
        this.setState({ selectedMonth: date })
    };

    componentDidMount() {
        this.props.getDealsByProduct();
        //this.props.getDealSummary();
    }

    render() {
        const { loading, data} = this.props.dealsByProduct;        

        let productCount = data.map(item => item.qty);
        let labels = data.map(item => item.name);

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: "Deals by product",
                    data: productCount,
                    backgroundColor: [
                        'rgba(221,155,254,0.8)',
                        'rgba(220,241,255,0.8)',
                        'rgba(252,205,206,0.8)',
                        'rgba(221,239,200,0.8)',
                        'rgba(150,239,220,0.8)',
                        'rgba(221,239,140,0.8)',
                        'rgba(221,102,240,0.8)',
                        'rgba(123,252,210,0.8)',
                        'rgba(221,130,234,0.8)',
                        'rgba(150,200,84,0.8)',

                    ]                   
                }
            ]
            
        };

        return (
            <React.Fragment>
                {/*{loading && <RctSectionLoader />}*/}
                <div className="home-report-chart">
                    <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.2em' }}>
                        Open Deals this month by product
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, padding: 20 }}>
                        <div>Open Deals by Product</div>                       
                    </div>
                    {chartData ? (
                        <div style={{height: '500px'}}>
                            <Bar                            
                                data={chartData}
                                options={options}
                            />
                        </div>
                    ) : (
                            <p className="text-center text-muted">
                                <i>No Records</i>
                            </p>
                        )}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ widgetState }) => {

    const { dealsByProduct } = widgetState;   
    return { dealsByProduct };
};

export default connect(
    mapStateToProps,
    {
        getDealsByProduct
    }
)(HomeCharts);
