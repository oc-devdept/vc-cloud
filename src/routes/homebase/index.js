import React, { Component } from "react";
import { connect } from "react-redux";

// sub components
import { Helmet } from "react-helmet";

import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// Widgets
import CalendarLayout from "Components/Widgets/Calendar/CalendarLayout";
import CrmSummary from "Components/Widgets/CrmSummary";
import UntouchedLeadsTable from "Components/Widgets/UntouchedLeadsTable";

class Homebase extends Component {
  render() {
    const { name } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Homebase</title>
          <meta name="description" content="Everyday System" />
        </Helmet>
        <PageTitleBar title={`Hello ${name},`} noBack />
        <CrmSummary />
        <div className="row">
          <div className="col-md-8">
            <UntouchedLeadsTable />
          </div>
          <div className="col-md-4">
            <CalendarLayout />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ sessionState }) => {
  const { authState } = sessionState;
  const { name } = authState.loggedInUser;
  return { name };
};

export default connect(mapStateToProps)(Homebase);
