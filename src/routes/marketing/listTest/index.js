import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import ListViewSelector from "Components/PageTitleBar/ListViewSelector";

// Component
import MailingListDialog from "./components/MailingListDialog";
import ContactTable from "./components/ContactTable";
import MailingListTable from "./components/MailingListTable";
import { contactColumns, mailingColumns } from "./components/TableColumns";
import { ArrowBack, ArrowForward, Delete, Edit } from "@material-ui/icons";
import { Fab, IconButton } from "@material-ui/core";

// Actions
import {
  getContacts,
  getMailingList,
  saveToMailingList,
  removeFromMailingList,
  getAllMailingList,
  createMailingList,
  updateMailingList,
  deleteMailingList,

} from "Ducks/marketing/mail";

// import { getCustomerType } from "Ducks/crm/crmField";

class mail_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {
        selected: [],
        selectedRows: [],
        limit: 15,
        skip: 0,
        filters: [[], [], [], [], [], [], [], []],
        afterfilter: [],
        searchText: "",
        columns: [],
        orderBy: [],
      },
      mailing: {
        selected: [],
        selectedRows: [],
        limit: 15,
        skip: 0,
        filters: [],
        searchText: "",
        columns: [],
        orderBy: []
      },
      serverSideFilterList: []
    };

    this.onSelectContact = this.onSelectContact.bind(this);
    this.onSelectMailing = this.onSelectMailing.bind(this);
    this.handleSaveToList = this.handleSaveToList.bind(this);
    this.handleRemoveFromList = this.handleRemoveFromList.bind(this);
    this.handleChangeListOption = this.handleChangeListOption.bind(this);
    this.newList = this.newList.bind(this);
    this.triggerSearch = this.triggerSearch.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchClose = this.onSearchClose.bind(this);
    this.tableStateChange = this.tableStateChange.bind(this);
    this.triggerMailSearch = this.triggerMailSearch.bind(this);
    this.onMailSearchChange = this.onMailSearchChange.bind(this);
    this.onMailSearchClose = this.onMailSearchChange.bind(this);
    this.mailTableStateChange = this.mailTableStateChange.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  triggerSearch(searchText) {
    this.setState({
      contact: {
        ...this.state.contact,
        searchText: searchText,
        skip: 0,
        selectedRows: [],
        selectedContact: []
      }
    });
    clearInterval(this.searchInterval);
    // this.props.getContacts(this.props.allMailingList.nowShowing, this.state.contact.limit, this.state.contact.skip, this.state.contact.afterfilter, this.state.contact.searchText, this.state.contact.orderBy);

  }

  triggerMailSearch(searchText) {
    this.setState({
      mailing: {
        ...this.state.mailing,
        searchText: searchText,
        skip: 0,
        selectedRows: [],
        selectedContact: []
      }
    });
    clearInterval(this.mailSearchInterval);
    this.props.getMailingList({ id: this.props.allMailingList.nowShowing, name: this.props.allMailingList.nowShowingName }, this.state.mailing.limit, this.state.mailing.skip, this.state.mailing.filters, this.state.mailing.searchText, this.state.mailing.orderBy);

  }

  componentDidMount() {

    // this.props.getCustomerType();
    // this.props.getContacts("", this.state.contact.limit, this.state.contact.skip, this.state.contact.afterfilter);
    //this.props.getContacts();
    this.props.getAllMailingList(this.state.mailing.limit, this.state.mailing.skip);

  }

  onSelectContact(indexArray) {
    console.log(indexArray)
    if (indexArray.length > 0) {

      //check if user click select all checkbox

      if (indexArray.length >= this.state.contact.limit) {
        //user has selected everything
        var contacts = [];
        var selected = [];
        for (let i = 0; i < this.props.contacts.totalCount; i++) {
          contacts.push(1);
          selected.push(i);
        }
        this.setState({
          contact: {
            ...this.state.contact,
            selected: contacts, selectedRows: selected
          }
        });
      }
      else {
        //initialize contacts
        let contactSelected = [...this.state.contact.selected];
        if (contactSelected.length == 0) {
          for (let i = 0; i < this.props.contacts.totalCount; i++) {
            contactSelected.push(0);
          }
        }
        //check if select or deselect
        for (let i = 0; i < indexArray.length; i++) {
          if (contactSelected[indexArray[i].index + this.state.contact.skip] == 1) {
            contactSelected[indexArray[i].index + this.state.contact.skip] = 0;
          }
          else {
            contactSelected[indexArray[i].index + this.state.contact.skip] = 1;
          }
        }
        var selected = [];
        for (let i = this.state.contact.skip; i < (this.state.contact.limit + this.state.contact.skip) && i < contactSelected.length; i++) {
          if (contactSelected[i] == 1) {
            selected.push(i - this.state.contact.skip);
          }
        }
        this.setState({
          contact: {
            ...this.state.contact,
            selected: contactSelected, selectedRows: selected
          }
        });
      }


    } else {
      this.setState({
        contact: {
          ...this.state.contact,
          selected: [], selectedRows: []
        }
      });
    }
  }

  onSelectMailing(indexArray) {
    console.log(indexArray)
    if (indexArray.length > 0) {

      //check if user click select all checkbox

      if (indexArray.length >= this.state.mailing.limit) {
        //user has selected everything
        var contacts = [];
        var selected = [];
        for (let i = 0; i < this.props.mailingList.totalCount; i++) {
          contacts.push(1);
          selected.push(i);
        }
        this.setState({
          mailing: {
            ...this.state.mailing,
            selected: contacts, selectedRows: selected
          }
        });
      }
      else {
        //initialize contacts

        let contactSelected = [...this.state.mailing.selected];
        if (contactSelected.length == 0) {
          for (let i = 0; i < this.props.mailing.totalCount; i++) {
            contactSelected.push(0);
          }
        }
        //check if select or deselect
        for (let i = 0; i < indexArray.length; i++) {
          if (contactSelected[indexArray[i].index + this.state.mailing.skip] == 1) {
            contactSelected[indexArray[i].index + this.state.mailing.skip] = 0;
          }
          else {
            contactSelected[indexArray[i].index + this.state.mailing.skip] = 1;
          }
        }
        var selected = [];
        for (let i = this.state.mailing.skip; i < (this.state.mailing.limit + this.state.mailing.skip) && i < contactSelected.length; i++) {
          if (contactSelected[i] == 1) {
            selected.push(i - this.state.mailing.skip);
          }
        }
        this.setState({
          mailing: {
            ...this.state.mailing,
            selected: contactSelected, selectedRows: selected
          }
        });
      }


    } else {
      this.setState({
        mailing: {
          ...this.state.mailing,
          selected: [], selectedRows: []
        }
      });
    }
  }

  /**
   * Direction function
   */
  handleSaveToList() {
    // send this.state.selectedContact

    this.props.saveToMailingList(this.state.contact.selected, this.state.contact.afterfilter, this.state.contact.searchText, this.state.mailing.limit,);
    // this.props.getContacts(this.props.allMailingList.nowShowing, this.state.contact.limit, this.state.contact.skip, this.state.contact.afterfilter, this.state.contact.searchText, this.state.contact.orderBy);
    this.setState({ contact: { ...this.state.contact, selected: [], selectedRows: [] } });
  }
  handleRemoveFromList() {
    // send this.state.selectedMailing
    this.props.removeFromMailingList(this.state.mailing.selected, this.state.mailing.searchText, this.state.mailing.limit);
    // this.props.getContacts(this.props.allMailingList.nowShowing, this.state.contact.limit, this.state.contact.skip, this.state.contact.afterfilter, this.state.contact.searchText, this.state.contact.orderBy);
    this.setState({ mailing: { ...this.state.mailing, selected: [], selectedRows: [] } });
  }

  /**
   * Mailing List Functions
   */
  handleChangeListOption(val) {
    console.log("HANDLE CHANGE");
    console.log(val);
    this.props.getMailingList(val, this.state.mailing.limit, this.state.mailing.skip, this.state.mailing.filter, this.state.mailing.searchText, this.state.mailing.orderBy);

  }

  newList() {
    console.log("new list");
    this.props.show("new_mailing_list", {
      saveList: this.props.createMailingList
    });
  }
  editList(list) {
    this.props.show("new_mailing_list", {
      saveList: this.props.updateMailingList,
      edit: list
    });
  }
  handleDelete(id) {
    this.props.deleteMailingList(id);
  }

  deleteList(id, name) {
    this.props.show("alert_delete", {
      name: name,
      action: () => this.handleDelete(id)
    });
  }


  tableStateChange(limit, skip, filters, afterfilter, columns) {
    var selected = [];
    if (this.state.contact.selected.length > 0) {
      for (let i = skip; i < limit + skip && i < this.state.contact.selected.length; i++) {
        if (this.state.contact.selected[i] == 1) {
          selected.push(i - skip);
        }
      }
    }
    this.setState({
      contact: {
        ...this.state.contact,
        limit: limit,
        skip: skip,
        filters: filters,
        afterfilter: afterfilter,
        columns: columns,
        selectedRows: selected
      }
    });



    if (afterfilter == null || afterfilter.length == 0) {
      // this.props.getContacts(this.props.allMailingList.nowShowing, limit, skip, null, this.state.contact.searchText, this.state.contact.orderBy);

    }
    else {
      // this.props.getContacts(this.props.allMailingList.nowShowing, limit, skip, afterfilter, this.state.contact.searchText, this.state.contact.orderBy);
    }


  }

  handleFilterSubmit(filters, afterfilter) {
    this.tableStateChange(this.state.contact.limit, this.state.contact.skip, filters, afterfilter, this.state.columns);
  }

  mailTableStateChange(limit, skip, filters, afterfilter, columns) {
    var selected = [];
    if (this.state.mailing.selected.length > 0) {
      for (let i = skip; i < limit + skip && i < this.state.mailing.selected.length; i++) {
        if (this.state.mailing.selected[i] == 1) {
          selected.push(i - skip);
        }
      }
    }
    this.setState({
      mailing: {
        ...this.state.mailing,
        limit: limit,
        skip: skip,
        filters: filters,
        columns: columns,
        selectedRows: selected
      }
    });
    if (afterfilter == null || afterfilter.length == 0) {

      this.props.getMailingList({ id: this.props.allMailingList.nowShowing, name: this.props.allMailingList.nowShowingName }, limit, skip, null, this.state.mailing.searchText, this.state.mailing.orderBy);

    }
    else {

      this.props.getMailingList({ id: this.props.allMailingList.nowShowing, name: this.props.allMailingList.nowShowingName }, limit, skip, afterfilter, this.state.mailing.searchText, this.state.mailing.orderBy);
    }


  }

  onSearchChange(searchText) {
    if (searchText == null) {
      this.setState({ contact: { ...this.state.contact, searchText: "" } });
      this.triggerSearch("");
    }
    else if (searchText.length > 1) {
      clearInterval(this.searchInterval);
      this.searchInterval = setInterval(this.triggerSearch, 1000, searchText);
    }
  }

  onSearchClose() {
    this.setState({ contact: { ...this.state.contact, searchText: "" } });
    this.triggerSearch("");
  }

  onMailSearchChange(searchText) {
    if (searchText == null) {
      this.setState({ mailing: { ...this.state.mailing, searchText: "" } });
      this.triggerMailSearch("");
    }
    else if (searchText.length > 1) {
      clearInterval(this.mailSearchInterval);
      this.mailSearchInterval = setInterval(this.triggerMailSearch, 1000, searchText);
    }
  }

  onMailSearchClose() {
    this.setState({ mailing: { ...this.state.mailing, searchText: "" } });
    this.triggerMailSearch("");
  }

  render() {
    const { contacts, mailingList, allMailingList } = this.props;
    const { nowShowing, nowShowingName, loading } = allMailingList;
    // const customerTypes = this.props.customerType.map(val => val.name);
    var ctactCols = [...contactColumns];
    ctactCols[4].options.filterList = this.state.contact.filters[4];
    ctactCols[4].options.filterType = "textField";
    ctactCols[5].options.filterList = this.state.contact.filters[5];
    // ctactCols[5].options.filterOptions = { names: customerTypes };
    ctactCols[5].options.filterType = "checkbox";
    ctactCols[6].options.filterList = this.state.contact.filters[6];
    ctactCols[6].options.filterOptions = { names: ["Not in DNC"] };
    ctactCols[6].options.filterType = "checkbox";
    ctactCols[7].options.filterList = this.state.contact.filters[7];
    ctactCols[7].options.customFilterListOptions = { render: v => `Unsubscribed:${v}` };
    ctactCols[7].options.filterOptions = { names: ["False"] };
    ctactCols[7].options.filterType = "checkbox";
    return (
      <React.Fragment>
        <Helmet title="Mailing List" metaDesc="Huttons CRM Mailing List" />
        <PageTitleBar
          title="Mailing List"
          actionGroup={{
            add: { onClick: this.newList }
          }}
        />
        <div className="row-md-12">
          <BgCard heading="All Mailing List" fullBlock>
            <MailingListTable
              tableData={allMailingList.list}
              title=""
              loading={loading}
              delete={this.deleteList}
              handleChangeListOption={(val) => { this.handleChangeListOption(val) }}
            />
          </BgCard>
        </div>
        {/* <div className="row justify-content-center">
          <div className="col-md-5">
            <BgCard heading="Contact List" fullBlock>
              {contacts.loading && <RctSectionLoader />}
              <ContactTable
                tableData={contacts.list}
                columns={ctactCols}
                onSelectRow={this.onSelectContact}
                isServer={true}
                totalCount={contacts.totalCount}
                tableStateChange={this.tableStateChange}
                onSearchChange={this.onSearchChange}
                onSearchClose={this.onSearchClose}
                searchText={this.state.contact.searchText}
                rowsSelected={this.state.contact.selectedRows}
                handleFilterSubmit={this.handleFilterSubmit}
                filterList={this.state.contact.filters}
              />
            </BgCard>
          </div>
          <div className="col-md-1">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Fab
                color="primary"
                size="small"
                className="text-white my-10"
                aria-label="add"
                disabled={this.state.contact.selectedRows.length < 1 || !nowShowing}
                onClick={this.handleSaveToList}
              >
                <ArrowForward />
              </Fab>
              <Fab
                color="primary"
                size="small"
                className="text-white my-10"
                aria-label="add"
                disabled={this.state.mailing.selectedRows.length < 1}
                onClick={this.handleRemoveFromList}
              >
                <ArrowBack />
              </Fab>
            </div>
          </div>
          <div className="col-md-5">
            <BgCard
              heading={
                nowShowingName && (
                  <React.Fragment>
                    {nowShowingName}
                    <IconButton
                      onClick={() =>
                        this.editList({
                          id: nowShowing,
                          name: nowShowingName
                        })
                      }
                      size="small"
                      variant="outlined"
                      className="ml-10"
                    >
                      <Edit style={{ fontSize: 14 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      variant="outlined"
                      className="text-danger border-danger ml-10"
                      onClick={() =>
                        this.deleteList({ nowShowing, nowShowingName })
                      }
                    >
                      <Delete style={{ fontSize: 14 }} />
                    </IconButton>
                  </React.Fragment>
                )
              }
              actionButtons={
                <ListViewSelector
                  options={allMailingList.list}
                  nowShowing={"Select a list"}
                  onChangeValue={this.handleChangeListOption}
                />
              }
              fullBlock
            >
              {console.log("MAIL LIST INDEX")}
              {console.log(this.props)}
              {mailingList.loading && <RctSectionLoader />}
              <ContactTable
                tableData={mailingList.list}
                onSelectRow={this.onSelectMailing}
                columns={mailingColumns}
                isServer={true}
                totalCount={mailingList.totalCount}
                tableStateChange={this.mailTableStateChange}
                onSearchChange={this.onMailSearchChange}
                onSearchClose={this.onMailSearchClose}
                searchText={this.state.mailing.searchText}
                rowsSelected={this.state.mailing.selectedRows}
              />
            </BgCard>
          </div>
        </div>
        <MailingListDialog /> */}

        <MailingListDialog />
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ marketingState, crmState }) => {
  const { mailState } = marketingState;
  const { contacts, mailingList, allMailingList, campaignMailingList } = mailState;
  const { crmField } = crmState;
  // const { customerType } = crmField;
  return { contacts, mailingList, allMailingList, campaignMailingList };
};

export default connect(mapStateToProps, {
  getContacts,
  getMailingList,
  saveToMailingList,
  removeFromMailingList,
  getAllMailingList,
  show,
  createMailingList,
  updateMailingList,
  deleteMailingList,


})(mail_list);