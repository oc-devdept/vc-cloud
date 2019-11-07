import React, { Component } from "react";
import { connect } from "react-redux";
import DataBlock from "./DataBlock";
// actions
import { getCrmSummary } from "Ducks/widget";

class CrmSummary extends Component {
  componentDidMount() {
    this.props.getCrmSummary();
  }
  render() {
    const { loading, data } = this.props.crmSummary;
    return (
      <div className="row">
        <div className="col">
          <DataBlock
            label={"lead in total"}
            amount={data && data.totalLeads}
            loading={loading}
          />
        </div>
        <div className="col">
          <DataBlock
            loading={loading}
            label={"deals in pipeline"}
            amount={data && data.totalOpenDeals}
          />
        </div>
        <div className="col">
          <DataBlock
            loading={loading}
            label={"in the pipeline"}
            amount={data && data.openDealsAmount}
          />
        </div>
        <div className="col">
          <DataBlock
            loading={loading}
            label={"sales this month"}
            amount={data && data.dealsWonAmount}
          />
        </div>
        {/* <div className="col">
          <DataBlock
            loading={loading}
            label={"in the pipeline"}
            amount={data && data.dealsWonAmount}
          />
        </div> */}
      </div>
    );
  }
}
const mapStateToProps = ({ widgetState }) => {
  const { crmSummary } = widgetState;
  return { crmSummary };
};

export default connect(
  mapStateToProps,
  { getCrmSummary }
)(CrmSummary);
