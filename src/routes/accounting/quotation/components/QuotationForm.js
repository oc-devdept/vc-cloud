import React, { Component } from "react";
import { connect } from "react-redux";

// Inputs
import InvoiceProductInput from "Components/Form/Inputs/Accounting/EditInvoiceProductInput";

// Form Layout
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInputLayout from "Components/Form/Layout/FormInputLayout";

// Input Components
import FormInput from "Components/Form/FormInput";
import FormMultiInput from "Components/Form/FormMultiInput";
import AmountInput from "Components/Form/Inputs/AmountInput";
import DatePickerInput from "Components/Form/Pickers/DatePicker";


import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AutorenewIcon from '@material-ui/icons/Autorenew';


// Actions
import { 
    // accountingClearState,
    // submitAccountQuotationInvoice,
    HandleQuotationAccounts,
    restartUploadQuotationStatus
} from "Ducks/accounting/quotation";

const formFieldsProducts =  {
  description: "",
  quantity: 0,
  price: "",
  discount: 0,
  tax_id: "",
  tax_rate: 0,
  tax_amount: 0,
  amount: 0
}

const formFields = {
  date: new Date(),
  currency: "",
  currency_rate: "",
  version: "",
  subtotal: 0,
  tax_amount: 0,
  discount_total: 0,
  totalAmt: 0,
  discount: "",
  discount_rate: 0,
  description: "",
  owner: "",
  accountId:"",
  attn_toId:"",
  shipping: '',
  billing:'',
  sent_date: "",
  quoteID: "",
  state: "Draft",
  sentOn: new Date(),
  dueDate: new Date(),
  userId: localStorage.getItem("user_id"),
}



class QuotationForm extends Component {
  
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    if (this.props.edit){
      this.state = {
        formFields: {...this.props.quotationData},
        formFieldsProducts: [...this.props.quotationData.quotationLine],
        attn_to_array : []
      };
      this.edit = this.props.edit
    } else {
      this.state = {
        formFields: {...formFields},
        formFieldsProducts: [
          {...formFieldsProducts}
        ],
        attn_to_array : []
      };
    }
  
  }

  componentWillUnmount(){
    // this.props.accountingClearState()
  }

  componentDidMount() {
    this.props.HandleQuotationAccounts()
  }

  _handleChangeFormField = (e, value) => {
    
    let formFields = {...this.state.formFields}

    switch(e){
        case "accountId":
              formFields[e] = value
              formFields.shipping = value.address
              formFields.billing = value.address
            return this.setState({formFields: formFields, attn_to_array: value.customer})

        case "currency":
              formFields.currency_rate = value.rate
            break

        case "discount":
              formFields.discount_rate = value.rate
            break
        case "attn_toId":
              formFields[e] = value
            break
        default :
              formFields[e] = value
            break 

    }

    this.setState({formFields: formFields})
    this._tabluteTaxDiscountTotal(formFields)
  }

  _handleProdQuote =(element, value, key) => {
   
    let StateformFieldsProducts = [...this.state.formFieldsProducts]
    let formFields = {...this.state.formFields}

    switch(element){
        case "tax_id":
            StateformFieldsProducts[key].tax_id = value   
            StateformFieldsProducts[key].tax_rate = value.value
            break

        default:
            StateformFieldsProducts[key][element] = value
          break
    }
 

    const productSingleSubTotal = getSingleProductTotal(StateformFieldsProducts[key])
    StateformFieldsProducts[key].tax_amount = productSingleSubTotal[1]
    StateformFieldsProducts[key].amount = productSingleSubTotal[0]

    this.setState({formFieldsProducts: StateformFieldsProducts})
    this._tabluteTaxDiscountTotal(formFields)
  }

  _addNewProdQuote = () => {
    let StateformFieldsProducts = [...this.state.formFieldsProducts]
    StateformFieldsProducts.push({...formFieldsProducts})
    this.setState({formFieldsProducts: StateformFieldsProducts})
  }

  _removeProdQuote =() =>{
    let StateformFieldsProducts = [...this.state.formFieldsProducts]
    StateformFieldsProducts.pop()
    this.setState({formFieldsProducts: StateformFieldsProducts})
  }

  _tabluteTaxDiscountTotal(thisFormFields) {

    let StateformFieldsProducts = [...this.state.formFieldsProducts]
 
    const productSubTotal = getSubTotal(StateformFieldsProducts, 'amount')
    thisFormFields.subtotal = productSubTotal

    const productTax = getTax(StateformFieldsProducts)
    thisFormFields.tax_amount = productTax
 
    let totalAmt = productSubTotal + productTax
    const productTotal = getTotal(totalAmt, thisFormFields.discount_rate)
    thisFormFields.totalAmt = productTotal

    this.setState({formFields: thisFormFields})
  }

  _submitFormFieldsDB = () => {

    var today = new Date();
    var duedate = new Date();
    duedate.setDate(today.getDate()+5);

    const postData = {...this.state.formFields}
    const quotationLine = [...this.state.formFieldsProducts]

    let modifiedPostData = {...postData}
    modifiedPostData.quotationLine = quotationLine
    modifiedPostData.sent_date = postData.date,
    modifiedPostData.due_date = duedate,
    modifiedPostData.attn_toId = postData.attn_toId.value
    // modifiedPostData.account = modifiedPostData.accountId.value
    // delete modifiedPostData.accountId;

    this._ValidityCheck(modifiedPostData)

  }

  _ValidityCheck = (item) => { 
      console.log('validity check')

      if(item.accountId && item.attn_toId && item.owner){
        console.log('submit to database')
        this.props.handleSubmit(item)
      } else {
        console.log('input error, fill up fields')
      }
  }




  _restart = () =>{
    console.log('restart')

    let restartFormFieldsProducts = this.state.formFieldsProducts
    restartFormFieldsProducts = [{...formFieldsProducts}]


    let restartFormFields = this.state.formFields
    restartFormFields.subtotal = 0
    restartFormFields.tax_amount = 0
    restartFormFields.discount_total = 0
    restartFormFields.totalAmt = 0
    restartFormFields.discount = ''
    restartFormFields.discount_rate = 0
  
    this.setState({formFieldsProducts: restartFormFieldsProducts, formFields : restartFormFields})

  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
      if(prevProps.quotationList.uploaded != this.props.quotationList.uploaded){
        if(this.props.quotationList.uploaded){
          return true
        }
      }
      return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {


      if(snapshot){
        if(!this.edit){
          this.setState({
            formFields: {...formFields},
            formFieldsProducts: [{...formFieldsProducts}],
            attn_to_array : []
          });
          this.props.restartUploadQuotationStatus()
        }
      }
  }

  // 


  render() {

    // const { products, quotation, attn_to_array } = this.props.quotationForm;
    const {currencyTable, taxTable, discountTable, accountsList, owner, uploaded} = this.props.quotationList

    const { formFields } = this.state;



    return (

      <FormWrapper
        onSave={this._submitFormFieldsDB}
        disabled={true}
        // edit={edit}
        title={this.edit? 'Edit Quotation' : 'New Quotation'}
      >
      
        {/* {loading && <RctSectionLoader />} */}

        <form autoComplete="off">
          <FormInputLayout
            title="Key Information"
            desc="The key fields to get you started with quotation"
          >
            <div className="row">
              <div className="col-5 d-block">
                
                {this.edit && 
                  <FormInput
                    label="Company"
                    value={formFields.accountId.name}
                    target="accountId"
                    disabled={true}
                  />
                }

                {!this.edit && 
                  <FormMultiInput
                    label="Company"
                    value={formFields.accountId}
                    required={!formFields.accountId}
                    selectValues={accountsList}
                    target="accountId"
                    handleChange={this._handleChangeFormField}
                  />
                }
          

                {!this.edit && 
                  <FormMultiInput
                    label="Attention to"
                    value={formFields.attn_toId}
                    required={!formFields.attn_toId}
                    selectValues={this.state.attn_to_array}
                    target="attn_toId"
                    handleChange={this._handleChangeFormField}
                  />
                }
               
               
              </div>
              <div className="col-5 d-block offset-md-1">
              
                <DatePickerInput
                  label="Date"
                  value={''}
                />

                {!this.edit && 
                  <FormInput
                    label="Owner"
                    value={formFields.owner}
                    required={!formFields.owner}
                    selectValues={owner}
                    target="owner"
                    handleChange={this._handleChangeFormField}
                  />
                }

              </div>
            </div>
          </FormInputLayout>

          <FormInputLayout
            title="Key Information"
            desc="Billing address with additional notes if required"
          >
            <div className="row">
                <div className="col-5 d-block">
                  <FormInput
                    multiline
                    rows={4}
                    label="Billing Address"
                    target="billing"
                    value={formFields.billing}
                    handleChange={this._handleChangeFormField}
                  />
                </div>

                <div className="col-5 d-block offset-md-1">
                  <FormInput
                    multiline
                    rows={4}
                    label="Shipping Address"
                    target="shipping"
                    value={formFields.shipping}
                    handleChange={this._handleChangeFormField}
                  />
                </div>  
            </div>
            
            <div className="row">
                <div className="col-11">
                  <FormInput
                    multiline
                    rows={4}
                    label="Description"
                    target="description"
                    value={formFields.description}
                    handleChange={this._handleChangeFormField}
                  />
                </div>
            </div>

          </FormInputLayout>
      
      
          <FormInputLayout
            title="Quotation List"
            desc="Please state down the description, unit, price and tax option clearly"
          ></FormInputLayout>

   
          <div className="row py-30 px-30 justify-content-md-center">
            
              <div className="col-11">
                <InvoiceProductInput
                  products={this.state.formFieldsProducts}
                  quotation={this.state.formFields}
                  taxTable={taxTable}
                  handleChange={this._handleProdQuote}
                  // handleAdd={this._addNewProdQuote}
                  handleRemove={this._removeProdQuote}
                  restart={this._restart}
                  edit
                />
              </div>



              {/* <div className="row px-30 justify-content-md-end"> */}
              <div className="row col-md-11" style={{marginTop: 25}}>
                    <div className="col-md-12 d-flex justify-content-end">
                      <div className="flex-column d-flex align-items-center" onClick={this._addNewProdQuote}>
                        <AddCircleIcon
                          variant="contained"
                          color="primary"
                          fontSize="large"
                          // className="text-white ml-10"
                        />
                        Add Product
                      </div>
                    
                      {this.state.formFieldsProducts.length > 1 && (
                        <div style={{marginLeft: 50}} className="flex-column d-flex align-items-center" onClick={this._removeProdQuote}>
                          <DeleteIcon
                            variant="contained"
                            color="primary"
                            fontSize="large"
                          />
                          Delete Product          
                        </div>
                      )} 
                      </div>
                  </div>
              {/* </div> */}


          </div>


        </form>

      </FormWrapper>

    );
  }
}

const mapStateToProps = ({ accountingState, crmState, usersState }) => {
  const { tableData, } = crmState.accountState.accountList 
  const { quotationState} = accountingState;
  const { quotationList } = quotationState;
  const { users } = usersState;

  return { tableData, users, quotationList};
};

export default connect(
  mapStateToProps,
  { 
    // accountingClearState,
    // submitAccountQuotationInvoice,
    HandleQuotationAccounts,
    restartUploadQuotationStatus
  }
)(QuotationForm);




function getSubTotal(array, key) {
    return array.reduce((a, b) => a + (b[key] || 0), 0);
}

function getSingleProductTotal(product) {
    var subtotal = product.price * product.quantity;
    let total
    let tax

    if(product.tax_rate != "0"){
        tax = product.tax_rate/100 * subtotal
    } else {
        tax = 0
    }

    total = subtotal - product.discount;

    if(total < 0) {
        total = 0
    }

    return [total, tax];
}

function getTotal(subTotal, discount) {

    var total = (subTotal) * (1-(discount/100));

    return total;

}

function getTax (product) {
    // let subTotal = 0
    let totalTax = 0
    // let total = 0
    if (product.length > 0) {
        product.forEach(element =>{
        totalTax = totalTax + element.tax_amount
    })
        return totalTax
    }
}

