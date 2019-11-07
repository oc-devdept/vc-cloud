import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// Modal
import DialogRoot from "Components/Dialog/DialogRoot";

// Components
import {
  leadListPage,
  singleAccount,
  singleDeal,
  singleCustomer
} from "Helpers/crmURL";

import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Actions
import { handleSuccessConvertModal } from "Ducks/crm/lead";

const useStyles = makeStyles({
  avatar: {
    height: 140,
    width: 140,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#fff",
    boxShadow: "0 1px 15px 1px rgba(69, 65, 78, 0.13)"
  }
});

function ConvertSuccessModal(props) {
  const { show, newDeal, newAcct, newCust } = props.successMsg;
  const classes = useStyles();
  function closeModal() {
    props.handleSuccessConvertModal();
    props.history.push(leadListPage);
  }

  return (
    <DialogRoot
      fullBlock
      show={show}
      handleHide={() => closeModal()}
      size="sm"
      close
    >
      <div className="user-profile-widget">
        <div
          className={`bg-success rounded-top`}
          style={{ paddingTop: "8rem" }}
        />
        <div className="p-20 px-60">
          <div className="d-flex user-avatar justify-content-center">
            <div>
              <Avatar className={classes.avatar}>
                <i
                  className="ti ti-crown text-warning"
                  style={{ /* color: "#e5aa4a", */ fontSize: "4rem" }}
                />
              </Avatar>
              <h2 className="mt-20" style={{ fontSize: "1.5rem" }}>
                Lead Converted Sucessfully!
              </h2>
            </div>
          </div>
          <div className="mt-20 text-muted text-center">
            <p>
              Customer:
              <Link className="ml-5" to={singleCustomer(newCust.id)}>
                {newCust.name}
              </Link>
            </p>
            <p>
              Account:
              <Link className="ml-5" to={singleAccount(newAcct.id)}>
                {newAcct.name}
              </Link>
            </p>
            {newDeal && (
              <p>
                Deal:
                <Link className="ml-5" to={singleDeal(newDeal.id)}>
                  {newDeal.name}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </DialogRoot>
  );
}

const mapStateToProps = ({ crmState }) => {
  const { leadState } = crmState;
  const { successMsg } = leadState.leadToConvert;
  return { successMsg };
};

export default withRouter(
  connect(
    mapStateToProps,
    { handleSuccessConvertModal }
  )(ConvertSuccessModal)
);
