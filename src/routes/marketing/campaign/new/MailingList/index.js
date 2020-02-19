import React, { Component } from "react";
import { connect } from "react-redux";

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

  render() {
    //  mailingList: []
    const { onChange, data, allMailingList, adminMailingList } = this.props;
    const { loading, list } = allMailingList;

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
                {list.map((li, key) => (
                  <MenuItem key={key} value={li}>
                    {li.name}{" "}
                    <small className="ml-10">
                      Num. of recipients: {li.count}
                    </small>
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
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ marketingState }) => {
  const { mailState } = marketingState;
  const { allMailingList, adminMailingList } = mailState;
  return { allMailingList, adminMailingList };
};

export default connect(mapStateToProps, { getAllMailingList })(MailingListForm);
