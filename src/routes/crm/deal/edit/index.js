import React, { Component } from "react";
import { connect } from "react-redux";

// Sub components
import { Helmet } from "react-helmet";

// Page Components
import DealForm from "../components/form/DealForm";
import RctPageLoader from "Components/RctPageLoader";

// Actions
import { editDeal, getSingleDeal } from "Ducks/crm/deal";

class crm_edit_deal extends Component {
  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleDeal(id);
  }

  render() {
    const { loading, deal } = this.props.dealToView;
    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | New Deal</title>
          <meta name="description" content="Everyday Deals Creation" />
        </Helmet>
        {loading ? (
          <RctPageLoader />
        ) : (
          <DealForm
            title="sidebar.editDeal"
            edit={deal}
            handleSubmit={this.props.editDeal}
          />
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ crmState }) => {
  const { dealState } = crmState;
  const { dealToView } = dealState;
  return { dealToView };
};

export default connect(
  mapStateToProps,
  { editDeal, getSingleDeal }
)(crm_edit_deal);
