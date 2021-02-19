import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllUpcoming, getCalendarSettings, updateCalendarSettings } from "Ducks/calendar";

import BgCard from "Components/BgCard";

//checkbox and select
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

//icons
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";
import editFilled from "@iconify/icons-ant-design/edit-filled";
import { CalendarToday, AccessTime, AccountCircle } from "@material-ui/icons";

//date helpers
import { isSameDay, getTheDate, getTheTime } from "Helpers/helpers";

import { NavLink } from "react-router-dom";
import moment from "moment-timezone";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const UpcomingEvents = (props) => {
  const dispatch = useDispatch();  
  useEffect(() => {
    
    dispatch(getCalendarSettings());
    
    
  }, []);
  const calendarSettings = useSelector(state => state.calendarState.settings);
  const [ upcomingRange, setUpcomingRange ] = useState("week");
  const [ defaultUpcoming, setDefaultUpcoming ] = useState("");
  const [ serviceSettings, setServiceSettings ] = useState([])
  useEffect(() => {
    //must get start and end date
    let start = moment().toISOString();
    let end;    
    if(calendarSettings.length > 0){
      let defaultValue = calendarSettings.filter(item => item.name == "UpcomingRange");
      setDefaultUpcoming(defaultValue[0].value);
      setUpcomingRange(defaultValue[0].value);
      if(defaultValue[0].value == "week"){
        end = moment().add(7, 'd').toISOString();      
      }
      else if(defaultValue[0].value == "month"){
        end = moment().add(1, 'month').toISOString();
      }
      else if(defaultValue[0].value == "sixmonths"){
        end = moment().add(6, 'month').toISOString();
      }
      
      if(end){
        dispatch(getAllUpcoming(true, start, end));
      }
      else {
        dispatch(getAllUpcoming(true, start));
      }
      let settings = calendarSettings.filter(item => item.settingType == "booking");
      setServiceSettings(settings);
    }
       
    
  }, [calendarSettings])

  const setDefaultRange = (evt) => {
    if(evt.target.checked){
      setDefaultUpcoming(upcomingRange);  
    }
    else {
      setDefaultUpcoming("");
    }
    let defaultValue = calendarSettings.filter(item => item.name == "UpcomingRange");
    let updateData = {};
    if(defaultValue.length == 0){
      updateData = {
        name: "UpcomingRange",
        settingsType: "upcoming",
        value: upcomingRange
      }
    }
    else {
      updateData = defaultValue[0];
      updateData.value = upcomingRange;
    }
    dispatch(updateCalendarSettings(updateData));
  }

  const changeRange = (evt) => {
    setUpcomingRange(evt.target.value);
    let start = moment().toISOString();
    let end; 
    if(evt.target.value == "week"){
      end = moment().add(7, 'd').toISOString();      
    }
    else if(evt.target.value == "month"){
      end = moment().add(1, 'month').toISOString();
    }
    else if(evt.target.value == "year"){
      end = moment().add(1, 'year').toISOString();
    }
    
    if(end){
      dispatch(getAllUpcoming(true, start, end));
    }
    else {
      dispatch(getAllUpcoming(true, start));
    }
  }

  const editEvent = (id) => {
    window.location = "/app/calendar?edit="+id;
  }

    const classes = useStyles();

    const { upcomingEvents } = useSelector(state => state.calendarState);
        
    const actionButtons = (
      <React.Fragment>
       <FormControl className={classes.formControl}>
        <InputLabel id="rangeSelectLabel">Select range</InputLabel>
        <Select
          labelId="rangeSelectLabel"
          id="rangeSelect"
          value={upcomingRange}
          onChange={changeRange}
        >
          <MenuItem value={"week"}>Next week</MenuItem>
          <MenuItem value={"month"}>Next month</MenuItem>
          <MenuItem value={"year"}>Next Year</MenuItem>
          <MenuItem value={"all"}>All upcoming</MenuItem>
        </Select>
        
      </FormControl>
      <FormGroup >
      <FormControlLabel
      control={<Checkbox name="saveDefault" />}
      label="Default range"
      checked={ defaultUpcoming == upcomingRange && defaultUpcoming != "" ? true : false}
      onChange={setDefaultRange}
      />
      </FormGroup>
      </React.Fragment>
     )

    return (
       <BgCard heading={ <span className="title">Upcoming Events</span> } customClasses="upcomingEvents"  
          actionButtons={actionButtons}>
          {
            
            upcomingEvents.length > 0 ? 
            upcomingEvents.map((item, index) => {
              var sameDay = isSameDay(item.start, item.end);
        const eventDate = sameDay ? getTheDate(item.start) : `${getTheDate(item.start)} - ${getTheDate(item.end)}`;

        const eventTime = `${getTheTime(item.start)} - ${getTheTime(item.end)}`;
        let eventColor = "#fff";
        serviceSettings.forEach(setting => {
          if(setting.name == item.service){
            eventColor = setting.value
          }
        });
              return(
              <BgCard key={index} customClasses="innerBlock" contentCustomClasses="innerblockContent">             
           
           <div className={`colorHeading`} style={{backgroundColor: eventColor}}></div>
           <div className="calDetailRow title">
             <strong> {item.title} </strong>
            </div>
            <div className="calDetailRow description">
              {item.desc}
              </div>
            <div className="calDetailRow timing">
            <CalendarToday className="align-text-bottom text-muted" fontSize="inherit" /> {eventDate }<br />
            <AccessTime className="align-text-bottom text-muted" fontSize="inherit" /> {eventTime}
             </div>
             <div className="calDetailRow customerInfo">
             {item.cust && (
          <NavLink to={`./crm/customers/${item.cust.id}`}>
            <h2 className="mb-0">{item.cust.name}</h2>
          </NavLink> )}
             </div>
             <div className="calDetailRow action">
              {item.staffName}
             </div>
             <div className="calDetailRow action">
             <IconButton
                    size="small"
                    onClick={() => {
                      editEvent(item.id);
                    }}
                  >
                    <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                  </IconButton>
             </div>
           </BgCard>)
             })
            : (
              <BgCard customClasses="text-center">
              <span style={{ fontSize: 16, fontWeight: "500" }}>
                No upcoming events
              </span>
            </BgCard>
            )
          }
                      
       </BgCard>
    )
}

export default UpcomingEvents;