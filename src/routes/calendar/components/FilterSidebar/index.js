import React, { useState, useEffect}  from "react";
import { connect } from "react-redux";

import { TextField } from "@material-ui/core";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
// Actions
import { getEventsSearch } from "Ducks/calendar";

const FilterSidebar = props => {
    const dispatch = useDispatch();
    const calendarSettings = useSelector(state => state.calendarState.settings);
    const [selectedFilters, setSelectedFilters] = useState(["Lead", "Deal"]);
    useEffect(()=> {
        if(calendarSettings.length > 0){
            let cals = [...selectedFilters];
            for(let i=0; i < calendarSettings.length; i++){
                if(calendarSettings[i].settingType == "booking" || calendarSettings[i].settingType == "others"){
                    cals.push(calendarSettings[i].name);
                }
            }
            setSelectedFilters(cals);
        }
        
    }, [calendarSettings]);

    const handleChange = event => {
        let cals = [...selectedFilters];
        let num = cals.indexOf(event.target.value);
        if(num == -1){
           cals.push(event.target.value);   
        }
        else {
            cals.splice(num, 1);
        }
        setSelectedFilters(cals);
        dispatch(getEventsSearch(cals, "type"));       
        
   };

    const filterChange = event => {
        let filterKey = event.target.value;
        dispatch(getEventsSearch(filterKey, "title"));
        //props.getEventsSearch(filterKey, state);
      };

//   var ho = useSelector(state => {state.calendarState, console.log(state)});
//   React.useEffect(() => {
//     dispatch(getEventsSearch());
//   }, []);
/*
  const [state, setState] = useState({
    Lead: true,
    Deal: true,

  });

  

  const checkBoxChanged = data => {

    filterKey = document.getElementById("outlined-name").value;
    toolbar.getEventsSearch(filterKey, state);
  };

 
*/
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
                checked={selectedFilters.includes("Lead")}
                onChange={handleChange}
                value="Lead"
              />
            }
            label="Lead"
          /><FormControlLabel
            control={
              <Checkbox
                checked={selectedFilters.includes("Deal")}
                onChange={handleChange}
                value="Deal"
              />
            }
            label="Deal"
          />
         {
             calendarSettings.map(setting => {
                 if(setting.settingType == "booking" || setting.settingType == "others"){
                     return (
                        <FormControlLabel
                            key={setting.name}
                            control={
                              <Checkbox
                                checked={selectedFilters.includes(setting.name)}
                                onChange={handleChange}
                                value={setting.name}
                                style={{color: setting.value}}
                              />
                            }
                            label={setting.name}
                         />
                     )
                 }
                 else {
                     return "";
                 }
             })
         }          
        </FormGroup>
      </fieldset>
    </div>
  );
};

export default FilterSidebar;