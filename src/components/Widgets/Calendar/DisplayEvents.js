import React, { Component } from "react";
import Moment from "moment";
import BgCard from "Components/BgCard";
import { CalendarToday, AccessTime, AccountCircle } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";
import editFilled from "@iconify/icons-ant-design/edit-filled";
import { isSameDay, getTheDate, getTheTime } from "Helpers/helpers";


import { NavLink } from "react-router-dom";

export default class DisplayEvent extends Component {

  editEvent = (id) => {
    window.location = "/app/calendar?edit="+id;
  }

  render(){
  const { myEvents, currentDate } = this.props;

    let EventList = null;

    if (myEvents.length > 0) {
      EventList = myEvents.map((item, index) => {
        var sameDay = isSameDay(item.start, item.end);
        const eventDate = sameDay ? getTheDate(item.start) : `${getTheDate(item.start)} - ${getTheDate(item.end)}`;

        const eventTime = `${getTheTime(item.start)} - ${getTheTime(item.end)}`;
        const className = `calDot bigCalDot`;
        return (
          <BgCard key={index}>
          <div className="calTitleRow">
             <div className={className} style={{backgroundColor: item.color}}></div> <strong> {item.title} </strong>
             <IconButton
                    size="small"
                    onClick={() => {
                      this.editEvent(item.id);
                    }}
                    style={{float:"right"}}
                  >
                    <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.2rem" height="1.2rem" />
                  </IconButton>
             </div> 
          {item.cust && (
          <NavLink to={`./crm/customers/${item.cust.id}`}>
            <h2 className="mb-0">{item.cust.name}</h2>
          </NavLink>
        )}
        <div className="calDateRow">
          {item.status}
        </div>
        <div className="calDateRow">
           <CalendarToday className="align-text-bottom text-muted" fontSize="inherit" /> {eventDate}
           </div>
           <div className="calTimeRow">
           <AccessTime className="align-text-bottom text-muted" fontSize="inherit" /> {eventTime}
           </div>
           <div className="calTimeRow">
           <AccountCircle className="align-text-bottom text-muted" fontSize="inherit" /> {item.staffName}
           </div>
          </BgCard>
        );
      });
    } else {
      EventList = (
        <BgCard customClasses="text-center">
          <span style={{ fontSize: 16, fontWeight: "500" }}>
            No upcoming events
          </span>
        </BgCard>
      );
    }

    return (
      <div>
        <div
          style={{
            marginBottom: 10,
            marginTop: 15,
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <span style={{ fontSize: 16, fontWeight: "500", marginRight: 20 }}>
            EVENTS ON { currentDate}
          </span>
         
          </div>

          <div style={{}}>{EventList}</div>
        </div>
      );
  }
}

/*

*/