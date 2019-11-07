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

// Credit Note Tab
import ViewTemplate from "Components/Accounting/View/Templates/ViewTemplate";



// InvoicePaymentList
import NewPayment from "../components/NewPayment"

import InvoicesOneCompany from "../components/tables/InvoicesOneCompany";
import BalancePayment from "../components/tables/BalancePayment";


import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

import DialogRoot from "Components/Dialog/DialogRoot";
import Button from "@material-ui/core/Button";


// Actions
import { 
  fetchAllCompanies, 
  fetchAllInovicesOneCompany,
  makePayment
} from "Ducks/accounting/payment";



class acct_new_payment extends Component {

  constructor(props) {
    super(props)
    // this.SubmitPaymentArray = []
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
      paymentDifference: '',
      userId : localStorage.getItem('user_id'),
    },

    currentInvoiceAmount : 0,

    InvoiceList : [],
    BalancePayment: [],
   
    SubmitPaymentArray:[],
    redirectAllocation: false,
    currentAllocation: '',

    message : false,
    messageTitle: "",
    messageContent: "",

    payment: {}, 
    balance: {},

  })

  componentDidMount(){
    this.props.fetchAllCompanies()
  }

  _renderAllInvoicesForOneCompany = (e) => {
    this.props.fetchAllInovicesOneCompany({id: e.id, key: 'all'})
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
    if(a == "customerName"){
      invoice.customer = c.id
    }
    invoice[a] = b
    this.setState({invoice: invoice})
  }

  onCheckList = (rowIndex, value) => {
    let InvoiceList = [...this.state.InvoiceList]

    if(!value){
      InvoiceList[rowIndex].amount = InvoiceList[rowIndex].openBalance
    } else {
      InvoiceList[rowIndex].amount = 0
    }

    InvoiceList[rowIndex].reconciled = !value
    this.setState({InvoiceList: InvoiceList})
  }

  onBalancePaymentCheck = (rowIndex, value) => {
    let BalancePayment = [...this.state.BalancePayment]

    if(!value){
      BalancePayment[rowIndex].reconciled = true 
      if(BalancePayment[rowIndex].allocation == 0){
        BalancePayment[rowIndex].allocation = BalancePayment[rowIndex].amount
      }
    } else{
      BalancePayment[rowIndex].reconciled = false 
      // BalancePayment[rowIndex].allocation = 0
    }
  
    this.setState({BalancePayment: BalancePayment})
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

    if(e >= InvoiceList[index].openBalance) {
      InvoiceList[index].reconciled = true
      InvoiceList[index].amount = InvoiceList[index].openBalance
    } else {
      InvoiceList[index].amount = e
      InvoiceList[index].reconciled = false
    }

    this.setState({InvoiceList: InvoiceList, currentInvoiceAmount: currentInvoiceAmount})
  }

  _redirectAllocationRestart = () =>{
    this.setState({redirectAllocation: false})
  }

  _submitPayment = (e) => {

    let SubmitPaymentArray = []
    const array = [...this.state.InvoiceList]
    let currentAmount = 0

    array.map((item, index) => {
      if(item.amount > 0){
        currentAmount = parseFloat(currentAmount) + parseFloat(item.amount) 
        SubmitPaymentArray.push(item)
      }
    })

    // Single payment for multiple invoices
    let payment = {
      payment: this.state.invoice,
      invoices : SubmitPaymentArray
    }
 
    const calculatePaymentAmount = this.state.invoice.amount - currentAmount

    let BalancePayment = [...this.state.BalancePayment]
    let paymentBalance = []
    
    if(BalancePayment.length > 0) {
      BalancePayment.map(item =>{
        if(item.reconciled){
          if(item.allocation > 0){
            paymentBalance.push(item)
          } else{
            window.confirm('No allocation detected, input your amount')
          }
        }
      })
    }
    

    if(SubmitPaymentArray.length > 0){
  
      if(calculatePaymentAmount > 0){

        if(!this.state.invoice.paymentDifference) {
        
          let messageContent = `Your current payment amount will lead to excess balance. Click OK to confirm excess amount to be saved into balance which will be surfaced during next payment or Cancel to return.`          
          // this.props.makePayment({payment: payment, balance: paymentBalance})
          this.setState({message : true, messageTitle: 'Confirm Payment', messageContent: messageContent, payment: payment, balance: paymentBalance})
        } else {

          let messageContent = `You have set the reconciled to "Fully Reconciled". Click OK to confirm the remaining amount will not be reflected in the balance in your next payment or Cancel to return.`
          // payment.balancePayment = calculatePaymentAmount
          // this.props.makePayment({payment: payment, balance: paymentBalance})
          this.setState({message : true, messageTitle: 'Confirm Payment', messageContent: messageContent, payment: payment, balance: paymentBalance})
        }

      } else if (calculatePaymentAmount == 0){

        // this.props.makePayment({payment: payment, balance: paymentBalance});
        let messageContent = `Are you sure? Click Ok to proceed with payment`
        this.setState({message : true, messageTitle: 'Confirm Payment', messageContent: messageContent, payment: payment, balance: paymentBalance})


      } else {

        let messageContent = `Your payment amount does not match your invoice(s) payment, you have a record balance of $${calculatePaymentAmount}. Please check your payment again.`
        this.setState({message : true, messageTitle: 'Payment Error', messageContent: messageContent, payment: {}, balance: {}})

      }


    } else {
      // window.confirm('No items to make payment, please check your invoices again')

      if(paymentBalance.length > 0){

        let messageContent = "You have opted to pay using existing balance(s) from previous payment, click OK to confirm or Cancel to return."
        // this.props.makePayment({payment: {}, balance: paymentBalance})
        this.setState({message : true, messageTitle: 'Confirm Payment', messageContent: messageContent, payment: {}, balance: paymentBalance})

      } else {

        let messageContent = 'No payment detected, please key in the amount and payment details to proceed'
        this.setState({message : true, messageTitle: 'Payment Error', messageContent: messageContent, payment: {}, balance: {}})
        // this.props.makePayment({payment: {}, balance: paymentBalance})

      }

    }

  }

  _toggleMessageRestart = () =>{
    this.setState({message : false, messageTitle: "", messageContent: ""})
  }

  _handleSubmitPayment = () => {

    if(this.state.messageTitle != 'Payment Error'){
      const payment = this.state.payment
      const balance = this.state.balance
      this.props.makePayment({payment: payment, balance: balance})
    }

    this.setState({
      message: false,
      messageTitle: "", 
      messageContent: "",
      payment: {},
      balance: {}
    })
    
  }

  render() {



    const {loading, companyList, fetchInvoice} = this.props.paymentList

    let container = null
    let balancePayment = null

    if(fetchInvoice){
      container = (
        <RctPageLoader/>         
      )
    } else {
      
      if(this.state.InvoiceList.length > 0){ 
        container = (
          <InvoicesOneCompany
            title={'All Invoices'}
            tableData={this.state.InvoiceList}
            onCheckList={this.onCheckList}
            handleChange={this.handleChange}
          />
        )
      } else {
        container = (
          <FormInputLayout 
            title="Select a Company"
            desc="No outstanding invoices found"
          >
          </FormInputLayout>
        )
      }

      if(this.state.BalancePayment.length > 0){
        balancePayment = (
          <BalancePayment
            title={'Credit & Debit Balances'}
            tableData={this.state.BalancePayment}
            onBalancePaymentCheck={this.onBalancePaymentCheck}
            balanceHandleChange={this.balanceHandleChange}
          />
        )
      }
    }

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
              title={`Create New Payment`}
            >
   
              <form autoComplete="off">

                <FormInputLayout
                  title="Key Information"
                  desc="Payment information"
                >
                    <NewPayment
                      companyList={companyList}
                      onSetState={this.onSetState}
                      state={this.state.invoice}
                      _renderAllInvoicesForOneCompany={this._renderAllInvoicesForOneCompany}
                    />

                </FormInputLayout>
                

                {container}

                {balancePayment}

        
                {this.state.message && (
                  <DialogRoot
                    title={this.state.messageTitle}
                    size="sm"
                    show={this.state.message}
                    handleHide={this._toggleMessageRestart}
                  >
                    <div className="row">
                        <div className="col-md-12">

                          {this.state.messageContent}

                        </div>

                        <div style={{marginTop: 25, marginBottom: 25}} className="col-md-6 mx-auto">
                          <Button
                              variant="contained"
                              color="primary"
                              className="text-white"
                              onClick={this._handleSubmitPayment}
                          >
                              Ok
                          </Button>
                        </div>

                    </div>
                  </DialogRoot>
                )}


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
  const { paymentState } = accountingState;
  const { paymentToView, paymentList } = paymentState;
  return { paymentToView, paymentList };
};

export default connect(
  mapStateToProps,
  { 
    fetchAllCompanies,
    fetchAllInovicesOneCompany,
    makePayment
  }
)(acct_new_payment);

