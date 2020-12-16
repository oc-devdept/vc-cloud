import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

// Components
import UsersList from "./components/UsersList";
import RctSectionLoader from "Components/RctSectionLoader";

// Dialogs
import AddUserDialog from "./components/dialogs/AddUserDialog";

// Actions
import { getAllUsers, deleteUser } from "Ducks/setting/userManagement";

function getFilters(filterList, columns) {
  let filter = [];
  for (let i = 0; i < filterList.length; i++) {
    let list = filterList[i];
    if (list.length > 0) {
      let property = columns[i].name;
      for (let a = 0; a < list.length; a++) {
        let value = list[a];
        filter.push({ [property]: value });
      }
    }
  }
  return filter;
}

class UsersLayout extends Component {
  constructor(props) {
    super(props);
    this.newUser = this.newUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      limit: 15,
      skip: 0,      
      searchText: "",
      filters: [],
      orderBy: [],     
      columns: [],
      serverSideFilterList: [[], []],//match number of columns
      sorted: {
        name: "",
        direction: ""
      }
      
    }
    this.triggerSearch = this.triggerSearch.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchClose = this.onSearchClose.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.updateTableState = this.updateTableState.bind(this);
  }

  onSearchChange(searchText){
    if (searchText == null) {
      this.setState({ searchText: "" });
      this.triggerSearch("");
    }
    else if (searchText.length > 1) {
      clearInterval(this.searchInterval);
      this.searchInterval = setInterval(this.triggerSearch, 1000, searchText);
    }
  }

  onSearchClose() {
    this.setState({ searchText: "" });
    this.triggerSearch("");
  }

  triggerSearch(searchText) {
    this.setState({ searchText: searchText, skip: 0 });
    clearInterval(this.searchInterval);
    this.props.getAllUsers(this.state.limit, this.state.skip, this.state.filters, this.state.searchText, this.state.orderBy);
  }

  updateTableState(state){
    this.setState({
      ...state
    });
    this.props.getAllUsers(this.state.limit, this.state.skip, this.state.filters, this.state.searchText, this.state.orderBy);
  }

  onFilterChange(column, filterList, type) {
    if (type == "chip") {
      var filter = getFilters(filterList, this.state.columns);
      this.props.getAllUsers(this.state.limit, this.state.skip, filter, this.state.searchText, this.state.orderBy);
      this.setState({
        filters: filter,
        serverSideFilterList: filterList
      });
    }
  }

  componentDidMount() {
    this.props.getAllUsers(this.state.limit, this.state.skip);
  }

  newUser() {
    this.props.show("add_user_form", { listOptions: {limit: this.state.limit, skip: this.state.skip, filters: this.state.filters, 
      searchText: this.state.searchText, orderBy: this.state.orderBy}});
  }

  editUser(id) {
    const toEdit = this.props.userList.tableData.find(user => user.id == id);
    const settings = this.props.userSettings.find(user => user.userid == id);
    const selected = settings.roles.map(val => val.id);
    //console.log(selected);
    const editUser = { ...toEdit, roles: settings.roles, selectedRoles: selected };
    this.props.show("add_user_form", { toEdit: editUser, 
      listOptions: {limit: this.state.limit, skip: this.state.skip, filters: this.state.filters, 
        searchText: this.state.searchText, orderBy: this.state.orderBy} });
  }

  deleteUser(id, userName) {
    this.props.show("alert_delete", { 
      name: userName,
      action: () => this.handleDelete(id) 
    });
  }

  handleDelete(id){
    this.props.deleteUser(id, {limit: this.state.limit, skip: this.state.skip, filters: this.state.filters, 
      searchText: this.state.searchText, orderBy: this.state.orderBy});
  }

  render() {
    const { userList, usersLoading } = this.props;
    return (
      <React.Fragment>
        {usersLoading && <RctSectionLoader />}
        <UsersList
          newUser={this.newUser}
          editUser={this.editUser}
          deleteUser={this.deleteUser}
          tableData={userList.tableData}
          onSearchChange={this.onSearchChange}
          onSearchClose={this.onSearchChange}
          searchText={this.state.searchText}
          updateTableState={this.updateTableState}
          onFilterChange={this.onFilterChange}
          totalCount={userList.totalCount}
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

export default connect(mapStateToProps, {  getAllUsers, deleteUser, show  })(UsersLayout);
