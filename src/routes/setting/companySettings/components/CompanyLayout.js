import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";

import CompanyBlock from "./CompanyBlock";
import CompanyDetailsBlock from "./CompanyDetailsBlock";

import { getCompany } from "Actions";

class CompanyLayout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCompany();
  }

  render() {
    const { company } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col lg={4}>
            <CompanyBlock company={company} />
          </Col>
          <Col lg={8}>
            <CompanyDetailsBlock company={company} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ companyState }) => {
  const { company } = companyState;
  return { company };
};

export default connect(
  mapStateToProps,
  { getCompany }
)(CompanyLayout);
