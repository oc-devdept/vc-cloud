import React from "react";
import { connect } from "react-redux";
import { Menu, Settings, ExitToApp } from "@material-ui/icons";
import { IconButton, Button, Drawer, List, ListItem } from "@material-ui/core";

// Menu Links
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

// Avatar
import Avatar from "Components/Avatar";

// Logout
import { logoutUser } from "Ducks/session/auth";
import Auth from "Auth";

function MobileSideBar(props) {
  const { navLinks, location, resetSubLink, loggedInUser, history } = props;
  const [show, setShow] = React.useState(false);

  function toSettingPage() {
    history.push("/app/settings");
  }

  const sideList = () => (
    <div role="presentation" onClick={() => setShow(!show)}>
      <List>
        {navLinks.map((link, key) => (
          <ListItem
            key={key}
            className="nav-item"
            button
            selected={location.pathname.includes(link.baseUrl) && true}
            onClick={() => resetSubLink()}
          >
            <Link to={link.url} className="nav-link w-100">
              <span className="menu-title">{link.name}</span>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <IconButton className="hamburger p-5" onClick={() => setShow(!show)}>
        <Menu fontSize="small" />
      </IconButton>

      <Drawer
        anchor="right"
        className="user-drawer"
        // PaperProps={{ style: { backgroundColor: "orange" } }}
        open={show}
        onClose={() => setShow(!show)}
      >
        <div className="d-flex top-drawer">
          <div className="media">
            <div className="media-left mr-25">
              <Avatar name={loggedInUser.name} size={40} />
            </div>
            <div className="media-body my-auto">
              <h4 className="mb-5">
                {loggedInUser.name ? loggedInUser.name : ""}
              </h4>
              <span className="text-muted fs-12 mb-0 d-block">
                {loggedInUser.email ? loggedInUser.email : ""}
              </span>
            </div>
          </div>
        </div>

        <Scrollbars className="rct-scroll" autoHeightMin={350}>
          {sideList("left")}
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
      </Drawer>
    </React.Fragment>
  );
}

const mapStateToProps = ({ sessionState }) => {
  const { authState } = sessionState;
  const { loggedInUser } = authState;
  return { loggedInUser };
};

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(MobileSideBar)
);
