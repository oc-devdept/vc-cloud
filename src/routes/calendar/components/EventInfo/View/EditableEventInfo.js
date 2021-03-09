import React from "react";

// form components
import FormInput from "Components/Form/FormInput";
import DateTimePicker from "Components/Form/Pickers/DateTimePicker";
import DatePicker from "Components/Form/Pickers/DatePicker";
import { Button, Switch, FormControlLabel } from "@material-ui/core";

import CustomerPicker from "Routes/crm/components/CustomerPicker";


function EditableEventInfo(props) {
  const { info, onDelete, editField, closeForm, submitEdit, eventSelectValues, fields } = props;
  const { id, start, end, title, desc, allDay, cus, customerId, eventableType, service, userId } = info;
  const eType = eventableType == "Booking" ? service : eventableType;
  return (
    <React.Fragment>
      <h3>Edit Event Details</h3>
      <form autoComplete="off">
      <FormInput
          placeholder="Title"
          value={title}
          target="title"
          handleChange={editField}
          required={!title}
        />
        <div className="row">
          <div className="col-6">
            {allDay ? (
              <DatePicker
                label="Start"
                value={start}
                target="start"
                handleChange={editField}
                required={!start}
              />
            ) : (
              <DateTimePicker
                label="Start"
                value={start}
                target="start"
                handleChange={editField}
                required={!start}
              />
            )}
          </div>
          <div className="col-6">
            {allDay ? (
              <DatePicker
                label="End"
                value={end}
                target="end"
                handleChange={editField}
                required={!end}
              />
            ) : (
              <DateTimePicker
                label="End"
                value={end}
                target="end"
                handleChange={editField}
                required={!end}
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
          <CustomerPicker
          value={customerId}
          displayValue={cus ? cus.name: ""}
          target="customerId"
          handleChange={editField}
        />
            </div>
            <div className="col-6">
            <FormInput
              label="Assigned Staff"
              value={userId}
              target="userId"
              handleChange={editField}
              selectValues={fields.users}                           
            />
            </div>
        </div>
        <div className="row">
        <div className="col-6">
            <FormInput
              label="Eventable Type"
              value={eType}
              target="eventableType"
              handleChange={editField}
              selectValues={eventSelectValues}
              required={!eventableType}
            />
          </div>

          <div className="col-6">
            <FormControlLabel
              control={
                <Switch
                  checked={allDay}
                  onChange={() => editField("allDay", !allDay)}
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
          label="Description"
          value={desc}
          target="desc"
          handleChange={editField}
          multiline
          rows={3}
        />
        <div className="row justify-content-between mt-20">
          <div>
            <Button
              className="text-danger"
              disableRipple
              onClick={() => onDelete(id)}
            >
              Delete
            </Button>
          </div>
          <div>
            <Button disableRipple onClick={closeForm}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disableRipple
              className="ml-20 text-white btn-success"
              onClick={submitEdit}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

export default EditableEventInfo;
