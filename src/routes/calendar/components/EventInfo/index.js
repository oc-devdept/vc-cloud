import React, { Component } from "react";
import { connect } from "react-redux";

// Event Components
import ViewEventInfo from "./View/ViewEventInfo";
import EditableEventInfo from "./View/EditableEventInfo";

import { updateEvent, deleteEvent } from "Ducks/calendar";

class EventInfoDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {     
      info: { ...this.props.eventInfo }
    };
    if(this.props.eventInfo.cus){
        this.state.info.customerId = this.props.eventInfo.cus.id
    }
    this.onDelete = this.onDelete.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  componentDidMount(){
    let selectValues = [
      { value: "Lead", name: "Lead" },
      { value: "Deal", name: "Deal" },
    ];
    for(let i=0; i < this.props.settings.length; i++){
      if(this.props.settings[i].settingType == "booking" || this.props.settingType == "others"){
        selectValues.push({
          value: this.props.settings[i].name,
          name: this.props.settings[i].name
        });
      }
    }
    this.setState({
      selectValues: selectValues
    })
  }

  editField = (element, value) => {
    let state = { ...this.state };
    state.info[element] = value;
    if(element == "start"){
        let startDate = new Date(value);
        let end = startDate.getTime() + 60 * 60 * 1000;
        let endDate = new Date(end);
        state.info.start = value;
        state.info.end = endDate;
   }
    this.setState({ state: state });
  };

  onDelete(id) {
    //window.alert("Delete this event?");
    this.props.deleteEvent(id);
    this.props.handleClose();
  }

  submitEdit = () => {
    //window.alert("Update your event information?");
    //this.setState({ edit: false });

    let state = { ...this.state.info };
    if(state.eventableType == "Booking"){
      state.eventableType = state.service;
    }
    //console.log(state);
    this.props.updateEvent(state);
     this.props.handleClose();
  };

  toggleEdit = () => {
        //this.setState({ edit: !this.state.edit });
        this.props.showEditForm(this.props.eventInfo);
        //this.props.handleClose();
  }



  render() {
    return (
      <React.Fragment>
    
          {this.props.edit ? (
       
            <EditableEventInfo
            // style={{height: "fit-content"}}
              info={this.state.info}
              editField={this.editField}
              onDelete={this.onDelete}
              toggleEdit={this.toggleEdit}
              submitEdit={this.submitEdit}
              closeForm={this.props.handleClose}
              eventSelectValues={this.state.selectValues}
            />
          ) : (

            <ViewEventInfo info={this.state.info} onEdit={this.toggleEdit} />
            )}
      
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ calendarState }) => {
    const {  settings } = calendarState;
    return { settings };
  };
  

export default connect(
    mapStateToProps,
  {
    updateEvent,
    deleteEvent
  }
)(EventInfoDialog);
/*
 <div    style={{    position: "fixed",top: "50%",left: "50%",
        transform: "translate(-50%, -50%)",height: "fit-content" }}>
*/