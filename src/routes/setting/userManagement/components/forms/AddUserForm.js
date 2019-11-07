import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

// Multiple Select
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

// Form Inputs
import FormInput from "Components/Form/FormInput";
import BaseInput from "Components/Form/BaseInput";

import { addUser, onChangeAddUser } from "Ducks/setting/userManagement";

const styles = theme => ({
  item: {
    paddingLeft: theme.spacing(3)
  },
  group: {
    fontWeight: theme.typography.fontWeightMedium,
    opacity: 1
  },
  menuChips: {
    marginRight: theme.spacing(1),
    color: "#fff",
    backgroundColor: theme.palette.secondary.main
  }
});

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      baseContact: {
        firstName: "",
        lastName: "",
        mobile: ""
      },
      password: "",
      confirmPassword: "",
      roles: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeContact = this.handleChangeContact.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }
  handleChangeContact(field, value) {
    this.setState({
      baseContact: { ...this.state.baseContact, [field]: value }
    });
  }

  handleSubmitForm() {
    const newUser = {
      ...this.state,
      name: `${this.state.baseContact.firstName} ${this.state.baseContact.lastName}`
    };
    this.props.addUser(newUser);
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

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
    const { classes, accessGroups } = this.props;
    const { email, baseContact, password, confirmPassword, roles } = this.state;
    return (
      <form autoComplete="off">
        <h3 style={{ marginLeft: 35 }}>User Contact Details</h3>
        <div className="row mb-20 justify-content-center">
          <div className="col-5">
            <FormInput
              label="First Name"
              value={baseContact.firstName}
              required={!baseContact.firstName}
              target="firstName"
              handleChange={this.handleChangeContact}
            />
            <FormInput
              label="Mobile"
              value={baseContact.mobile}
              target="mobile"
              handleChange={this.handleChangeContact}
            />
          </div>
          <div className="col-5 offset-md-1">
            <FormInput
              label="Last Name"
              value={baseContact.lastName}
              required={!baseContact.lastName}
              target="lastName"
              handleChange={this.handleChangeContact}
            />
          </div>
        </div>
        <h3 style={{ marginLeft: 35 }}>Login Details</h3>
        <div className="row justify-content-center">
          <div className="col-11">
            <FormInput
              label="Email"
              value={email}
              required={!email}
              target="email"
              handleChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row mb-20 justify-content-center">
          <div className="col-5">
            <FormInput
              label="Password"
              value={password}
              required={!password}
              target="password"
              handleChange={this.handleChange}
            />
          </div>
          <div className="col-5 offset-md-1">
            <FormInput
              label="Confirm Password"
              value={confirmPassword}
              required={password !== confirmPassword}
              helperText="Password has to match."
              target="confirmPassword"
              handleChange={this.handleChange}
            />
          </div>
        </div>

        <h3 style={{ marginLeft: 35 }}>User Role</h3>
        <div className="row justify-content-center">
          <div className="col-11">
            <Select
              multiple
              input={<BaseInput />}
              value={roles}
              onChange={e => this.handleChange("roles", e.target.value)}
              renderValue={selected => (
                <div className="d-flex">
                  {selected.map(value => {
                    for (const grp of accessGroups) {
                      var role = grp.roles.find(role => role.id == value);
                      if (role !== undefined) {
                        break;
                      }
                    }

                    return (
                      <Chip
                        key={value}
                        label={role.name}
                        className={classes.menuChips}
                      />
                    );
                  })}
                </div>
              )}
            >
              {this.renderMenu(accessGroups)}
            </Select>
          </div>
        </div>
        <div className="d-flex mt-40 justify-content-end">
          <Button
            variant="contained"
            className="btn-success text-white"
            onClick={this.handleSubmitForm}
            disabled={
              !baseContact.firstName ||
              !baseContact.lastName ||
              !this.validateEmail(email) ||
              !password ||
              password !== confirmPassword ||
              roles.length == 0
            }
          >
            Create
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ usersState }) => {
  const { userAdd, accessGroups } = usersState;
  return { userAdd, accessGroups };
};

export default connect(
  mapStateToProps,
  { addUser, onChangeAddUser }
)(withStyles(styles)(AddUserForm));
