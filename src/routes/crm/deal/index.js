import React, { Component } from "react";
import { connect } from "react-redux";

//sub components
import DealList from "./components/DealList";

// page req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// Actions
import { changeDealView, getAllDeal, getDealSummary } from "Ducks/crm/deal";
import { dealNewPage } from "Helpers/crmURL";

class crm_deal extends Component {
  constructor(props) {
    super(props);
    this.newDeal = this.newDeal.bind(this);
    this.refresh = this.refresh.bind(this);
    this.importDeal = this.importDeal.bind(this);
  }
  state = {
    showSummary: false
  };

  componentDidMount() {
    this.props.getAllDeal();
    this.props.getDealSummary();
  }

  toggleSummary() {
    this.setState({ showSummary: !this.state.showSummary });
  }

  newDeal() {
    this.props.history.push(dealNewPage);
  }

  refresh() {
    this.props.getAllDeal();
  }
  importDeal() {
    console.log("massImportDeals");
  }

  render() {
    const { nowShowing, tableData, loading } = this.props.dealState.dealList;
    return (
      <React.Fragment>
        <Helmet title="Deals" />
        <PageTitleBar
          title={nowShowing}
          actionGroup={{
            add: { onClick: this.newDeal },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
        />
        <DealList tableData={tableData} loading={loading} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ crmState }) => {
  const { dealState } = crmState;
  return { dealState };
};

export default connect(mapStateToProps, {
  changeDealView,
  getAllDeal,
  getDealSummary
})(crm_deal);
