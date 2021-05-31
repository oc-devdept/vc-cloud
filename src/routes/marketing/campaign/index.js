import React, { Component } from "react";
import { connect } from "react-redux";


import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// components
import CampaignList from "./components/CampaignList";
import * as url from "Helpers/marketingURL";

// Actions
import { getAllCampaign } from "Ducks/marketing/campaign";

// import { mailgunSettings } from "../../../helpers/settingsURL";
class mail_campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newCampaign = this.newCampaign.bind(this);
  }

  newCampaign() {
    this.props.history.push(url.campaignNewPage);
  }

  componentDidMount() {
    this.props.getAllCampaign();
    // this.props.getUserMailSetting();
    //this.props.getMailKey(this.props.loggedInUser.id);
  }

  render() {

    const { action, tableData, loading } = this.props.campaignList;
    console.log(tableData);
    return (
      <React.Fragment>
        <Helmet title="Campaign List" metaDesc="VentureCar Campaign List" />
        <PageTitleBar
          title="All Campaigns"
          actionGroup={{
            add: { onClick: this.newCampaign },
          }}
        />
      
        <CampaignList action={action} tableData={tableData} loading={loading} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ marketingState }) => {
  const { campaignState } = marketingState;
  const { campaignList } = campaignState;

  return { campaignList };
};

export default connect(mapStateToProps, {
  getAllCampaign,
})(mail_campaign);
