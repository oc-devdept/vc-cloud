import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { InfoOutlined } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";

const AccountSelection = ({
  name,
  companyName,
  data,
  count,
  handleChange,
  accountToLink
}) => {
  return count > 0 ? (
    <div>
      <p>
        There are {count} existing account(s) similar to{" "}
        <strong>{companyName}</strong>
      </p>
      <hr />
      <div>
        <RadioGroup
          name="account"
          defaultValue={accountToLink}
          onChange={handleChange}
        >
          {data.map((acct, key) => {
            return (
              <FormControlLabel
                key={key}
                value={acct.id}
                control={
                  <Radio
                    color="primary"
                    icon={<RadioButtonUncheckedIcon fontSize="small" />}
                    checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                  />
                }
                label={
                  <p className="mb-0">
                    Add to existing Account:{" "}
                    <span style={{ background: "#ddd", padding: "3px 7px" }}>
                      {acct.name}{" "}
                      <Tooltip
                        title={
                          <div>
                            <div className="row">
                              <div className="col-md-3 text-left">Account:</div>
                              <div className="col-md-9 text-right">
                                {acct.name}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3 text-left">Owner:</div>
                              <div className="col-md-9 text-right">
                                {acct.name}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3 text-left">Phone:</div>
                              <div className="col-md-9 text-right">
                                {acct.baseContact.phone}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3 text-left">Website:</div>
                              <div className="col-md-9 text-right">
                                {acct.baseContact.website}
                              </div>
                            </div>
                          </div>
                        }
                        placement="top"
                      >
                        <InfoOutlined
                          fontSize="inherit"
                          style={{ verticalAlign: "text-bottom" }}
                        />
                      </Tooltip>
                    </span>
                  </p>
                }
              />
            );
          })}
          <FormControlLabel
            value=""
            control={
              <Radio
                color="primary"
                icon={<RadioButtonUncheckedIcon fontSize="small" />}
                checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
              />
            }
            label={
              <p className="mb-0">
                Create new Account: <strong>{companyName}</strong>
              </p>
            }
          />
        </RadioGroup>
      </div>
    </div>
  ) : (
    <div>
      <p>
        Create New Account: <strong>{`${companyName}`}</strong>
      </p>
      <p>
        Create New Customer: <strong>{`${name}`}</strong>
      </p>
    </div>
  );
};

export default AccountSelection;
