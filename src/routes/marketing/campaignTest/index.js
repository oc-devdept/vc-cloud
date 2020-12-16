import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import { NavLink } from "react-router-dom";
import SystemAlert from "Components/Alert/SystemAlert";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// components
import CampaignList from "./components/CampaignList";
import * as url from "Helpers/marketingURL";


// Actions
import { getAllCampaign } from "Ducks/marketing/campaign";




class mail_campaignTest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newCampaign = this.newCampaign.bind(this);
  }

  newCampaign() {
    // this.props.history.push(url.campaignNewPage);
    this.props.history.push("/app/marketing/campaign/new");
  }

  componentDidMount() {
    this.props.getAllCampaign();

  }

  render() {

    const { action, list, loading } = this.props.campaignList;
    return (
      <React.Fragment>
        {console.log(this.props)}
        <Helmet title="Campaign List" metaDesc="Venture Cars Campaign List" />
        <PageTitleBar
          title="All Campaigns"
          actionGroup={{
            add: { onClick: this.newCampaign },
          }}
        />
        {console.log(this.props)}
        <CampaignList action={action} tableData={list} loading={loading} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ sessionState, marketingState }) => {
  const { authState } = sessionState;
  const { loggedInUser, loading } = authState;
  const { campaignState } = marketingState;
  const { campaignList } = campaignState;
  const { mailSettingState } = marketingState;

  return { campaignList, loggedInUser };
};

export default connect(mapStateToProps, {
  getAllCampaign,

  

})(mail_campaignTest);
