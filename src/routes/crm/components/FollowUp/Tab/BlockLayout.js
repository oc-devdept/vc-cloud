import React from "react";
import BgCard from "Components/BgCard";
import { MailOutline, Phone } from "@material-ui/icons";
import { Divider } from "@material-ui/core";
import { getDateTime } from "Helpers/helpers";

function BlockLayout(props) {
  const {
    type,
    title,
    result,
    date,
    time,
    owner,
    createdAt,
    hoverButtons
  } = props;
  return (
    <div className="row">
      <div className="col-12">
        <BgCard fullBlock customClasses="py-20 pr-20 followup-log">
          <div className="d-flex justify-content-between mb-20 align-items-start">
            <div className="d-flex">
              {type == "call" ? (
                <React.Fragment>
                  <div className="px-30">
                    <Phone style={{ color: "#516f90" }} />
                  </div>
                  <h4>
                    <strong>Logged Call</strong>
                  </h4>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="px-30">
                    <MailOutline style={{ color: "#516f90" }} />
                  </div>
                  <h4>
                    <strong>Logged Email</strong>
                  </h4>
                </React.Fragment>
              )}
            </div>
            <div className="d-flex align-items-center">
              <div className="hover-action px-20">{hoverButtons}</div>
              <p className="mb-0 fs-14 text-muted">{getDateTime(createdAt)}</p>
            </div>
          </div>
          <div className="pl-60">
            <div style={{ paddingLeft: 24 }}>
              <div style={{ whiteSpace: "pre-line" }}>{title}</div>
              <Divider />
              <div className="row py-20">
                {result && (
                  <div className="col-md-2">
                    <p className="fs-14 mb-0 text-muted">Result</p>
                    <div className="mb-0">{result}</div>
                  </div>
                )}
                <div className="col-md-2">
                  <p className="fs-14 mb-0 text-muted">Date</p>
                  <div className="mb-0">{date}</div>
                </div>
                {time && (
                  <div className="col-md-2">
                    <p className="fs-14 mb-0 text-muted">Time</p>
                    <div className="mb-0">{time}</div>
                  </div>
                )}
              </div>
              <Divider />
              <p className="mt-30">
                <span className="fs-14">Created by</span>{" "}
                <strong>{owner}</strong>
              </p>
            </div>
          </div>
        </BgCard>
      </div>
    </div>
  );
}

export default BlockLayout;
