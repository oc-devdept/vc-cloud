import React, { Component } from "react";
import { connect } from "react-redux";

//sub components
import DealList from "./components/DealList";

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
// import ListViewSelector from "Components/PageTitleBar/ListViewSelector";

// // List Summary
// import ListSummary from "Components/ListSummary";
// import ShowListSummaryButton from "Components/ShowListSummaryButton";

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
    const {
      // options,
      nowShowing,
      action,
      tableData,
      loading
    } = this.props.dealState.dealList;
    // const { summary } = this.props.dealState.dealSummary;
    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Deals</title>
          <meta name="description" content="Everyday Deals Management" />
        </Helmet>
        <PageTitleBar
          title={nowShowing}
          actionGroup={{
            add: { onClick: this.newDeal },
            // mid: { label: "Import", onClick: this.importDeal },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
        />
        {/* <div className="d-flex">
               <ListViewSelector
                options={options}
                nowShowing={nowShowing}
                onChangeValue={this.props.changeDealView}
              />  <ShowListSummaryButton action={() => this.toggleSummary()} /> 
              </div> */}
        {/* {this.state.showSummary && <ListSummary summary={summary} />} */}
        <DealList action={action} tableData={tableData} loading={loading} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ crmState }) => {
  const { dealState } = crmState;
  return { dealState };
};

export default connect(
  mapStateToProps,
  {
    changeDealView,
    getAllDeal,
    getDealSummary
  }
)(crm_deal);
