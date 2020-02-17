import React, { Component } from "react";
import { connect } from "react-redux";

// Global Req
import Helmet from "Components/Helmet";
// Components
import ImportRecords from "Components/ImportRecords";

// Actions
import { importRecord, fetchImportMapping } from "Ducks/import";

class crm_import_lead extends Component {
  constructor(props) {
    super(props);
    this.importLeadRecord = this.importLeadRecord.bind(this);
  }

  componentDidMount() {
    this.props.fetchImportMapping("leads");
  }
  importLeadRecord(file) {
    this.props.importRecord("leads", file);
  }

  render() {
    return (
      <React.Fragment>
        <Helmet title="Import Leads" />
        <ImportRecords importType="lead" importAction={this.importLeadRecord} />
      </React.Fragment>
    );
  }
}

export default connect(null, { importRecord, fetchImportMapping })(
  crm_import_lead
);
