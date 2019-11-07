import React, { Component } from "react";
import { connect } from "react-redux";

// Global Req
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import MoreButton from "Components/PageTitleBar/MoreButton";
import { Route, Redirect } from "react-router";

import RctPageLoader from "Components/RctPageLoader";
import PageErrorMessage from "Components/Error/PageErrorMessage";

import QuotationCard from "../components/QuotationCard";
import ProfileTabs from "Components/Layout/ProfileTabs";
import OverviewTab from "./tabs/Overview";

import {
  quoteNewPage,
  quoteEditPage,
  singleQuote
} from "Helpers/accountingURL";

// import NotesLayout from "Components/Everyday/Notes/NotesLayout";

// Activity Log Tab
// import ActivityLog from "Components/ActivityLog";

// Notes Tab
// import NewNote from "Components/Form/Note/NewNote";
// import DisplayAllNotes from "Components/Everyday/Notes/DisplayAllNotes";

// Actions
import {
  getSingleQuotation,
  clearSingleQuotation,
  deleteSingleQuote,
  addNoteQuotation,
  HandleStateUpdate,
  HandleStateCreateNewVersion,
  HandleStateRevertPreviousVersion,
  HandleConvertInvoiceQuotation
} from "Ducks/accounting/quotation";


// addNoteToQuotation(acctID), onNoteChange, clearNote
// Add events dialog
// Delete Quotation, Edit Quotation, Transfer Quotation

class acct_view_quotation extends Component {
  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getSingleQuotation(id);
  }

  componentWillUnmount() {
    this.props.clearSingleQuotation();
  }

  /**
   * New
   */
  newQuotation() {
    this.props.history.push(quoteNewPage);
  }

  edit(quotation) {
    this.props.history.push(quoteEditPage(quotation.id));
  }

  addNote = quotation => {
    this.props.addNoteQuotation(this.props.match.params.id, quotation);
  };

  componentDidUpdate() {
    if (this.props.quotationToView.quotation) {
      var id = this.props.match.params.id;
      var newId = this.props.quotationToView.quotation.id;
      if (id != newId) {
        this.props.history.push(singleQuote(newId));
      }
    }
  }

  render() {
    const { loading, quotation } = this.props.quotationToView;

    let buttonCollection = null;

    if (quotation) {
      switch (quotation.state) {
        case "Draft":
          // console.log('Draft Mode')
          buttonCollection = (
            <PageTitleBar
              title="View Quotation"
              actionGroup={{
                add: { onClick: () => this.newQuotation() },
                mid: { label: "Edit", onClick: () => this.edit(quotation) },
                more: [
                  {
                    label: "Open Quotation",
                    onClick: () =>
                      this.props.HandleStateUpdate(quotation.id, "Open")
                  },
                  {
                    label: "Convert to Invoice",
                    onClick: () =>
                      this.props.HandleConvertInvoiceQuotation(quotation.id)
                  },
                  {
                    label: "Delete Quotation",
                    onClick: () =>
                      this.props.deleteSingleQuote(this.props.match.params.id)
                  }
                ]
              }}
            />
          );

          break;

        case "Open":
          buttonCollection = (
            <PageTitleBar
              title="View Quotation"
              actionGroup={{
                add: { onClick: () => this.newQuotation() },
                mid: { label: "Edit", onClick: () => this.edit(quotation) },
                more: [
                  {
                    label: "Create New Version",
                    onClick: () => {
                      this.props.HandleStateCreateNewVersion(
                        quotation.id,
                        "Quotation"
                      );
                    }
                  },
                  {
                    label: "Convert to Invoice",
                    onClick: () =>
                      this.props.HandleConvertInvoiceQuotation(quotation.id)
                  },
                  {
                    label: "Delete Quotation",
                    onClick: () => {
                      if (quotation.version == 1) {
                        this.props.deleteSingleQuote(
                          this.props.match.params.id
                        );
                      } else {
                        this.props.HandleStateRevertPreviousVersion(
                          quotation.id,
                          "Quotation"
                        );
                      }
                    }
                  }
                ]
              }}
            />
          );

          break;

        case "Closed":
          buttonCollection = (
            <PageTitleBar
              title="View Quotation"
              actionGroup={{
                add: { onClick: () => this.newQuotation() }
              }}
            />
          );
          break;

        case "Converted":
          // console.log("Converted Mode");
          buttonCollection = (
            <PageTitleBar
              title="View Quotation"
              actionGroup={{
                add: { onClick: () => this.newQuotation() }
              }}
            />
          );
          break;

        default:
          break;
      }
    }

    if (this.props.quotationList.deleted) {
      return <Redirect to="/app/acct/quotations" />;
    }

    return loading ? (
      <RctPageLoader />
    ) : quotation ? (
      <React.Fragment>
        <Helmet>
          <title>Everyday | View Quotation</title>
        </Helmet>

        {buttonCollection}

        <div className="row">
          <div className="col-md-3">
            <QuotationCard quotation={quotation} />
          </div>

          <div className="col-md-9">
            <ProfileTabs loading={false}>
              <div label="Overview">
                <OverviewTab quotation={quotation} />
              </div>

              <div label="Deals">
                {/* <DealsTab deals={customer.deals} /> */}
              </div>

              <div label="Events">
                {/* <EventsTab
                      eventableType="Customer"
                      eventableId={customer.id}
                      events={customer.events}
                    /> */}
              </div>

              <div label="Details">{/* <DetailsTab cust={customer} /> */}</div>
            </ProfileTabs>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <PageErrorMessage
        heading="Not Found"
        message="This could be because of a network problem or the record might have been deleted"
      />
    );
  }
}

const mapStateToProps = ({ accountingState }) => {
  const { quotationState } = accountingState;
  const { quotationToView, quotationList } = quotationState;
  return { quotationToView, quotationList };
};


export default connect(
  mapStateToProps,
  {
    getSingleQuotation,
    clearSingleQuotation,
    deleteSingleQuote,
    addNoteQuotation,
    HandleStateUpdate,
    HandleStateCreateNewVersion,
    HandleStateRevertPreviousVersion,
    HandleConvertInvoiceQuotation
  }
)(acct_view_quotation);
