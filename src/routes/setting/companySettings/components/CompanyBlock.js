import React from "react";
import { Col, Row } from "reactstrap";
import BgCard from "Components/BgCard";

const CompanyBlock = ({ company }) => {
  return (
    <BgCard>
      <Row className={"align-items-center pl-20 pb-20 border-bottom"}>
        <img
          src={require("Assets/img/logo-1.jpg")}
          alt="user profile"
          className="rounded-circle bordered"
          width="150"
          height="150"
        />
        <div className={"ml-20"}>
          <h1>{company.name}</h1>
          <div>{company.email}</div>
        </div>
      </Row>
      <Row className={"pl-20 pr-20 pt-30 pb-20 border-bottom"}>
        <Col>
          <h2>About</h2>
          <div>{company.description}</div>
        </Col>
      </Row>
      <Row className={"pl-20 pr-20 pt-30 pb-10"}>
        <Col md={3}>Contact</Col>
        <Col md={9}>
          <div className="text-right">
            <b>{company.contact}</b>
          </div>
        </Col>
      </Row>
      <Row className={"pl-20 pr-20 pt-10 pb-10"}>
        <Col md={3}>Website</Col>
        <Col md={9}>
          <div className="text-right">
            <b>{company.website}</b>
          </div>
        </Col>
      </Row>
    </BgCard>
  );
};

export default CompanyBlock;
