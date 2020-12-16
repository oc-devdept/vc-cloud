import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// components
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import SystemAlert from "Components/Alert/SystemAlert";
import CampaignList from "./components/CampaignList";
import CampaignDetails from "./components/CampaignDetails";
import CampaignStatus from "./components/CampaignStatus";
import SendCampaignNowAlert from "./components/SendCampaignNowAlert";

import ProfileTabs from "Components/Layout/ProfileTabs";

import { Button } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

// Actions
import {
  getAllCampaign,
  sendCampaignNow,
  deleteCampaign
} from "Ducks/marketing/campaign";

class mail_campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newCampaign = this.newCampaign.bind(this);
    this.deleteCampaignDialog = this.deleteCampaignDialog.bind(this);
  }

  componentDidMount() {
    this.props.getAllCampaign();
  }

  newCampaign() {
    this.props.history.push("/app/marketing/campaign/new");
  }

  deleteCampaignDialog(id, name) {
    this.props.show("alert_delete", {
      name,
      action: () => this.props.deleteCampaign(id)
    });
  }

  sendCampaign(id, title) {
    this.props.show("send_campaign_prompt", {
      name: title,
      sendNow: () => this.props.sendCampaignNow(id)
    });
  }

  render() {
    const { campaignList, campaignToView } = this.props;
    const campaign = campaignToView.data;
    return (
      <React.Fragment>
        <Helmet title="Campaign List" metaDesc="Huttons CRM Campaign List" />
        <PageTitleBar
          title="All Campaigns"
          actionGroup={{
            add: { onClick: this.newCampaign }
          }}
        />
        <div className="row">
          <div className="col-md-3">
            <BgCard heading="Existing Campaigns" fullBlock>
              {campaignList.loading && <RctSectionLoader />}
              <CampaignList list={campaignList.list} />
            </BgCard>
          </div>
          <div className="col-md-9">
            <div>
              {campaignToView.loading && <RctSectionLoader />}
              {campaign ? (
                <React.Fragment>
                  <div className="d-flex justify-content-between">
                    <h2 className="fw-bold mb-20">{campaign.name}</h2>
                    <div>
                      {/* <Button size="small" variant="outlined" className="ml-10">
                        Edit
                        <Edit className="ml-10" style={{ fontSize: 14 }} />
                      </Button> */}
                      <Button
                        size="small"
                        variant="outlined"
                        className="text-danger border-danger ml-10"
                        onClick={() =>
                          this.deleteCampaignDialog(campaign.id, campaign.name)
                        }
                      >
                        Delete
                        <Delete className="ml-10" style={{ fontSize: 14 }} />
                      </Button>
                    </div>
                  </div>
                  <ProfileTabs>
                    <div label="Summary">
                      {campaign.sentOn ? (
                        <CampaignStatus data={campaign} />
                      ) : (
                        <SystemAlert
                          title="Heads up!"
                          message="This campaign isn't
                              sent yet. You can opt to send now or wait till the
                              scheduled time."
                          action={() =>
                            this.sendCampaign(campaign.id, campaign.name)
                          }
                          actionText="Send now"
                        />
                      )}
                      <CampaignDetails data={campaign} />
                    </div>
                    <div label="">show message</div>
                  </ProfileTabs>
                </React.Fragment>
              ) : (
                <div className="text-center my-20">
                  <h3>No Campaigns to show</h3>
                  <p className="fs-14">
                    Select a campaign from the list to start viewing
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <SendCampaignNowAlert />
        {console.log(this.props)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ marketingState }) => {
  const { campaignState } = marketingState;
  const { campaignList, campaignToView } = campaignState;
  return { campaignList, campaignToView };
};

export default connect(mapStateToProps, {
  getAllCampaign,
  show,
  sendCampaignNow,
  deleteCampaign
})(mail_campaign);
