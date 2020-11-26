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
      edit: false,
      info: { ...this.props.eventInfo }
    };
    this.onDelete = this.onDelete.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  editField = (element, value) => {
    let state = { ...this.state };
    state.info[element] = value;
    this.setState({ state: state });
  };

  onDelete(id) {
    window.alert("Delete this event?");
    this.props.deleteEvent(id);
    this.props.handleClose();
  }

  submitEdit = () => {
    window.alert("Update your event information?");
    this.setState({ edit: false });

    let state = { ...this.state.info };
    this.props.updateEvent(state);
  };

  toggleEdit = () => this.setState({ edit: !this.state.edit });

  render() {
    return (
      <React.Fragment>
    
          {this.state.edit ? (
        <div    style={{    position: "fixed",top: "50%",left: "50%",
        transform: "translate(-40%, -30%)",height: "fit-content",
        "min-inline-size": "auto"

         }}>
  
            <EditableEventInfo
            // style={{height: "fit-content"}}
              info={this.state.info}
              editField={this.editField}
              onDelete={this.onDelete}
              toggleEdit={this.toggleEdit}
              submitEdit={this.submitEdit}
            />
       </div>
          ) : (

            <ViewEventInfo info={this.state.info} onEdit={this.toggleEdit} />
            )}
      
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  {
    updateEvent,
    deleteEvent
  }
)(EventInfoDialog);
