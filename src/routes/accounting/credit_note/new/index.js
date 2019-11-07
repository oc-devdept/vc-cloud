import React, { Component } from "react";
import { connect } from "react-redux";

// Global Req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// Components
import TabsWrapper from "Components/Tabs/TabsWrapper";
import RctPageLoader from "Components/RctPageLoader";
import AccountingDetails from "Components/Accounting/View/AccountingDetails";
import BgCard from "Components/BgCard";
import PageErrorMessage from "Components/Error/PageErrorMessage";


// InvoicePaymentList
import NewCredit from "../components/NewCredit"
import BalancePayment from "../components/tables/BalancePayment";
import InvoicesOneCompany from "../components/tables/InvoicesOneCompany";

import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

import DialogRoot from "Components/Dialog/DialogRoot";

// Actions
import {
  postSingleCreditNote
} from "Ducks/accounting/credit"

import {
  fetchAllCompanies,
  fetchAllInovicesOneCompany
} from "Ducks/accounting/payment"


class acct_new_payment extends Component {

  constructor(props) {
    super(props)
    // this.SubmitPaymentArray = []

    this.creditNoteItem = null
  }

  state=({

    invoice:{
      customer: '',
      customerName: '',
      amount : 0,
      paymentMethod: '',
      date: new Date(),
      paymentRef: '',
      memo : '',
      reconciled : false,
      userId : localStorage.getItem('user_id'),
    },

    currentInvoiceAmount : 0,
    rowIndex: '',

    InvoiceList : "",
    BalancePayment: [],
   
    SubmitPaymentArray:[],
    redirectAllocation: false,
    currentAllocation: '',

  })

  componentDidMount(){
    this.props.fetchAllCompanies()
  }

  _renderAllInvoicesForOneCompany = (e) => {
    this.props.fetchAllInovicesOneCompany({id: e.id, key: ''})
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
  
    const {fetchInvoice, fetchInvoiceList, fetchBalancePayment} = this.props.paymentList
  
    if(prevProps.paymentList.fetchInvoice != fetchInvoice){
      if(fetchInvoiceList.length > 0){
        return [fetchInvoiceList, fetchBalancePayment]
      } else {
        return [[], fetchBalancePayment]
      }
    }
   
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      this.setState({InvoiceList: snapshot[0], BalancePayment: snapshot[1]})
    }
  }

  onSetState = (a, b,c) =>{

    let invoice = {...this.state.invoice}
    let rowIndex = this.state.rowIndex

    if(a == "customerName"){
      invoice.customer = c.id
    }

    if(a == "creditOption"){
      rowIndex = b
      this.creditNoteItem = null
      this.setState({rowIndex: rowIndex})
      return 
    }

    invoice[a] = b
    this.setState({invoice: invoice})
  }

  onCheckList = (rowIndex, value) => {
    let InvoiceList = [...this.state.InvoiceList]

    // if(!value){
    //   InvoiceList[rowIndex].amount = InvoiceList[rowIndex].openBalance
    // } else {
    //   InvoiceList[rowIndex].amount = 0
    // }

    InvoiceList[rowIndex].reconciled = !value
    this.setState({InvoiceList: InvoiceList})
  }



  balanceHandleChange = (value, index) => {
    let BalancePayment = [...this.state.BalancePayment]
    BalancePayment[index].allocation = value

    if(BalancePayment[index].allocation < BalancePayment[index].amount){
      BalancePayment[index].reconciled = false
    }

    if(BalancePayment[index].allocation >= BalancePayment[index].amount){
      BalancePayment[index].allocation = BalancePayment[index].amount
      BalancePayment[index].reconciled = true
    }

    this.setState({BalancePayment: BalancePayment})
  }

  // key allocation
  handleChange = (e, index) => {

    
    let InvoiceList = [...this.state.InvoiceList]
    let currentInvoiceAmount = 0

    InvoiceList[index].amount = e

    if(e >= InvoiceList[index].originalAmount) {
      InvoiceList[index].amount = InvoiceList[index].originalAmount
    }


    this.setState({InvoiceList: InvoiceList, currentInvoiceAmount: currentInvoiceAmount})
  }

  _redirectAllocationRestart = () =>{
    this.setState({redirectAllocation: false})
  }

  _handleSelectedIndex = (index) => {
  
    switch(this.state.rowIndex){
      case 2:
        if(index != null){
          this.creditNoteItem = this.state.InvoiceList[index]
        } else {
          this.creditNoteItem = null
        }
        break
      case 3:
        if(index != null){
          this.creditNoteItem = this.state.BalancePayment[index]

        } else {
          this.creditNoteItem = null
        }
        break
      default:break
    }


  }

  _submitPayment = (e) => {
   
    // if(this.state.rowIndex == 1) {

    //   let creditNote = {
    //     creditNote: this.state.invoice,
    //     creditNoteItem : null
    //   }

    //   this.props.postSingleCreditNote(creditNote)

    // } else {

    //     if(this.creditNoteItem == null) {
    //       const r = window.confirm("You have not initated any credit note. Please check again."); if(r == true){}
    //       return
    //     }

    //     const calculatePaymentAmount = this.state.invoice.amount - this.creditNoteItem.amount

    //     // Single payment for multiple invoices
    //     let creditNote = {
    //       creditNote: this.state.invoice,
    //       creditNoteItem : this.creditNoteItem
    //     }
        
    //     if(calculatePaymentAmount == 0){
    //       console.log('Credit Payment Go!')
    //       this.props.postSingleCreditNote(creditNote)
    //     } else {
    //       const r = window.confirm(`Your payment amount does not match your credit note. Please check again.`); if(r == true){}
    //     }
    
    // }

    const r = window.confirm(`Click OK to confirm the credit note payment for ${this.state.invoice.customerName}`); if(r == true){

      let creditNote = {
        creditNote: this.state.invoice,
        creditNoteItem : null
      }
  
      this.props.postSingleCreditNote(creditNote)
  
    }


  }


  render() {



    const {loading, companyList, fetchInvoice} = this.props.paymentList

    const {
      // action,
      // loading,
      // tableData,
    } = this.props.creditNoteState.creditNoteList


    return loading ? (
      <RctPageLoader />
    ) : companyList ? (
  
      // companyList
        <React.Fragment>
            <Helmet>
              <title>Everyday | Payment</title>
              <meta name="description" content="Everyday Payment Management" />
            </Helmet>
            

            <FormWrapper
              onSave={this._submitPayment}
              disabled={true}
              title={`Create New Credit Note`}
            >
   
              <form autoComplete="off">

                <FormInputLayout
                  title="Key Information"
                  desc="Credit Note information"
                >
                    <NewCredit
                      companyList={companyList}
                      onSetState={this.onSetState}
                      rowIndex={this.state.rowIndex}
                      invoiceList={this.state.InvoiceList? true : false}
                      balanceLength={this.state.BalancePayment.length}
                      invoiceLength={this.state.InvoiceList.length}
                      state={this.state.invoice}
                      _renderAllInvoicesForOneCompany={this._renderAllInvoicesForOneCompany}
                    />

                </FormInputLayout>
                
              </form>

            </FormWrapper>
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
  const { paymentState, creditNoteState } = accountingState;
  const { paymentToView, paymentList } = paymentState;
  return { paymentToView, paymentList, creditNoteState };
};


export default connect(
  mapStateToProps,
  { 
    fetchAllCompanies,
    fetchAllInovicesOneCompany,
    postSingleCreditNote
  }
)(acct_new_payment);

