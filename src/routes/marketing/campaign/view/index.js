import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import * as url from "Helpers/marketingURL";

import SystemAlert from "Components/Alert/SystemAlert";
import ProfileTabs from "Components/Layout/ProfileTabs";
import RecordNotFound from "Components/Error/RecordNotFound";
import RctPageLoader from "Components/RctPageLoader";

import CampaignDetails from "../components/CampaignDetails";
import CampaignStatus from "../components/CampaignStatus";
import SendCampaignNowAlert from "../components/SendCampaignNowAlert";
import CampaignCard from "../components/CampaignCard";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { getDateTime } from "Helpers/helpers";

// Actions
import { sendCampaignNow, deleteCampaign, getCampaign } from "Ducks/marketing/campaign";

class campaign_single_view extends Component {
  constructor(props) {
    super(props);

    this.newCampaign = this.newCampaign.bind(this);
    this.deleteCampaignDialog = this.deleteCampaignDialog.bind(this);
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getCampaign(id);
  }

  newCampaign() {
    this.props.history.push(url.campaignNewPage);
  }

  deleteCampaignDialog(id, name) {
    this.props.show("alert_delete", {
      name,
      action: () => {
        this.props.deleteCampaign(id);
        this.props.history.push(url.campaignListPage);
      },
    });
  }

  sendCampaign(id, title) {
    this.props.show("send_campaign_prompt", {
      name: title,
      sendNow: () => this.props.sendCampaignNow(id),
    });
  }

  render() {
    const { loading, data } = this.props.campaignToView;
    let stat = data ? data.campaignStat : {};
    return (
      <React.Fragment>
        {loading ? (
          <RctPageLoader />
        ) : data ? (
          <React.Fragment>
            <Helmet title="View Campaign" />
            <PageTitleBar
              title="View Campaign"
              actionGroup={{
                add: { onClick: this.newCampaign },
                mid: {
                  label: "Delete",
                  onClick: () => this.deleteCampaignDialog(data.id, data.name),
                },
              }}
            />

            <div className="row">
              <div className="col-lg-3">
                <CampaignCard campaign={data} />
              </div>
              <div className="col-lg-9">
                <React.Fragment>
                  <ProfileTabs>
                    <div label="Summary">
                      {data.sentOn || data.triggerName ? (
                        <CampaignStatus data={data} />
                      ) : (
                        <SystemAlert
                          title="Heads up!"
                          message="This campaign has not been sent yet. You can opt to send now or wait till the scheduled time."
                          action={() => this.sendCampaign(data.id, data.name)}
                          actionText="Send now"
                        />
                      )}
                      <CampaignDetails data={data} />
                    </div>
                    <div label="Template">
                      <iframe
                        scrolling="auto"
                        frameBorder={0}
                        style={{
                          // transform: "scale(0.5, 1) translateX(-55%)",
                          width: "100%",
                          height: "800px",
                        }}
                        src={"data:text/html;charset=utf-8," + encodeURIComponent(data.htmlContent)}
                      ></iframe>
                    </div>
                    <div label="Delivered to">
                      <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Recipient</TableCell>
                              <TableCell>IP address</TableCell>
                              <TableCell>Time</TableCell>
                              <TableCell>Country</TableCell>
                              <TableCell>Client</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {stat &&
                              stat.deliveredArray &&
                              stat.deliveredArray.map((row) => (
                                <TableRow key={row.recipient}>
                                  <TableCell component="th" scope="row">
                                    {row.recipient}
                                  </TableCell>
                                  <TableCell>{row.ip_address}</TableCell>
                                  <TableCell>{getDateTime(new Date(parseInt(row.time) * 1000))}</TableCell>
                                  <TableCell>{row.country}</TableCell>
                                  <TableCell>{row.client}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                    <div label="Failed delivery">
                      <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Recipient</TableCell>
                              <TableCell>IP address</TableCell>
                              <TableCell>Time</TableCell>
                              <TableCell>Country</TableCell>
                              <TableCell>Client</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {stat &&
                              stat.failedArray &&
                              stat.failedArray.map((row) => (
                                <TableRow key={row.recipient}>
                                  <TableCell component="th" scope="row">
                                    {row.recipient}
                                  </TableCell>
                                  <TableCell>{row.ip_address}</TableCell>
                                  <TableCell>{getDateTime(new Date(parseInt(row.time) * 1000))}</TableCell>
                                  <TableCell>{row.country}</TableCell>
                                  <TableCell>{row.client}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                    <div label="Viewed by">
                      <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Recipient</TableCell>
                              <TableCell>IP address</TableCell>
                              <TableCell>Time</TableCell>
                              <TableCell>Country</TableCell>
                              <TableCell>Client</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {stat &&
                              stat.viewedArray &&
                              stat.viewedArray.map((row) => (
                                <TableRow key={row.recipient}>
                                  <TableCell component="th" scope="row">
                                    {row.recipient}
                                  </TableCell>
                                  <TableCell>{row.ip_address}</TableCell>
                                  <TableCell>{getDateTime(new Date(parseInt(row.time) * 1000))}</TableCell>
                                  <TableCell>{row.country}</TableCell>
                                  <TableCell>{row.client}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                    <div label="Clicked by">
                      <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Recipient</TableCell>
                              <TableCell>IP address</TableCell>
                              <TableCell>Time</TableCell>
                              <TableCell>Country</TableCell>
                              <TableCell>Client</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {stat &&
                              stat.clickedArray &&
                              stat.clickedArray.map((row) => (
                                <TableRow key={row.recipient}>
                                  <TableCell component="th" scope="row">
                                    {row.recipient}
                                  </TableCell>
                                  <TableCell>{row.ip_address}</TableCell>
                                  <TableCell>{getDateTime(new Date(parseInt(row.time) * 1000))}</TableCell>
                                  <TableCell>{row.country}</TableCell>
                                  <TableCell>{row.client}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </ProfileTabs>
                </React.Fragment>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <RecordNotFound />
        )}
        <SendCampaignNowAlert />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ marketingState }) => {
  const { campaignState } = marketingState;
  const { campaignToView } = campaignState;
  return { campaignToView };
};

export default connect(mapStateToProps, {
  show,
  sendCampaignNow,
  deleteCampaign,
  getCampaign,
})(campaign_single_view);
