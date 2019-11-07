/**
 * Follow up component
 *
 * @param allFollowup
 * @param followupType(Lead, Invoice)
 * @param followupTypeId(Lead, Invoice)
 */

import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListSubheader, Button } from "@material-ui/core";
import FollowUpBlock from "./FollowUpBlock";

// New Follow up
import { show } from "redux-modal";
import NewFollowup from "../Forms/NewFollowup";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "relative",
    overflow: "auto",
    maxHeight: 650,
    padding: 20
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  }
});

const months = [
  {
    month: "Upcoming",
    followUps: [
      {
        date: "2019-09-06T02:23:50.416Z",
        title: "Called this this that that",
        createdAt: "2019-09-06T02:23:50.416Z",
        result: { name: "Busy" },
        type: { name: "call" },
        userInfo: { name: "Admin Admin" }
      }
    ]
  },
  {
    month: "Oct 2019",
    followUps: [
      {
        date: "2019-09-06T02:23:50.416Z",
        title: "Called this this that that",
        createdAt: "2019-09-06T02:23:50.416Z",
        result: { name: "Busy" },
        type: { name: "call" },
        userInfo: { name: "Admin Admin" }
      },
      {
        date: "2019-09-06T02:23:50.416Z",
        title: "Called this this that that",
        type: { name: "email" },
        createdAt: "2019-09-06T02:23:50.416Z",
        userInfo: { name: "Admin admin" }
      },
      {
        date: "2019-09-06T02:23:50.416Z",
        title: "Called this this that that",
        createdAt: "2019-09-06T02:23:50.416Z",
        userInfo: { name: "Admin admin" },
        type: { name: "call" },
        result: { name: "Busy" }
      }
    ]
  },
  {
    month: "Sept 2019",
    followUps: [
      {
        date: "2019-09-06T02:23:50.416Z",
        title: "Called this this that that",
        createdAt: "2019-09-06T02:23:50.416Z",
        result: { name: "Busy" },
        type: { name: "call" },
        userInfo: { name: "Admin Admin" }
      },
      {
        date: "2019-09-06T02:23:50.416Z",
        title: "Called this this that that",
        type: { name: "email" },
        createdAt: "2019-09-06T02:23:50.416Z",
        userInfo: { name: "Admin admin" }
      },
      {
        date: "2019-09-06T02:23:50.416Z",
        title: "Called this this that that",
        createdAt: "2019-09-06T02:23:50.416Z",
        userInfo: { name: "Admin admin" },
        type: { name: "call" },
        result: { name: "Answered" }
      }
    ]
  }
];

/**
 * Converting data to month view
 *
 * count(Upcoming Follow ups)
 * count(Total follow up logged)
 */

function crm_followup_tab(props) {
  const { allFollowup, followupType, followupTypeId } = props;
  const classes = useStyles();

  const newFollowup = () =>
    props.show("new_followup", { type: followupType, typeId: followupTypeId });

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-10">
            <div>2 Upcoming | 5 Follow Ups Logged</div>
            <div>
              <Button
                onClick={newFollowup}
                variant="contained"
                color="secondary"
              >
                Log a follow up
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <List className={classes.root} subheader={<li />}>
            {months.map((obj, index) => (
              <li key={`section-${index}`} className={classes.listSection}>
                <ul>
                  <ListSubheader disableSticky={true}>
                    <h3>{obj.month}</h3>
                  </ListSubheader>
                  {obj.followUps.map((followup, key) => (
                    <FollowUpBlock key={key} data={followup} />
                  ))}
                </ul>
              </li>
            ))}
          </List>
        </div>
      </div>
      <NewFollowup />
    </React.Fragment>
  );
}

export default connect(
  null,
  { show }
)(crm_followup_tab);
