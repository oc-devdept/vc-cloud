import React, { Component } from "react";
import { connect } from "react-redux";

//sub components
import CustomerList from "./components/CustomerList";

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
// import ListViewSelector from "Components/PageTitleBar/ListViewSelector";

import { changeCustomerView, getAllCustomer } from "Ducks/crm/customer";
import { customerNewPage } from "Helpers/crmURL";

import api from "Api";


class crm_customer extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.importCust = this.importCust.bind(this);
    this.newCust = this.newCust.bind(this);


    this.state = ({
      withoutAgents: [],
      withAgents: []
    })
  }


  async componentDidMount() {
    // this.props.getAllCustomer();

    // await api.post(`/bookings/createBooking`, {data: booking});

    const item = await api.get(`/customers/getall`);
    
    const withoutAgents = item.data.data.withoutAgents
    const withAgents = item.data.data.withAgents
    


    this.setState({
      withoutAgents: withoutAgents,
      withAgents: withAgents
    })

  }

  newCust() {
    this.props.history.push(customerNewPage);
  }

  refresh() {
    this.props.getAllCustomer();
  }
  importCust() {
    console.log("importCust");
  }


  render() {
    const {
      // options,
      nowShowing,
      action,
      // tableData,
      loading
    } = this.props.customerState.customerList;

    // console.log('tableData')
    // console.log(tableData)

    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Customers</title>
          <meta name="description" content="Everyday Customers Retention" />
        </Helmet>
        <PageTitleBar
          title={nowShowing}
          actionGroup={{
            add: { onClick: this.newCust },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
        />
        {/* <div className="d-flex">
           <ListViewSelector
                options={options}
                nowShowing={nowShowing}
                onChangeValue={this.props.changeCustomerView}
              />
        </div> */}
        <CustomerList action={action} tableData={this.state.withoutAgents} loading={loading} />

        <CustomerList action={action} tableData={this.state.withAgents} loading={loading} />

      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ crmState }) => {
  const { customerState } = crmState;
  return { customerState };
};

export default connect(
  mapStateToProps,
  {
    changeCustomerView,
    getAllCustomer
  }
)(crm_customer);
