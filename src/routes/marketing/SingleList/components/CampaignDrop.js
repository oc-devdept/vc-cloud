import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from 'react-router-dom';
import StatusBadge from "Components/StatusBadge/StatusBadge";
import RctSectionLoader from "Components/RctSectionLoader";
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
// import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import BgCard from "Components/BgCard";
import Button from "@material-ui/core/Button";
import { Icon, InlineIcon } from '@iconify/react';
import googleGmail from '@iconify/icons-ic/round-email';
import Paper from "@material-ui/core/Paper";


// import whatsappIcon from '@iconify/icons-logos/whatsapp';

// Input
import {
    Input,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Chip,
    FormHelperText
} from "@material-ui/core";

// Actions
import { getCampaignMailingList, getWACampaignMailingList } from "Ducks/marketing/mail";

import { singleCampaign, singleWaCampaign } from "Helpers/marketingURL";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

class campaignDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            id: '',
            selectedWA: '',
            idWA: '',
        };

        this.onSelect = this.onSelect.bind(this);

    }
    componentDidMount() {
        this.props.getCampaignMailingList("", this.props.listId);
        this.props.getWACampaignMailingList("", this.props.listId);
    }

    async onSelect(val) {
        this.setState({
            selected: val.name,
            id: val.listId,
        })
        // console.log("ON CHANGE");
        let roo = "/app/marketing/campaigns/" + val.listId
        // console.log(roo);

        console.log(roo);
        singleCampaign(val.id);
        this.props.history.push(roo);
    }
    async onWASelect(val) {
        this.setState({
            selectedWA: val.name,
            idWA: val.listId,
        })
        this.props.history.push(singleWaCampaign(val.id));
    }


    render() {
        //  mailingList: []
        const { onChange, data, allMailingList, adminMailingList, campaignMailingList, campaignWAMailingList } = this.props;
        // const { loading, list } = allMailingList;
        const { loading, list } = campaignMailingList;
        const { listWA } = campaignWAMailingList;
        return (
            <React.Fragment>
                <div className="row ml-70 mt-30 mb-20  md-8">
                    <div className="row  justify-content:left col-md-5 ">
                        <div className="row  pl-25 ">
                            <h4>View the campaigns that this Mailing List was used in:</h4>
                        </div>
                        <Paper>
                            <div className="col-md-12">

                                {loading && <RctSectionLoader />}
                                <FormControl className="mb-10">

                                    <InputLabel id="demo-mutiple-chip-label ">
                                        <InlineIcon icon={googleGmail} />   Select from the list of Email Marketing Campaigns
              </InputLabel>

                                    <Select
                                        id="demo-mutiple-chip"
                                        // multiple
                                        value={this.state.selected}
                                        onChange={e => this.onSelect(e.target.value)}
                                        input={<Input id="select-multiple-chip" />}
                                        // renderValue={list => (
                                        //     <div>

                                        //         {console.log("LIST IS ")}
                                        //         {console.log(list)}
                                        //         {list.map((value, key) => (
                                        //             <Chip
                                        //                 key={key}
                                        //                 label={`${value.name} - Num of recipients ${value.count}`}
                                        //             />
                                        //         ))}
                                        //     </div>
                                        // )}
                                        MenuProps={MenuProps}
                                    >
                                        {list.map((li, key) => (
                                            <MenuItem key={key} value={li}>
                                                {li.name}{" "}
                                                {/* <small className="ml-10">
                                                    Num. of recipients: {li.count}
                                                </small>
                                                {!li.ownedbyme && li.adminList && (
                                                    <small className="ml-10">
                                                        Shared list
                                                    </small>
                                                )}
                                                {li.ownedbyme && li.adminList && (
                                                    <small className="ml-10">
                                                        Shared list by me
                                                    </small> */}

                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {/* <FormHelperText>
                                Select the list of recipients that you want this campaign to be
                                sent to.
              </FormHelperText> */}
                                </FormControl>

                            </div>
                        </Paper>

                    </div>
                    <div className=" pb-20 pt-30 pr-5 " >
                        <Button
                            style={{ "background": "#ff952e" }}
                            onClick={this.onSubmit}
                            className="ml-20 mt-30   btn-success text-white"
                            variant="contained"
                            color="primary"
                        >
                            View
            </Button>

                    </div>

                </div>

                {/*// DIV FOR WHATS AP CAMPAIGNS*/}
                <div className="row ml-70 mt-30 mb-20  md-8">
                    <div className="row  justify-content:left col-md-5 ">
                        <div className="row  pl-25 ">
                            <h4>View the WhatsApp campaigns that this Mailing List was used in:</h4>
                        </div>
                        <Paper>
                            <div className="col-md-12">

                                {loading && <RctSectionLoader />}
                                <FormControl className="mb-10">

                                    <InputLabel id="demo-mutiple-chip-label ">
                                        {/* <InlineIcon icon={whatsappIcon} />  */}
                                         <span> </span> Select from the list of WhatsApp Marketing Campaigns
              </InputLabel>

                                    <Select
                                        id="demo-mutiple-chip"
                                        // multiple
                                        value={this.state.selectedWA}
                                        onChange={e => this.onWASelect(e.target.value)}
                                        input={<Input id="select-multiple-chip" />}
                                        // renderValue={list => (
                                        //     <div>

                                        //         {console.log("LIST IS ")}
                                        //         {console.log(list)}
                                        //         {list.map((value, key) => (
                                        //             <Chip
                                        //                 key={key}
                                        //                 label={`${value.name} - Num of recipients ${value.count}`}
                                        //             />
                                        //         ))}
                                        //     </div>
                                        // )}
                                        MenuProps={MenuProps}
                                    >
                                        {listWA.map((li, key) => (
                                            <MenuItem key={key} value={li}>
                                                {li.waCampaignName}{" "}
                                                {/* <small className="ml-10">
                                                    Num. of recipients: {li.count}
                                                </small>
                                                {!li.ownedbyme && li.adminList && (
                                                    <small className="ml-10">
                                                        Shared list
                                                    </small>
                                                )}
                                                {li.ownedbyme && li.adminList && (
                                                    <small className="ml-10">
                                                        Shared list by me
                                                    </small> */}

                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {/* <FormHelperText>
                                Select the list of recipients that you want this campaign to be
                                sent to.
              </FormHelperText> */}
                                </FormControl>

                            </div>
                        </Paper>

                    </div>
                    <div className=" pb-20 pt-30 pr-5  " >
                        <Button
                            style={{ "background": "#ff952e" }}
                            onClick={this.onSubmit}
                            className="ml-20 mt-30   btn-success text-white"
                            variant="contained"
                            color="primary"
                        >
                            View
            </Button>

                    </div>

                </div>

                {/* {console.log("CAMPAIGN DROP")}
                {console.log(this.props)} */}
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ marketingState }) => {
    const { mailState } = marketingState;
    const { allMailingList, adminMailingList, campaignMailingList, campaignWAMailingList } = mailState;
    return { allMailingList, adminMailingList, campaignMailingList, campaignWAMailingList };
};

export default withRouter(connect(mapStateToProps, { getCampaignMailingList, getWACampaignMailingList })(campaignDrop));