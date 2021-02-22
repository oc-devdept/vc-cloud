import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllEvents } from "Ducks/calendar";

import Calendar from "react-calendar";
import DisplayEvents from "./DisplayEvents";
import moment from "moment-timezone";



class CalendarLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      eventDates: [],
      needRefresh: 0,
      dateValue: new Date(),
      dateString: moment().format("DD MMM"),
      selectedEvents: [],
      activeStartDate: moment().startOf("month").toDate()
    }
  }
  
  componentDidMount() {
    let monthStart = moment().startOf("month").toISOString();
    let monthEnd = moment().endOf('month').toISOString();
    this.props.getAllEvents(
      true,
      monthStart,
      monthEnd
    );
      
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.myEvents !== prevProps.myEvents){
      let events = [];
      let serviceSettings = this.props.settings.filter(item => item.settingType == "booking");
      for(let i=0; i < this.props.myEvents.length; i++){
        let eventStart = moment.tz(this.props.myEvents[i].start, "Asia/Singapore");
        let eventEnd = moment.tz(this.props.myEvents[i].end, "Asia/Singapore");
        let startDate = new Date(eventStart.toISOString());
        let endDate = new Date(eventEnd.toISOString());
        let color ="#000";
        for(let j=0; j < serviceSettings.length; j++){
          if(this.props.myEvents[i].service == serviceSettings[j].name){
            color = serviceSettings[j].value;
          }
        }      
        events.push({
          start: startDate,
          end: endDate,
          color: color,
          title: this.props.myEvents[i].title,
          cust: this.props.myEvents[i].cus,
          staffName: this.props.myEvents[i].staffName,
          id: this.props.myEvents[i].id,
          status: this.props.myEvents[i].status          
        })
      }
      console.log(this.state.activeStartDate);    
      this.setState({
        eventDates: events,
        needRefresh: this.state.needRefresh+1
      })
    }
  }

  checkActiveDates = ({ date, view }) => {
    let todayEvents = [];
    
    for(let i=0; i < this.state.eventDates.length && todayEvents.length < 3; i++){
      if(this.state.eventDates[i].start.getMonth() == date.getMonth() && this.state.eventDates[i].start.getDate() == date.getDate()){
        todayEvents.push(this.state.eventDates[i].color);
      }
    }

    if(view === 'month' && todayEvents.length > 0) {
      return (
      <div className="dotRow">
        { todayEvents.map((item,index) => (<div className={"calDot"} style={{backgroundColor: item}} key={index}></div>))}
      </div>)
     } else {
       return (<div className="dotRow"></div>);
     }
  }

  changeActiveDay = (value) => {
    let todayEvents = [];
    for(let i=0; i < this.state.eventDates.length; i++){
      if(this.state.eventDates[i].start.getMonth() == value.getMonth() && this.state.eventDates[i].start.getDate() == value.getDate()){
        todayEvents.push(this.state.eventDates[i]);
      }
    }
    this.setState({
      dateValue: value,
      dateString: moment(value).format("DD MMM"),
      selectedEvents: todayEvents
    })
  }

  changeActiveView = ({ activeStartDate, value, view }) => {
    let monthStart = moment(activeStartDate.toISOString()).startOf("month").toISOString();
    let monthEnd = moment(activeStartDate.toISOString()).endOf('month').toISOString();
    this.props.getAllEvents(
      true,
      monthStart,
      monthEnd      
    );
    this.setState({
      activeStartDate: activeStartDate,
      dateValue: null
    })
  }

  changeMonth = (value, event ) => {
    let monthStart = moment(value.toISOString()).startOf("month").toISOString();
    let monthEnd = moment(value.toISOString()).endOf('month').toISOString();
    this.props.getAllEvents(
      true,
      monthStart,
      monthEnd      
    );
    this.setState({
      activeStartDate: value,
      dateValue: null
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <Calendar
            key={this.state.needRefresh}
            className="react-calendar"
            tileContent={this.checkActiveDates}
            activeStartDate={this.state.activeStartDate}
            value={this.state.dateValue}
            onChange={this.changeActiveDay}
            onActiveDateChange={this.changeActiveView}   
            onClickMonth={this.changeMonth}        
          />
        </div>
        <div className="col-12">
        <DisplayEvents
            myEvents={this.state.selectedEvents}
            currentDate={this.state.dateString}
          />
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ calendarState }) => {
  const { myEvents, settings } = calendarState;
  return {
    myEvents, settings
  };
};

export default connect(
  mapStateToProps,
  {
    getAllEvents
  }
)(CalendarLayout);

// {"where": {"start": {"lt": "2019-07-18T02:38:03.197Z"}}}

// :
