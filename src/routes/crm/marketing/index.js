import React, { Component } from "react";
import { connect } from "react-redux";

//sub components

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
// import ListViewSelector from "Components/PageTitleBar/ListViewSelector";


class crm_marketing extends Component {
  constructor(props) {
    super(props);
   
  }


  render() {
   
    // const { summary } = this.props.dealState.dealSummary;
    return (
      <React.Fragment>
        <Helmet>
          <title>Everyday | Deals</title>
          <meta name="description" content="Venture Car Marketing" />
        </Helmet>
        <PageTitleBar
          title={'Marketing'}
          actionGroup={{
            add: { onClick: this.newDeal },
            // mid: { label: "Import", onClick: this.importDeal },
            more: [{ label: "Refresh List", onClick: this.refresh }]
          }}
        />
        <div>Marketing Function</div>
        {/* 
        
          1. Get all users under this admin's

          2) populate all of the users 

          3) customise EDM, save EDM, 

          4) able to select EDM to send to customers' email

          5) Bonus, able to track the usage and its analytics of the EDM
        
        */}

      </React.Fragment>
    );
  }
}
const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  {
  }
)(crm_marketing);
