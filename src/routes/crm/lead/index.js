import React, { Component } from "react";
import { connect } from "react-redux";
//Sub Components
import LeadList from "./components/LeadList";
//Page Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
// List View
// import ListViewSelector from "Components/PageTitleBar/ListViewSelector";
// ListSummary
// import ListSummary from "Components/ListSummary";
// import ShowListSummaryButton from "Components/ShowListSummaryButton";
// Actions
import { changeLeadView, getAllLead, getLeadSummary } from "Ducks/crm/lead";
import { leadNewPage, leadImportPage } from "Helpers/crmURL";

class crm_lead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSummary: false
    };
    this.importLead = this.importLead.bind(this);
    this.newLead = this.newLead.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.props.getAllLead();
    //this.props.getLeadSummary();
  }

  toggleSummary() {
    this.setState({ showSummary: !this.state.showSummary });
  }

  refresh() {
    this.props.getAllLead();
  }
  importLead() {
    this.props.history.push(leadImportPage);
  }
  newLead() {
    this.props.history.push(leadNewPage);
  }

  render() {
    const {
      //options,
      nowShowing,
      action,
      tableData,
      loading
    } = this.props.leadList;
    // const { summary } = this.props.leadSummary;
    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Leads</title>
          <meta name="description" content="Everyday Leads Generation" />
        </Helmet>
        <PageTitleBar
          title={nowShowing}
          actionGroup={{
            add: { onClick: this.newLead },
            // mid: { label: "Import", onClick: this.importLead },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
        />
        {/* <div className="d-flex">
          <ListViewSelector
            options={options}
            nowShowing={nowShowing}
            onChangeValue={this.props.changeLeadView}
          />
          <ShowListSummaryButton action={() => this.toggleSummary()} />
        </div> 
        this.state.showSummary && <ListSummary summary={summary} /> */}
        <LeadList
          // title={nowShowing}
          action={action}
          tableData={tableData}
          loading={loading}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ crmState }) => {
  const { leadState } = crmState;
  const { leadList, leadSummary } = leadState;
  return { leadList, leadSummary };
};

export default connect(
  mapStateToProps,
  {
    changeLeadView,
    getAllLead,
    getLeadSummary
  }
)(crm_lead);
