import React, { Component } from "react";
import { connect } from "react-redux";

import PaymentList from './components/PaymentList';

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";



class payment_list extends Component {
    constructor(props){
        super(props);        
    }

    render() {
        return (
          <React.Fragment>
            <Helmet title="Payments" />
            <PageTitleBar
              title="Payment List"
            />
            <PaymentList />
          </React.Fragment>
        );
    }
}
export default payment_list;