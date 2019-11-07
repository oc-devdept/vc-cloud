import React from "react";
import { Col, Row } from "reactstrap";

// // import TabsHeader from "Components/Tabs/TabsHeader";

const DetailsTab = ({company}) => {
  return (
    <React.Fragment>
      {/* <TabsHeader title={"Locale"}/> */}
      <Row className={"pl-20 pr-20 pt-30 pb-10"}>
        <Col md={3}>Currency</Col>
        <Col md={9}>
          <div className="text-right"><b>{company.currency}</b></div>
        </Col>
      </Row>
      <Row className={"pl-20 pr-20 pt-10 pb-10"}>
        <Col md={3}>Timezone</Col>
        <Col md={9}>
          <div className="text-right"><b>{company.timezone}</b></div>
        </Col>
      </Row>
      <Row className={"pl-20 pr-20 pt-10 pb-10"}>
        <Col md={3}>Location</Col>
        <Col md={9}>
          <div className="text-right"><b>{company.location}</b></div>
        </Col>
      </Row>
      {/* <TabsHeader title={"Fiscal Year"} customClasses="mt-20"/> */}
      <Row className={"pl-20 pr-20 pt-10 pb-10"}>
        <Col md={3}>Fiscal Year Begins</Col>
        <Col md={9}>
          <div className="text-right"><b>{company.fiscalYear}</b></div>
        </Col>
      </Row>
      {/* <TabsHeader title={"Business Hours"} customClasses="mt-20"/> */}
      <Row className={"pl-20 pr-20 pt-10 pb-10"}>
        <Col md={3}>Opening Hours</Col>
        <Col md={9}>
          <div className="text-right"><b>{company.openingHours}</b></div>
        </Col>
      </Row>
      {/* <TabsHeader title={"Holidays"} customClasses="mt-20"/> */}
      { company.holidays &&
        company.holidays.map((holiday) => (
        <Row className={"pl-20 pr-20 pt-10 pb-10"} key={holiday.id}>
          <Col md={3}>{holiday.name}</Col> 
          <Col md={9}>
            <div className="text-right"><b>{holiday.date}</b></div>
          </Col>
        </Row>
      ))}
    </React.Fragment>
  );
};

export default DetailsTab;
