import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

import Switch from "@material-ui/core/Switch";
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import ListViewSelector from "Components/PageTitleBar/ListViewSelector";
import FormInput from "Components/Form/FormInput";
import Paper from "@material-ui/core/Paper";
// Component

import ContactTable from "./components/ContactTable";
import { contactColumns, mailingColumns } from "./components/TableColumns";
import { ArrowBack, ArrowForward, Delete, Edit } from "@material-ui/icons";
import { Fab, IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import CampaignDrop from "./components/CampaignDrop";
import RelatedCampaigns from "./components/RelatedCampaigns";


// Actions
import {
  getContacts,
  getMailingList,
  getSingleMailing,
  saveToMailingList,
  removeFromMailingList,
  getAllMailingList,
  createMailingList,
  updateMailingList,
  getCampaignMailingList,
  getAllRelatedCampaigns,
} from "Ducks/marketing/mail";
import { getCustomerFormFields } from "Ducks/crm/customer";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
  root: {
    borderRadius: 5,
    border: "1px solid #FF8B19",
    color: "#FFFFFF",
    padding: "8px 35px",
    marginBottom: "20px",
    maxWidth: " 230px",
    maxHeight: "50px",
    minWidth: " 230px",
    minHeight: "50px",
    backgroundColor: "#FF8B19",
  },
})(Button);
const StyledButtonGrey = withStyles({
  root: {
    borderRadius: 5,
    border: "1px solid #FF8B19",
    color: "#FF8B19",
    padding: "8px 35px",
    marginBottom: "20px",
    maxWidth: " 200px",
    maxHeight: "50px",
    minWidth: " 230px",
    minHeight: "50px",
    backgroundColor: "#FFFFFF",
  },
})(Button);

//import { getCustomerType } from "Ducks/crm/crmField";

class mail_list_single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      adminList: false,
      ownedbyme: true,
      contact: {
        selected: [],
        selectedRows: [],
        limit: 15,
        skip: 0,
        filters: [[], [], [], [], [], ["True"]],
        afterfilter: [{ subscribed: "True" }],
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
        orderBy: [],
      },
      serverSideFilterList: [],
      upcoming: false,
      completed: true,
      checked: false,
      listname: "",
    };

    this.onSelectContact = this.onSelectContact.bind(this);
    this.onSelectMailing = this.onSelectMailing.bind(this);
    this.handleSaveToList = this.handleSaveToList.bind(this);
    this.handleRemoveFromList = this.handleRemoveFromList.bind(this);
    this.handleChangeListOption = this.handleChangeListOption.bind(this);

    this.triggerSearch = this.triggerSearch.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchClose = this.onSearchClose.bind(this);
    this.tableStateChange = this.tableStateChange.bind(this);
    this.triggerMailSearch = this.triggerMailSearch.bind(this);
    this.onMailSearchChange = this.onMailSearchChange.bind(this);
    this.onMailSearchClose = this.onMailSearchChange.bind(this);
    this.mailTableStateChange = this.mailTableStateChange.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.shareMailingList = this.shareMailingList.bind(this);
    this.handleCompleteTab = this.handleCompleteTab.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.shareMailingList = this.shareMailingList.bind(this);
    this.setListName = this.setListName.bind(this);
  }
  async handleCompleteTab() {
    if (this.state.completed) {
      this.setState({
        completed: false,
        upcoming: true,
      });
    } else {
      this.setState({
        completed: true,
        upcoming: false,
      });
    }
  }
  async onCheck() {
    if (this.state.checked) {
      this.setState({
        checked: false,
      });
    } else {
      this.setState({
        checked: true,
      });
    }
  }
  triggerSearch(searchText) {
    this.setState({
      contact: {
        ...this.state.contact,
        searchText: searchText,
        skip: 0,
        selectedRows: [],
        selectedContact: [],
      },
    });
    clearInterval(this.searchInterval);
    this.props.getContacts(
      this.props.allMailingList.nowShowing.id,
      this.state.contact.limit,
      this.state.contact.skip,
      this.state.contact.afterfilter,
      this.state.contact.searchText,
      this.state.contact.orderBy
    );
  }

  triggerMailSearch(searchText) {
    this.setState({
      mailing: {
        ...this.state.mailing,
        searchText: searchText,
        skip: 0,
        selectedRows: [],
        selectedContact: [],
      },
    });
    clearInterval(this.mailSearchInterval);
    this.props.getMailingList(
      this.props.allMailingList.nowShowing.id,
      this.state.mailing.limit,
      this.state.mailing.skip,
      this.state.mailing.filters,
      this.state.mailing.searchText,
      this.state.mailing.orderBy
    );
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleMailing(id);

    this.props.getCustomerFormFields();
    this.props.getContacts(id, this.state.contact.limit, this.state.contact.skip, this.state.contact.afterfilter);
    this.props.getMailingList(id, this.state.mailing.limit, this.state.mailing.skip, this.state.mailing.filter, this.state.mailing.searchText, this.state.mailing.orderBy);
    this.props.getAllRelatedCampaigns(this.props.user, id);
    
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.allMailingList.nowShowing != this.props.allMailingList.nowShowing){
      this.setState({
        listname: this.props.allMailingList.nowShowing.name
      })
    }
  }

  onSelectContact(indexArray) {

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
            selected: contacts,
            selectedRows: selected,
          },
        });
      } else {
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
          } else {
            contactSelected[indexArray[i].index + this.state.contact.skip] = 1;
          }
        }
        var selected = [];
        for (let i = this.state.contact.skip; i < this.state.contact.limit + this.state.contact.skip && i < contactSelected.length; i++) {
          if (contactSelected[i] == 1) {
            selected.push(i - this.state.contact.skip);
          }
        }
        this.setState({
          contact: {
            ...this.state.contact,
            selected: contactSelected,
            selectedRows: selected,
          },
        });
      }
    } else {
      this.setState({
        contact: {
          ...this.state.contact,
          selected: [],
          selectedRows: [],
        },
      });
    }
  }

  onSelectMailing(indexArray) {
 
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
            selected: contacts,
            selectedRows: selected,
          },
        });
      } else {
        //initialize contacts

        let contactSelected = [...this.state.mailing.selected];
        if (contactSelected.length == 0) {
          for (let i = 0; i < this.props.mailingList.totalCount; i++) {
            contactSelected.push(0);
          }
        }
        //check if select or deselect
        for (let i = 0; i < indexArray.length; i++) {
          if (contactSelected[indexArray[i].index + this.state.mailing.skip] == 1) {
            contactSelected[indexArray[i].index + this.state.mailing.skip] = 0;
          } else {
            contactSelected[indexArray[i].index + this.state.mailing.skip] = 1;
          }
        }
        var selected = [];
        for (let i = this.state.mailing.skip; i < this.state.mailing.limit + this.state.mailing.skip && i < contactSelected.length; i++) {
          if (contactSelected[i] == 1) {
            selected.push(i - this.state.mailing.skip);
          }
        }
        this.setState({
          mailing: {
            ...this.state.mailing,
            selected: contactSelected,
            selectedRows: selected,
          },
        });
      }
    } else {
      this.setState({
        mailing: {
          ...this.state.mailing,
          selected: [],
          selectedRows: [],
        },
      });
    }
  }

  /**
   * Direction function
   */
  handleSaveToList() {
    // send this.state.selectedContact

    this.props.saveToMailingList(this.state.contact.selected, this.state.contact.afterfilter, this.state.contact.searchText, this.state.mailing.limit, this.state.adminList);
    this.props.getContacts(
      this.props.allMailingList.nowShowing.id,
      this.state.contact.limit,
      this.state.contact.skip,
      this.state.contact.afterfilter,
      this.state.contact.searchText,
      this.state.contact.orderBy
    );
    this.setState({
      contact: { ...this.state.contact, selected: [], selectedRows: [] },
    });
  }
  handleRemoveFromList() {
    // send this.state.selectedMailing
    this.props.removeFromMailingList(this.state.mailing.selected, this.state.mailing.searchText, this.state.mailing.limit);
    this.props.getContacts(
      this.props.allMailingList.nowShowing.id,
      this.state.contact.limit,
      this.state.contact.skip,
      this.state.contact.afterfilter,
      this.state.contact.searchText,
      this.state.contact.orderBy
    );
    this.setState({
      mailing: { ...this.state.mailing, selected: [], selectedRows: [] },
    });
  }

  /**
   * Mailing List Functions
   */
  handleChangeListOption(val) {
    // console.log("HANDLE CHANGE");
    // console.log(val);
    this.props.getMailingList(val, this.state.mailing.limit, this.state.mailing.skip, this.state.mailing.filter, this.state.mailing.searchText, this.state.mailing.orderBy);
  }
  shareMailingList() {
    this.props.updateMailingList({
      id: this.props.allMailingList.nowShowing,
      name: listname,
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
        selectedRows: selected,
      },
    });

    if (afterfilter == null || afterfilter.length == 0) {
      this.props.getContacts(this.props.allMailingList.nowShowing.id, limit, skip, null, this.state.contact.searchText, this.state.contact.orderBy);
    } else {
      this.props.getContacts(this.props.allMailingList.nowShowing.id, limit, skip, afterfilter, this.state.contact.searchText, this.state.contact.orderBy);
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
        selectedRows: selected,
      },
    });
    if (afterfilter == null || afterfilter.length == 0) {
      this.props.getMailingList(
        {
          id: this.props.allMailingList.nowShowing,
          name: this.props.allMailingList.nowShowingName,
        },
        limit,
        skip,
        null,
        this.state.mailing.searchText,
        this.state.mailing.orderBy
      );
    } else {
      this.props.getMailingList(
        {
          id: this.props.allMailingList.nowShowing,
          name: this.props.allMailingList.nowShowingName,
        },
        limit,
        skip,
        afterfilter,
        this.state.mailing.searchText,
        this.state.mailing.orderBy
      );
    }
  }

  onSearchChange(searchText) {
    if (searchText == null) {
      this.setState({ contact: { ...this.state.contact, searchText: "" } });
      this.triggerSearch("");
    } else if (searchText.length > 1) {
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
    } else if (searchText.length > 1) {
      clearInterval(this.mailSearchInterval);
      this.mailSearchInterval = setInterval(this.triggerMailSearch, 1000, searchText);
    }
  }

  onMailSearchClose() {
    this.setState({ mailing: { ...this.state.mailing, searchText: "" } });
    this.triggerMailSearch("");
  }

  onChangeName(field, val) {
    // console.log("on change name");
    // console.log(field + val);
    this.setState({ [field]: val });
    setTimeout(this.setListName, 3000, val);
    //this.setListName = setInterval(this.setListName, 3000, val);
  }
  setListName(listname) {
    // console.log("set list name");
    //clearInterval(this.setListName);
    this.props.updateMailingList({
      id: this.props.allMailingList.nowShowing.id,
      name: listname,
    });
    //this.setState({ listname: listname });
  }
  render() {
    let id = this.props.match.params.id;
    let list = this.props.allMailingList.list;
    let item = list.find((o) => o.id === id);
    const { completed, upcoming, listname } = this.state;
    const { contacts, mailingList, allMailingList, relatedCampaignsList } = this.props;
    const { nowShowing, nowShowingName, loading } = allMailingList;
    const leadSources = this.props.customerForm.fields.leadSource.map(val=>val.name);
    var ctactCols = [...contactColumns];
    ctactCols[4].options.filterList = this.state.contact.filters[4];    
    ctactCols[4].options.filterOptions = { names: leadSources };
    ctactCols[4].options.filterType = "checkbox";
    ctactCols[5].options.filterList = this.state.contact.filters[5];
    ctactCols[5].options.filterType = "checkbox";
    ctactCols[5].options.filterOptions = { names: ["True"]};
    ctactCols[5].options.customFilterListOptions = {
      render: (v) => `Subscribed:${v}`
    }
    return (
      <React.Fragment>
        <Helmet title="Mailing List" metaDesc="Venture Cars Mailing List" />
        <PageTitleBar
          title="Back to All Mailing List"         
        />
        <div align="center">
          {completed && (
            <ButtonGroup aria-label="small outlined button group">
              <div align="center">
                <StyledButton onClick={this.handleCompleteTab}>Mailing List Properties</StyledButton>
              </div>
              <div align="center">
                <StyledButtonGrey onClick={this.handleCompleteTab}>Mailing List Results</StyledButtonGrey>
              </div>
            </ButtonGroup>
          )}
          {upcoming && (
            <ButtonGroup aria-label="small outlined button group">
             <div align="center">
                <StyledButtonGrey onClick={this.handleCompleteTab}>Mailing List Properties</StyledButtonGrey>
              </div>
              <div align="center">
                <StyledButton onClick={this.handleCompleteTab}>Mailing List Results</StyledButton>
              </div>
            </ButtonGroup>
          )}
        </div>
        {/* <div className="text-gray m-20">Mailing List Title</div> */}
        {/* <div className="row "> */}
        <div className="col-md-12 " style={{ height: "100px" }}>
          {/* <FormInput
            // placeholder="Enter name here"
            value={this.state.name}
            target="name"
            handleChange={this.onChangeName}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={this.state.editTitle || this.state.editDes ? false : true}
            // onClick={
            //     () => this.updateCam(campaignId, campaignTitle, campaignDes)
            // }
          >
            Update
          </Button> */}

          <div className="d-inline ml-60 mb-20 col-md-12">
            <h4>Name of Mailing List</h4>
            <div className="d-flex flex-row col-md-12  mt-10 pt-30 row">
              <div className="d-flex flex-row col-md-5  ">
                <FormInput
                  // placeholder="Enter name here"
                  value={listname}
                  target="listname"
                  handleChange={this.onChangeName}
                />
                {/* <Button
                  variant="contained"
                  color="primary"
                  disabled={this.state.editTitle || this.state.editDes ? false : true}
                  // onClick={
                  //     () => this.updateCam(campaignId, campaignTitle, campaignDes)
                  // }
                >
                  Update
                </Button> */}
              </div>

              
            </div>
          </div>
        </div>

        {/* <div className="pl-50 row justify-content-left">
          <div className="row col-md-12"> */}
        {/* {item && item.ownedbyme && <CampaignDrop listId={this.props.allMailingList.nowShowing} />} */}
        {/* <div className="pl-50 row justify-content-left">
          <div className="col-md-8">
            <BgCard heading="Contact List" fullBlock>
              <CampaignDrop listId={this.props.allMailingList.nowShowing} />
            </BgCard>
          </div>
        </div> */}

        {completed && (
          <div className="row justify-content-center pt-50">
            <div className="col-md-5 ">
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
                  <Fab color="primary" size="small" className="text-white my-10" aria-label="add" disabled={this.state.contact.selectedRows.length < 1 || !nowShowing} onClick={this.handleSaveToList}>
                    <ArrowForward />
                  </Fab>
                  <Fab color="primary" size="small" className="text-white my-10" aria-label="add" disabled={this.state.mailing.selectedRows.length < 1} onClick={this.handleRemoveFromList}>
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
                      {/* <IconButton
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
                    </IconButton> */}
                    </React.Fragment>
                  )
                }
                //   actionButtons={
                //     <ListViewSelector
                //       options={allMailingList.list}
                //       nowShowing={"Select a list"}
                //       onChangeValue={this.handleChangeListOption}
                //     />
                //   }
                fullBlock
              >
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
        )}
        {upcoming && (
          <div className="row col-md-12 justify-content-center pt-50 pr-50 pl-70">
            <BgCard heading="Results of Marketing Campaign" fullBlock>
              <RelatedCampaigns tableData={relatedCampaignsList.list} />
            </BgCard>
          </div>
        )}

      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ marketingState, crmState, sessionState }) => {
  const { mailState } = marketingState;
  const { contacts, mailingList, allMailingList, campaignMailingList, relatedCampaignsList } = mailState;
  const { authState } = sessionState;
  const { user, loading, error } = authState;
  const { customerState } = crmState;
  const { customerForm } = customerState;
  return {
    contacts,
    mailingList,
    allMailingList,
    campaignMailingList,
    relatedCampaignsList,
    user,
    loading,
    error,
    customerForm
  };
};

export default connect(mapStateToProps, {
  getContacts,
  getMailingList,
  getSingleMailing,
  saveToMailingList,
  removeFromMailingList,
  getAllMailingList,
  show,
  createMailingList,
  updateMailingList,
  getCampaignMailingList,
  getAllRelatedCampaigns,
  getCustomerFormFields
})(mail_list_single);
