import React from "react";
import { connect } from "react-redux";

import { TextField } from "@material-ui/core";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// Actions
import { getEventsSearch } from "Ducks/calendar";

const FilterSidebar = toolbar => {
  var filterKey = "";

  const [state, setState] = React.useState({
    Lead: true,
    Deal: true,
    Account: true,
    Invoice: true,
    Maintenance: true,
    testDrive: true,
  });

  const handleChange = name => event => {
    // console.log(name);
    state[name] = event.target.checked;
    setState({ ...state, [name]: event.target.checked });
    checkBoxChanged(state);
    // console.log(state);
  };

  const checkBoxChanged = data => {
    // console.log(data);
    filterKey = document.getElementById("outlined-name").value;
    // console.log(filterKey);
    toolbar.getEventsSearch(filterKey, state);
  };

  const filterChange = event => {
    filterKey = event.target.value;
    toolbar.getEventsSearch(filterKey, state);
  };

  return (
    <div>
      <TextField
        id="outlined-name"
        label="Filter by title"
        variant="outlined"
        onChange={filterChange}
      />

      <fieldset style={{ marginTop: "50px" }}>
        <legend style={{ fontSize: 20 }}>Eventable Type:</legend>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Lead}
                onChange={handleChange("Lead")}
                value="Lead"
              />
            }
            label="Lead"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Deal}
                onChange={handleChange("Deal")}
                value="Deal"
              />
            }
            label="Deal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Account}
                onChange={handleChange("Account")}
                value="Account"
              />
            }
            label="Account"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Invoice}
                onChange={handleChange("Invoice")}
                value="Invoice"
              />
            }
            label="Invoice"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Maintenance}
                onChange={handleChange("Maintenance")}
                value="Maintenance"
              />
            }
            label="Maintenance"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.testDrive}
                onChange={handleChange("testDrive")}
                value="testDrive"
              />
            }
            label="Test Drive"
          />
        </FormGroup>
      </fieldset>
    </div>
  );
};

const mapStateToProps = ({ calendarState }) => {
  const { showEvents } = calendarState;
  return { showEvents };
};

export default connect(
  mapStateToProps,
  {
    getEventsSearch
  }
)(FilterSidebar);
