import React, { Component } from "react";
import { connect } from "react-redux";
import { hide } from "redux-modal";

import Button from "@material-ui/core/Button";

// Multiple Select
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

// Form Inputs
import FormInput from "Components/Form/FormInput";
import BaseInput from "Components/Form/BaseInput";

import { addUser, updateUser } from "Ducks/setting/userManagement";
import { roleListHelper } from "Helpers/accessControlHelper";

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
      mobile: "",
      password: "",
      confirmPassword: "",
      baseContact: {},
      roles: [],
      selectedRoles: [],
      canSave: false,
      rolesList: []
    };
    this.handleChange = this.handleChange.bind(this);    
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
  }

  componentDidMount() {
    this.props.toEdit && this.setState({ ...this.props.toEdit });
    
    if (this.props.allRoles != null) {      
      let rl = roleListHelper(this.props.allRoles);
      this.setState({ rolesList: rl });
    }
    if (this.props.toEdit) {
      this.setState({ canSave: true });
    }
  }


  handleChange(field, value) {

    this.setState({ [field]: value });
    if (this.state.email != "" && this.state.mobile != "" && this.state.selectedRoles.length > 0) {
      this.setState({ canSave: true });
    }
  }

  handleContactChange(field, value){
    this.setState({
      baseContact: { ...this.state.baseContact, [field]: value}
    });
  }

  handleRoleChange(field, value) {
    this.setState({ selectedRoles: value })
    if (this.state.email != "" && this.state.mobile != "" && value.length > 0) {
      this.setState({ canSave: true });
    }
  }

/*
  handleChangeContact(field, value) {
    this.setState({
      baseContact: { ...this.state.baseContact, [field]: value }
    });
    if (this.state.email != "" && this.state.mobile != "" && this.state.selectedRoles.length > 0) {
      this.setState({ canSave: true });
    }
  }
*/
  handleSubmitForm() {
    let name = this.state.baseContact.firstName;
    if(this.state.baseContact.lastName != undefined){
      name += " "+this.state.baseContact.lastName;
    }
    const newUser = {
      ...this.state,
      name: name
    };

    if(this.props.toEdit){
      console.log("edit");
      console.log(this.props.listOptions);
      this.props.updateUser(newUser, this.props.listOptions);
    }
    else {
      this.props.addUser(newUser, this.props.listOptions);
    }
    
    this.props.hide("add_user_form");
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  renderMenu(accessRoles) {
    const menu = [];
  

    if (accessRoles) {

      accessRoles.forEach(role => {

        menu.push(
          <MenuItem key={role.value} value={role.value}>
            {role.name}
            <span className="text-muted font-italic fs-12 ml-5">
              Tier: {role.tier}
            </span>
          </MenuItem>
        );
      });

    }
    return menu;
  }

  render() {
    const { classes } = this.props;
    const {
      email,
      mobile,
      baseContact,
      password,
      confirmPassword,
      roles
    } = this.state;
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
              handleChange={this.handleContactChange}
            />
          </div>
          <div className="col-5 offset-md-1">
            <FormInput
              label="Last Name"
              value={baseContact.lastName}             
              target="lastName"
              handleChange={this.handleContactChange}
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
        { !this.props.toEdit && (
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
        </div>) }

        <h3 style={{ marginLeft: 35 }}>User Role</h3>
        <div className="row justify-content-center">
          <div className="col-11">
            <Select
              multiple
              input={<BaseInput />}
              value={this.state.selectedRoles}
              onChange={e => this.handleRoleChange("selectedRoles", e.target.value)}
              renderValue={selected => (
                <div className="d-flex">
                  {selected.map(value => {
                    let name = "";
                    for (let i = 0; i < this.state.rolesList.length; i++) {
                      if (value == this.state.rolesList[i].value) {
                        name = this.state.rolesList[i].name;
                        break;
                      }
                    }
                    return (<Chip key={value} label={name} className={classes.menuChips} />)
                  })
                  }
                </div>
              )}
            >
              {this.renderMenu(this.state.rolesList)}
            </Select>
          </div>
        </div>
        <div className="d-flex mt-40 justify-content-end">
          <Button
            variant="contained"
            className="btn-success text-white"
            onClick={this.handleSubmitForm}
            disabled={!this.state.canSave}
          >
            {this.props.toEdit ? "Save" : "Create"}
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ rolesState }) => {
  const { allRoles } = rolesState;
  return { allRoles };
};

export default connect(mapStateToProps, { addUser, updateUser, hide })(
  withStyles(styles)(AddUserForm)
);
