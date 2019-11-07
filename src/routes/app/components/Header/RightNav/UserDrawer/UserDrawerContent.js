import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { ExitToApp, Settings } from "@material-ui/icons";
import { Scrollbars } from "react-custom-scrollbars";

// Avatar
import Avatar from "Components/Avatar";

// Logout
import { logoutUser } from "Ducks/session/auth";
import Auth from "Auth";

// Calendar widget
import Calendar from "Components/Widgets/Calendar/CalendarLayout";

function UserDrawerContent(props) {
  const toggleDrawer = props.toggleDrawer;
  const { loggedInUser, history } = props;
  function toSettingPage() {
    history.push("/app/settings");
  }
  return (
    <div className="user-drawer" role="presentation" onKeyDown={toggleDrawer()}>
      <div className="d-flex top-drawer">
        <div className="media">
          <div className="media-left mr-25">
            <Avatar name={loggedInUser.name} size={60} />
          </div>
          <div className="media-body my-auto">
            <h2 className="mb-5">
              {loggedInUser.name ? loggedInUser.name : ""}
            </h2>
            <span className="text-muted fs-14 mb-0 d-block">
              {loggedInUser.email ? loggedInUser.email : ""}
            </span>
          </div>
        </div>
      </div>
      <hr />
      <Scrollbars
        className="rct-scroll"
        autoHeightMin={350}
        style={{ maxHeight: "calc(100vh - 250px)" }}
      >
        <div className="user-drawer-content">
          <Calendar />
        </div>
      </Scrollbars>
      <div className="drawer-footer">
        <hr />
        <div className="drawer-actions">
          <Button
            variant="text"
            aria-label="settings"
            onClick={() => toSettingPage()}
          >
            <Settings />
            Settings
          </Button>
          <Button
            aria-label="logout"
            onClick={() => {
              const token = new Auth().retrieveAccessToken();
              props.logoutUser(token);
            }}
          >
            <ExitToApp />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

// map state to props
const mapStateToProps = ({ sessionState }) => {
  const { authState } = sessionState;
  const { loggedInUser } = authState;
  return { loggedInUser };
};

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(UserDrawerContent)
);
