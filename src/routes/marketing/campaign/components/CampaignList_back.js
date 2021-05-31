import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from "@material-ui/core";
import { getTheDate } from "Helpers/helpers";

import CampaignStatusLabel from "./CampaignStatusLabel";

// Actions
import { getCampaign } from "Ducks/marketing/campaign";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: theme.palette.background.paper,
    minHeight: 300
  },
  inline: {
    display: "inline"
  }
}));

function CampaignList(props) {
  const classes = useStyles();

  const { list, campaignToView } = props;

  return (
    <List className={classes.root}>
      {list.length > 0 ? (
        list.map((li, key) => (
          <React.Fragment key={key}>
            <ListItem
              button
              selected={campaignToView.id == li.id}
              onClick={() => props.getCampaign(li.id)}
              alignItems="flex-start"
            >
              <ListItemText
                primary={li.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {li.subject}
                    </Typography>
                    <br />
                    <Typography component="span" variant="subtitle2">
                      {li.scheduledAt && getTheDate(li.scheduledAt)}
                    </Typography>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <CampaignStatusLabel sentOn={li.sentOn} />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))
      ) : (
        <ListItem alignItems="center">
          <ListItemText
            primary={
              <Typography className="text-center">
                No Campaigns created yet
              </Typography>
            }
          />
        </ListItem>
      )}
    </List>
  );
}
const mapStateToProps = ({ marketingState }) => {
  const { campaignState } = marketingState;
  const { campaignToView } = campaignState;
  return { campaignToView };
};

export default connect(mapStateToProps, { getCampaign })(CampaignList);
