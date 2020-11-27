import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
// Components
import RctSectionLoader from "Components/RctSectionLoader";
import BgCard from "Components/BgCard";
import InterestRate from "./components/InterestRate";
import { IconButton } from "@material-ui/core";
import { Icon } from '@iconify/react';

// Actions
import addFilled from '@iconify/icons-carbon/add-filled';


import UserEmailForm from "./components/UserEmailForm";
import UserEmailTable from "./components/UserEmailTable";
import { getEmailSettings } from "Ducks/setting/EmailSettings";

class NotificationSettings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEmailSettings();

  }
  changeEmailSettings = (value) => {
    // console.log("CHANGE USER QUOTA")

    this.props.show("user_email_form", {
        email: value ? value[0] : "" ,
        testDrive: value ? value[1] : false ,
        maintenance: value ? value[2] : false,
        enquiry: value ? value[3] : false ,
        id: value ? value[4] : false
        // id: value[7]
        // followupableId: followupableId
    })

};
  render() {
    const tableData = [];
    // console.log("props= ", this.props);
    const { EmailSettingsState } = this.props;
    // const { tableData } = this.props.EmailSettingsState;
    return (
      <React.Fragment>
        {/* {EmailSettingsState.loading && <RctSectionLoader />} */}
        <h1>HERE IN NOTIFIC SETTINGS</h1>
        <BgCard fullblock>
          {/* <InterestRate
            interestRate={webSettingsState.interestRate}
            updateInterestRate={this.props.updateInterestRate}
            addInterestRate={this.props.addInterestRate}
          /> */}
           <IconButton size="small"
              onClick={() => this.changeEmailSettings()}
            >
              <Icon
                className="tableEditIcon"
                icon={addFilled}
                color="#12394C"
                width="2rem"
                height="2rem"
              />
            </IconButton>
            < UserEmailTable tableData={EmailSettingsState.tableData} changeEmailSettings={this.changeEmailSettings} />
          <UserEmailForm changeEmailSettings={this.changeEmailSettings} />
        </BgCard>
        {console.log(EmailSettingsState)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ EmailSettingsState }) => {
  return { EmailSettingsState };
};

export default connect(mapStateToProps, {

  show,
  getEmailSettings
})(NotificationSettings);
