import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Chip
} from "@material-ui/core";
import { Build, DriveEta, VpnKey } from "@material-ui/icons";
import { getDateTime } from "Helpers/helpers";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflow: "auto",
    maxHeight: 300,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}));

function renderIcon(service) {
  const iconProps = { fontSize: "small" };
  switch (service) {
    case "Maintenance":
      return <Build {...iconProps} />;
    case "Test Drive":
      return <DriveEta {...iconProps} />;
    case "Rental":
      return <VpnKey {...iconProps} />;
    default:
      return <Build {...iconProps} />;
  }
}

function renderStatus(status) {
  const chipProps = { label: status, variant: "outlined", size: "small" };
  switch (status) {
    case "Confirmed":
      return <Chip className="border-success text-success" {...chipProps} />;
    default:
      return <Chip {...chipProps} />;
  }
}

export default function RecentBookingList(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <List className={classes.root}>
      {data.length > 0 ? (
        data.map((booking, key) => (
          <ListItem key={key} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {renderIcon(booking.service)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${booking.service}`}
              secondary={`${getDateTime(booking.content.date)}`}
            />
            <ListItemSecondaryAction>
              {renderStatus(booking.status)}
            </ListItemSecondaryAction>
          </ListItem>
        ))
      ) : (
        <ListItem alignItems="center">
          <ListItemText
            primary={<p className="text-center">No Bookings Made</p>}
          />
        </ListItem>
      )}
    </List>
  );
}
