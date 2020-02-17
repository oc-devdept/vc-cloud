import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

// Components
import UsersList from "./components/UsersList";
import RctSectionLoader from "Components/RctSectionLoader";

// Dialogs
import AddUserDialog from "./components/dialogs/AddUserDialog";

// Actions
import { getAllUsers } from "Ducks/setting/userManagement";

class UsersLayout extends Component {
  constructor(props) {
    super(props);
    this.newUser = this.newUser.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  newUser() {
    this.props.show("add_user_form");
  }

  editUser(id) {
    const toEdit = this.props.userList.find(user => user.id == id);
    this.props.show("add_user_form", { toEdit });
  }

  render() {
    const { userList, usersLoading } = this.props;
    return (
      <React.Fragment>
        {usersLoading && <RctSectionLoader />}
        <UsersList
          newUser={this.newUser}
          editUser={this.editUser}
          tableData={userList}
        />
        <AddUserDialog />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ usersState }) => {
  const { userList, usersLoading } = usersState;
  return { userList, usersLoading };
};

export default connect(mapStateToProps, { getAllUsers, show })(UsersLayout);
