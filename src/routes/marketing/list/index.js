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
  deleteMailingList
} from "Ducks/marketing/mail";

class mail_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedContact: [],
      selectedMailing: []
    };
    this.onSelectContact = this.onSelectContact.bind(this);
    this.onSelectMailing = this.onSelectMailing.bind(this);
    this.handleSaveToList = this.handleSaveToList.bind(this);
    this.handleRemoveFromList = this.handleRemoveFromList.bind(this);
    this.handleChangeListOption = this.handleChangeListOption.bind(this);
    this.newList = this.newList.bind(this);
  }

  componentDidMount() {
    this.props.getContacts();
    this.props.getAllMailingList();
  }

  onSelectContact(indexArray) {
    if (indexArray.length > 0) {
      var contactList = this.props.contacts.list;
      var contactState = Object.assign([], this.state.selectedContact);

      for (let i = 0; i < indexArray.length; i++) {
        var indexOfList = indexArray[i].index;
        if (contactState.indexOf(contactList[indexOfList]) === -1) {
          contactState.push(contactList[indexOfList]);
        } else {
          contactState = contactState.filter(
            contact => contact !== contactList[indexOfList]
          );
        }
      }
      this.setState({ selectedContact: contactState });
    } else {
      this.setState({ selectedContact: [] });
    }
  }

  onSelectMailing(indexArray) {
    if (indexArray.length > 0) {
      var mailingList = this.props.mailingList.list;
      var mailingState = Object.assign([], this.state.selectedMailing);

      for (let i = 0; i < indexArray.length; i++) {
        var indexOfList = indexArray[i].index;
        if (mailingState.indexOf(mailingList[indexOfList]) === -1) {
          mailingState.push(mailingList[indexOfList]);
        } else {
          mailingState = mailingState.filter(
            contact => contact !== mailingList[indexOfList]
          );
        }
      }
      this.setState({ selectedMailing: mailingState });
    } else {
      this.setState({ selectedMailing: [] });
    }
  }

  /**
   * Direction function
   */
  handleSaveToList() {
    // send this.state.selectedContact
    this.props.saveToMailingList(this.state.selectedContact);
    this.setState({ selectedContact: [] });
  }
  handleRemoveFromList() {
    // send this.state.selectedMailing
    this.props.removeFromMailingList(this.state.selectedMailing);
    this.setState({ selectedMailing: [] });
  }

  /**
   * Mailing List Functions
   */
  handleChangeListOption(val) {
    this.props.getMailingList(val);
  }
  newList() {
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
  deleteList(list) {
    this.props.show("alert_delete", {
      name: list.nowShowingName,
      action: () => this.props.deleteMailingList(list.nowShowing)
    });
  }

  render() {
    const { contacts, mailingList, allMailingList } = this.props;
    const { nowShowing, nowShowingName } = allMailingList;
    return (
      <React.Fragment>
        <Helmet title="Mailing List" metaDesc="Huttons CRM Mailing List" />
        <PageTitleBar
          title="Mailing List"
          actionGroup={{
            add: { onClick: this.newList }
          }}
        />
        <div className="row justify-content-center">
          <div className="col-md-5">
            <BgCard heading="Contact List" fullBlock>
              {contacts.loading && <RctSectionLoader />}
              <ContactTable
                tableData={contacts.list}
                onSelectRow={this.onSelectContact}
                columns={contactColumns}
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
                disabled={this.state.selectedContact.length < 1 || !nowShowing}
                onClick={this.handleSaveToList}
              >
                <ArrowForward />
              </Fab>
              <Fab
                color="primary"
                size="small"
                className="text-white my-10"
                aria-label="add"
                disabled={this.state.selectedMailing.length < 1}
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
              {mailingList.loading && <RctSectionLoader />}
              <ContactTable
                tableData={mailingList.list}
                onSelectRow={this.onSelectMailing}
                columns={mailingColumns}
              />
            </BgCard>
          </div>
        </div>
        <MailingListDialog />
        {console.log(this.props)}
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ marketingState }) => {
  const { mailState } = marketingState;
  const { contacts, mailingList, allMailingList } = mailState;
  return { contacts, mailingList, allMailingList };
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
  deleteMailingList
})(mail_list);
