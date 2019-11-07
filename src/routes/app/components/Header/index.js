import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link, withRouter } from "react-router-dom";

import navLinks from "Services/_navLinks";

// Right Nav
import RightNav from "./RightNav";

// Menu
import MainMenu from "./Menu/MainMenu";
import SubMenu from "./Menu/SubMenu";

// Mobile Sidebar
import MobileSideBar from "./MobileSideBar";

function getChildRoute(location) {
  const currentRoute = navLinks.find(link =>
    location.pathname.includes(link.baseUrl)
  );
  return currentRoute ? currentRoute.child_routes : [];
}
function getActiveSubMenuKey(currentLocation, childRoutes) {
  for (let i = 0; i < childRoutes.length; i++) {
    if (currentLocation.includes(childRoutes[i].path)) return i;
  }
}

function Header(props) {
  const { location } = props;
  const childRoutes = getChildRoute(location);
  const activeSubMenuKey = getActiveSubMenuKey(location.pathname, childRoutes);
  const [subMenuKey, setSubMenuKey] = React.useState(activeSubMenuKey);

  React.useEffect(() => {
    setSubMenuKey(activeSubMenuKey);
  }, [activeSubMenuKey]);

  function handleChange(e, newValue) {
    setSubMenuKey(newValue);
  }
  function changeMainLink() {
    setSubMenuKey(0);
  }

  return (
    <React.Fragment>
      <AppBar position="static" className="rct-header">
        <Toolbar
          style={{ minHeight: 54 }}
          className="d-flex justify-content-between w-100"
        >
          <div className="d-flex">
            <div className="site-logo">
              <Link to="/" className="logo-mini">
                <img
                  src={require("Assets/img/appLogo_orig_light.png")}
                  alt="site logo"
                  width="90"
                />
              </Link>
            </div>
          </div>
          <MobileSideBar
            resetSubLink={changeMainLink}
            location={location}
            navLinks={navLinks}
          />
          <MainMenu
            resetSubLink={changeMainLink}
            location={location}
            navLinks={navLinks}
          />
          <RightNav />
        </Toolbar>
      </AppBar>
      {childRoutes.length > 0 && (
        <SubMenu
          subMenuKey={subMenuKey}
          handleChange={handleChange}
          childRoutes={childRoutes}
          active={activeSubMenuKey}
        />
      )}
    </React.Fragment>
  );
}

export default withRouter(Header);
