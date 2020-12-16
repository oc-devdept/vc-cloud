import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Form } from "reactstrap";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import InputLabel from "@material-ui/core/InputLabel";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// form components
import BaseInput from "Components/Form/BaseInput";

import { onChangeUpdateUserRights, updateUserRights } from "Actions";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  inputLabel: {
    fontSize: "0.8em"
  },
  select: {
    marginTop: "-0.5em",
    marginBottom: "0.5em"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing(0.25)
  }
});

class UserControlForm extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(groupId, selectedGroupRole) {
    var userSettings = this.props.userSettings;
    var groupFound = false;
    for (const gid in userSettings.groups) {
      if (userSettings.groups[gid].id == groupId) {
        groupFound = true;
        var rIndex = userSettings.groups[gid].roles.findIndex(role => {
          return role.id == selectedGroupRole.id;
        });
        if (rIndex >= 0) {
          userSettings.groups[gid].roles.splice(rIndex, 1);
        } else {
          userSettings.groups[gid].roles.push(selectedGroupRole);
        }
        break;
      }
    }
    if (!groupFound) {
      var accessGroups = this.props.accessGroups;
      var group = accessGroups.find(grp => {
        return grp.id == groupId;
      });
      var grpObject = { id: group.id, name: group.name, roles: [] };
      grpObject.roles.push(selectedGroupRole);
      userSettings.groups.push(grpObject);
    }
    //console.log(userSettings);
    this.props.onChangeUpdateUserRights(userSettings);
  }

  getUserRoles(userToEdit) {
    const userRoles = [];
    if (userToEdit) {
      const userGrps = this.props.userSettings.find(
        setting => setting.userid == userToEdit
      );
      userGrps.groups.forEach(grp => userRoles.push(...grp.roles));
    }
    return userRoles;
  }

  renderMenu(accessGroups) {
    const menu = [];
    accessGroups.forEach(group => {
      menu.push(
        <MenuItem key={group.id} disabled className={this.props.classes.group}>
          {group.name}
        </MenuItem>
      );
      group.roles
        .sort((a, b) => b.tier - a.tier)
        .forEach(grpRole => {
          menu.push(
            <MenuItem
              key={grpRole.id}
              value={grpRole.id}
              className={this.props.classes.item}
            >
              {grpRole.name}
              <span className="text-muted font-italic fs-12 ml-5">
                Tier: {grpRole.tier}
              </span>
            </MenuItem>
          );
        });
    });
    return menu;
  }


  render() {
    const {
      userControl,
      userSettings,
      classes,
      updateUserRights,

      accessGroups,
      userToEdit
    } = this.props;
    console.log(this.getUserRoles(userToEdit));
    return (
      <form>
        <div className="row justify-content-center">
          <div className="col-8">
            <p className="fs-14 mb-5">Roles</p>
            <Select
              fullWidth
              multiple
              // value={this.getUserRoles(userToEdit)}
              value={["5d71c2c01f75bda5df726f84"]}
              input={<BaseInput />}
              onChange={(evt, checked) => {
                this.handleChange(grpId, groupRole);
              }}
            >
              {this.renderMenu(accessGroups)}
            </Select>
          </div>
        </div>
      </form>
    );
  }
}

UserControlForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ usersState }) => {
  const { userControl, userSettings, accessGroups } = usersState;
  return { userControl, userSettings, accessGroups };
};

export default connect(
  mapStateToProps,
  { onChangeUpdateUserRights, updateUserRights }
)(withStyles(styles)(UserControlForm));


