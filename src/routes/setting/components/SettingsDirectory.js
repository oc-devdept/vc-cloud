import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Side Drawer
import SideDrawer from "Components/SideDrawer";
import DrawerListCollapsible from "Components/SideDrawer/DrawerListCollapsible";
import DrawerListItem from "Components/SideDrawer/DrawerListItem";

// Setting Links
import settingsList from "./_settingsList";

class SettingsDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: true,
      user: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
  }

  handleClick = item => {
    this.setState({ [item]: !this.state[item] });
  };

  handleClickItem(path) {
    this.props.history.push(path);
  }

  render() {
    const { match, location } = this.props;
    return (
      <SideDrawer>
        {settingsList &&
          settingsList.map((list, key) => (
            <DrawerListCollapsible
              key={key}
              title={list.title}
              state={this.state[list.stateName]}
              openNested={() => this.handleClick(list.stateName)}
            >
              {list.links.map((link, index) => (
                <DrawerListItem
                  key={index}
                  onClickListItem={() =>
                    this.handleClickItem(match.url + link.path)
                  }
                  title={link.title}
                  secondary
                  selected={location.pathname === match.url + link.path}
                />
              ))}
            </DrawerListCollapsible>
          ))}
      </SideDrawer>
    );
  }
}

export default withRouter(SettingsDirectory);
