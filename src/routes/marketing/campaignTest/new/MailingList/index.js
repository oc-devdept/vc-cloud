import React, { Component } from "react";
import { connect } from "react-redux";
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";

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
import { getAllMailingList } from "Ducks/marketing/mail";
// import { getUserQuota } from "Ducks/marketing/mailSetting";

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

class MailingListForm extends Component {

  componentDidMount() {
    this.props.getAllMailingList();

  }
  seperateList(allFollowup) {
    const ownedbyme = [];    
    for (const followup of allFollowup) {
      followup.ownedbyme
        ? ownedbyme.push(followup)
        : "";
      // followup.completed
      //   ? completed.push(followup)
      //   : upcoming.push(followup);
    }
    return { ownedbyme };
  }

  render() {
    //  mailingList: []
    const { onChange, data, allMailingList, adminMailingList } = this.props;
    const { loading, list } = allMailingList;
    // const { current, quota, paidQuota } = this.props.userSetting;
    const { ownedbyme } = this.seperateList(list);
  
    return (
      <React.Fragment>
      

        <div className="row mb-20">
          <div className="col-md-12">
            {loading && <RctSectionLoader />}
            <FormControl>
              <InputLabel id="demo-mutiple-chip-label">
                A. Mailing List
              </InputLabel>
              <Select
                id="demo-mutiple-chip"
                // multiple
                value={data}
                onChange={e => onChange(e.target.value)}
                input={<Input id="select-multiple-chip" />}
                renderValue={data => (
                  <div>
                    {data.map((value, key) => (
                      <Chip
                        key={key}
                        label={`${value.name} - Num of recipients ${value.count}`}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {ownedbyme.map((li, key) => (
                  <MenuItem key={key} value={li}>
                    {li.name}{" "}
                    <small className="ml-10">
                      Num. of recipients: {li.count}
                    </small>
                    {!li.ownedbyme && li.adminList && (
                      <small className="ml-10">
                        Shared list
                      </small>
                    )}
                    {li.ownedbyme && li.adminList && (
                      <small className="ml-10">
                        {/* Shared list by me */}
                      </small>
                    )}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Select the list of recipients that you want this campaign to be
                sent to.
              </FormHelperText>
            </FormControl>
          </div>
        </div>
        {/* <div className="row my-20">
          <div className="col-md-12">
            {adminMailingList.loading && <RctSectionLoader />}
            <FormInput
              label="B. Admin's Mailing List (Optional)"
              value={data.adminMailingListId}
              target="adminMailingListId"
              selectValues={adminMailingList.list}
              selectField="id"
              handleChange={onChange}
              helperText="Select from one of the admin created mailing list to send this campaign."
            />
          </div>
        </div> */}
        {/* {console.log("MAILING LIST ")}
        {console.log(this.props)} */}
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ marketingState, sessionState }) => {
  const { mailState } = marketingState;
  // const { userSetting } = mailSettingState;
  const { allMailingList, adminMailingList, } = mailState;
  const { authState } = sessionState;
  const { loggedInUser } = authState;
  return { allMailingList, adminMailingList,  loggedInUser };
};

export default connect(mapStateToProps, { getAllMailingList })(MailingListForm);
