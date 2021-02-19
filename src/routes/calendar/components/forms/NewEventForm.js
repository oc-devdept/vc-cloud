import React, { Component } from "react";
import { connect } from "react-redux";

// form components
import FormInput from "Components/Form/FormInput";
import DateTimePicker from "Components/Form/Pickers/DateTimePicker";
import DatePicker from "Components/Form/Pickers/DatePicker";
import { Button, Switch, FormControlLabel } from "@material-ui/core";
import CustomerPicker from "Routes/crm/components/CustomerPicker";
// Actions
import { handleRegErrorForm } from "Ducks/session/register";
import { select } from "redux-saga/effects";

/*
const selectValues = [
  { value: "Lead", name: "Lead" },
  { value: "Deal", name: "Deal" },
  { value: "Booking", name: "Booking" },
  { value: "Personal", name: "Personal" }
];
*/
class NewEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      start: this.props.dayView
        ? new Date(this.props.dayView.start).setHours(12)
        : new Date(),
      end: this.props.dayView
        ? new Date(this.props.dayView.end).setHours(13)
        : new Date().setHours(new Date().getHours() + 1),
      title: "",
      customerId: null,
      eventableType: null, 
      allDay: false,
      selectValues: [
        { value: "Lead", name: "Lead" },
        { value: "Deal", name: "Deal" },
      ]
    };
    this.editField = this.editField.bind(this);
    this.showDesc = this.showDesc.bind(this);
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

  editField = (element, value) => {
    if(element == "start"){
      let startDate = new Date(value);
      let end = startDate.getTime() + 60 * 60 * 1000;
      let endDate = new Date(end);
      this.setState({ start: value, end: endDate});
    }
    else {
      this.setState({ [element]: value });
    }
    
  };

  showDesc() {
    this.setState({ showDesc: !this.state });
  }

  OnBlurValidation = () => {
    let state = { ...this.state.event };
    if (state.start == "" || state.end == "") {
      this.props.handleRegErrorForm(
        "Either you have set the start or end time set wrongly or you have not set a start and end time"
      );
      return false;
    }
    if (new Date(state.start) > new Date(state.end)) {
      this.props.handleRegErrorForm(
        "Your start date and time is later than your end date and time, please adjust the correct date and time"
      );
      return false;
    }
    if (state.title == "") {
      this.props.handleRegErrorForm(
        "Invalid title for your event, set a longer title to define your event"
      );
      return false;
    }
    return true;
  };

  ConfirmEvent = () => {
    if (this.OnBlurValidation()) {
      let data = Object.assign({}, this.state);
      
      this.props.addEvent(data);
    }
  };

  render() {
    const { title, desc, start, end, allDay, eventableType, customerId } = this.state;    
    return (
      <form autoComplete="off">
        <FormInput
          placeholder="Title"
          value={title}
          target="title"
          handleChange={this.editField}
          required={!title}
        />
        <div className="row">
          <div className="col-6">
            {allDay ? (
              <DatePicker
                value={start}
                target="start"
                handleChange={this.editField}
                required={!start}
              />
            ) : (
              <DateTimePicker
                value={start}
                target="start"
                handleChange={this.editField}
                required={!start}
              />
            )}
          </div>
          <div className="col-6">
            {allDay ? (
              <DatePicker
                value={end}
                target="end"
                handleChange={this.editField}
                required={!end}
              />
            ) : (
              <DateTimePicker
                value={end}
                target="end"
                handleChange={this.editField}
                required={!end}
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
          <CustomerPicker
          value={customerId}
          target="customerId"
          handleChange={this.editField}
        />
            </div>
        </div>
        <div className="row">
        <div className="col-6">
            <FormInput
              label="Eventable Type"
              value={eventableType}
              target="eventableType"
              handleChange={this.editField}
              selectValues={this.state.selectValues}
              required={!eventableType}
            />
          </div>

          <div className="col-6">
            <FormControlLabel
              control={
                <Switch
                  checked={allDay}
                  onChange={() => this.editField("allDay", !allDay)}
                  value="allDay"
                  className="ml-10"
                  disableRipple
                />
              }
              label="All day event"
              labelPlacement="start"
              className="mb-0 fs-14"
            />
          </div>
        </div>
       

        <FormInput
          placeholder="Description"
          value={desc}
          target="desc"
          handleChange={this.editField}
          multiline
          rows={3}
        />

        <div className="d-flex justify-content-end">
          <Button
            variant="contained"
            className="text-white btn-success"
            onClick={() =>
              this.ConfirmEvent()
            }
          >
            Add
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ calendarState }) => {
  const { eventAdd, settings } = calendarState;
  return { eventAdd, settings };
};

export default connect(
  mapStateToProps,
  { handleRegErrorForm }
)(NewEventForm);
